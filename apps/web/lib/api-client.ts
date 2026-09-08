import {
  RegisterInput,
  LoginInput,
  CreateSessionInput,
  UpdateSessionStatusInput,
  MatchingScoreInput,
  CreateReviewInput,
  CreateJournalEntryInput,
  User,
  MentorProfile,
  Session,
  LegacyJournalEntry,
  CompatibilityScoreResponse,
} from '@kindred/shared';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4000');

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('kindred_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('kindred_token', token);
      } else {
        localStorage.removeItem('kindred_token');
      }
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      try {
        const errorBody = await response.json();
        if (errorBody.error) errorMessage = errorBody.error;
      } catch (_) {}
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Health check for Railway
  async getHealth(): Promise<{ status: string; environment?: string }> {
    return this.request<{ status: string }>('/health');
  }

  // Auth endpoints
  async register(data: RegisterInput): Promise<{ user: User; token: string }> {
    const res = await this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setToken(res.token);
    return res;
  }

  async login(data: LoginInput): Promise<{ user: User; token: string }> {
    const res = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setToken(res.token);
    return res;
  }

  async getMe(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/auth/me');
  }

  // Mentors endpoints
  async getMentors(params?: { category?: string; search?: string }): Promise<{ mentors: any[]; total: number }> {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.search) query.set('search', params.search);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return this.request<{ mentors: any[]; total: number }>(`/mentors${queryString}`);
  }

  async getMentorById(id: string): Promise<{ mentor: any }> {
    return this.request<{ mentor: any }>(`/mentors/${id}`);
  }

  // Sessions endpoints
  async createSession(data: CreateSessionInput & { learnerId?: string; learnerName?: string }): Promise<{ session: Session }> {
    return this.request<{ session: Session }>('/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSessionById(id: string): Promise<{ session: Session }> {
    return this.request<{ session: Session }>(`/sessions/${id}`);
  }

  async updateSessionStatus(id: string, data: UpdateSessionStatusInput): Promise<{ session: Session }> {
    return this.request<{ session: Session }>(`/sessions/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getUserSessions(userId: string): Promise<{ sessions: Session[] }> {
    return this.request<{ sessions: Session[] }>(`/sessions?userId=${userId}`);
  }

  // Matching algorithm score
  async getMatchingScore(data: MatchingScoreInput & { mentorId?: string }): Promise<CompatibilityScoreResponse> {
    return this.request<CompatibilityScoreResponse>('/matching/score', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Legacy Journal endpoints
  async getJournal(mentorId: string): Promise<{ entries: LegacyJournalEntry[]; total: number }> {
    return this.request<{ entries: LegacyJournalEntry[]; total: number }>(`/journal/${mentorId}`);
  }

  async createJournalEntry(data: CreateJournalEntryInput): Promise<{ entry: LegacyJournalEntry }> {
    return this.request<{ entry: LegacyJournalEntry }>('/journal', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
