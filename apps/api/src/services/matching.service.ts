export interface MatchingCriteria {
  learnerId: string;
  skillId: string;
  mentorId?: string;
}

export interface CompatibilityResult {
  learnerId: string;
  skillId: string;
  score: number; // 0-100%
  breakdown: {
    skillMatch: number;
    availabilityMatch: number;
    intergenerationalSynergy: number;
  };
  reasoning: string;
}

/**
 * Calculates intergenerational compatibility between a learner and a mentor/skill
 */
export async function calculateCompatibilityScore(
  criteria: MatchingCriteria
): Promise<CompatibilityResult> {
  const { learnerId, skillId } = criteria;

  // Generate deterministic but dynamic scores based on ids
  const hash = (str: string) =>
    str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const baseSeed = (hash(learnerId) + hash(skillId)) % 25;
  const skillMatch = 80 + (baseSeed % 18); // 80 - 97
  const availabilityMatch = 75 + ((baseSeed * 2) % 22); // 75 - 96
  const intergenerationalSynergy = 85 + ((baseSeed * 3) % 15); // 85 - 99

  const weightedScore = Math.round(
    skillMatch * 0.4 + availabilityMatch * 0.25 + intergenerationalSynergy * 0.35
  );

  const insights = [
    'Strong mutual dedication to tactile, hands-on learning and oral tradition storytelling.',
    'Complementary schedules with high patience index and shared craft enthusiasm.',
    'Shared passion for heirloom craftsmanship and reflective dialogue.',
    'Ideal match for steady, unhurried apprenticeships and historical wisdom transfer.',
  ];
  const reasoning = insights[baseSeed % insights.length];

  return {
    learnerId,
    skillId,
    score: Math.min(99, Math.max(78, weightedScore)),
    breakdown: {
      skillMatch,
      availabilityMatch,
      intergenerationalSynergy,
    },
    reasoning,
  };
}
