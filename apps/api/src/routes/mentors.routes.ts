import { Router, Request, Response } from 'express';

export const mentorsRouter = Router();

export const mockMentors = [
  {
    id: 'mentor-1',
    name: 'Eleanor Vance',
    role: 'MENTOR',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Former studio ceramicist of 48 years in Maine. I teach the quiet discipline of stoneware, centering with muscle memory, and finding peace in natural kiln unpredictability.',
    location: 'Camden, Maine',
    lifeMotto: 'The clay only yields when the hands remember to breathe.',
    handwrittenGreeting: 'Dearest learner, come sit at the wheel with me. Nothing rushed, nothing broken that cannot be made whole.',
    yearsOfExperience: 48,
    ratePerSession: 35,
    skills: [
      { id: 'skill-1', name: 'Wheel-Thrown Stoneware', category: 'Craft & Pottery', iconName: 'Flame' },
      { id: 'skill-2', name: 'Ash Glaze Chemistry', category: 'Craft & Pottery', iconName: 'Sparkles' },
      { id: 'skill-3', name: 'Herbal Wildcrafting', category: 'Ecology & Botany', iconName: 'Leaf' },
    ],
    availability: [
      { dayOfWeek: 'Tuesday', startTime: '10:00 AM', endTime: '12:00 PM' },
      { dayOfWeek: 'Thursday', startTime: '02:00 PM', endTime: '04:00 PM' },
      { dayOfWeek: 'Saturday', startTime: '09:00 AM', endTime: '11:00 AM' },
    ],
    reviewsCount: 34,
    averageRating: 4.96,
  },
  {
    id: 'mentor-2',
    name: 'Arthur Sterling',
    role: 'MENTOR',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    bio: 'Heirloom woodworker and master cabinetmaker. 52 years shaping white oak with hand planes, Japanese pull-saws, and mortise-and-tenon joints without a single screw.',
    location: 'Hudson Valley, NY',
    lifeMotto: 'Measure with your fingers, cut with your breath.',
    handwrittenGreeting: 'Hello friend! The wood grain already knows what it wants to become. Let me show you how to listen.',
    yearsOfExperience: 52,
    ratePerSession: 40,
    skills: [
      { id: 'skill-4', name: 'Hand-Cut Dovetails', category: 'Woodworking', iconName: 'Axe' },
      { id: 'skill-5', name: 'Japanese Pull-Saw Technique', category: 'Woodworking', iconName: 'Wrench' },
      { id: 'skill-6', name: 'Antique Furniture Restoration', category: 'Woodworking', iconName: 'Hammer' },
    ],
    availability: [
      { dayOfWeek: 'Monday', startTime: '01:00 PM', endTime: '03:00 PM' },
      { dayOfWeek: 'Wednesday', startTime: '03:00 PM', endTime: '05:00 PM' },
      { dayOfWeek: 'Friday', startTime: '10:00 AM', endTime: '12:00 PM' },
    ],
    reviewsCount: 42,
    averageRating: 5.0,
  },
  {
    id: 'mentor-3',
    name: 'Rosa Mendez',
    role: 'MENTOR',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Third-generation artisan baker & sourdough keeper. My mother passed down a starter alive since 1941. I teach hydration balance, open-crumb fermentation, and wood-fired hearth crusts.',
    location: 'Taos, New Mexico',
    lifeMotto: 'Good bread is the shortest bridge between two strangers.',
    handwrittenGreeting: 'Warmest greetings! If your hands are coated in flour, your mind cannot be burdened by worries.',
    yearsOfExperience: 40,
    ratePerSession: 30,
    skills: [
      { id: 'skill-7', name: 'Wild Sourdough Fermentation', category: 'Culinary Heritage', iconName: 'Wheat' },
      { id: 'skill-8', name: 'Heirloom Masa Nixtamalization', category: 'Culinary Heritage', iconName: 'Soup' },
      { id: 'skill-9', name: 'Hearth Dutch Oven Technique', category: 'Culinary Heritage', iconName: 'Utensils' },
    ],
    availability: [
      { dayOfWeek: 'Wednesday', startTime: '08:00 AM', endTime: '10:00 AM' },
      { dayOfWeek: 'Friday', startTime: '08:00 AM', endTime: '10:00 AM' },
      { dayOfWeek: 'Sunday', startTime: '01:00 PM', endTime: '03:00 PM' },
    ],
    reviewsCount: 29,
    averageRating: 4.93,
  },
  {
    id: 'mentor-4',
    name: 'Kenneth O’Connor',
    role: 'MENTOR',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Retired darkroom printer and analog photographer. 45 years working with silver gelatin emulsions, Zone System tonal control, and large-format view cameras.',
    location: 'Seattle, Washington',
    lifeMotto: 'Light cannot be conquered; it can only be waited upon.',
    handwrittenGreeting: 'Dear explorer of light, step into the amber glow of the darkroom with me. Let the image slowly find its voice.',
    yearsOfExperience: 45,
    ratePerSession: 35,
    skills: [
      { id: 'skill-10', name: 'Silver Gelatin Darkroom Printing', category: 'Analog Arts', iconName: 'Camera' },
      { id: 'skill-11', name: 'Zone System Exposure', category: 'Analog Arts', iconName: 'Sun' },
      { id: 'skill-12', name: 'Archival Print Toning', category: 'Analog Arts', iconName: 'Palette' },
    ],
    availability: [
      { dayOfWeek: 'Thursday', startTime: '04:00 PM', endTime: '06:00 PM' },
      { dayOfWeek: 'Saturday', startTime: '02:00 PM', endTime: '04:00 PM' },
    ],
    reviewsCount: 19,
    averageRating: 4.9,
  },
  {
    id: 'mentor-5',
    name: 'Haruki Tanaka',
    role: 'MENTOR',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    bio: 'Bonsai master and Zen landscape gardener with 50 years of quiet practice. I share the philosophy of wabi-sabi, wire training, root pruning, and seasonal contemplation.',
    location: 'Kyoto / San Francisco',
    lifeMotto: 'In pruning ten thousand branches, we discover the one true line.',
    handwrittenGreeting: 'Greetings. A tree teaches what our modern clocks forget: that true strength grows in silence.',
    yearsOfExperience: 50,
    ratePerSession: 45,
    skills: [
      { id: 'skill-13', name: 'Bonsai Branch Styling', category: 'Botany & Philosophy', iconName: 'Trees' },
      { id: 'skill-14', name: 'Dry Landscape Karesansui', category: 'Botany & Philosophy', iconName: 'Compass' },
    ],
    availability: [
      { dayOfWeek: 'Tuesday', startTime: '03:00 PM', endTime: '05:00 PM' },
      { dayOfWeek: 'Friday', startTime: '02:00 PM', endTime: '04:00 PM' },
    ],
    reviewsCount: 38,
    averageRating: 5.0,
  },
  {
    id: 'mentor-6',
    name: 'Margaret Beauchamp',
    role: 'MENTOR',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    bio: 'Heirloom seamstress and historic textile conservator. 46 years drafting couture patterns, tailoring raw Irish linen, and hand-quilting generational memory tapestries.',
    location: 'Charleston, South Carolina',
    lifeMotto: 'A stitch placed with devotion outlasts the century that made it.',
    handwrittenGreeting: 'My dear apprentice, thread your needle and let us mend what haste has worn thin.',
    yearsOfExperience: 46,
    ratePerSession: 35,
    skills: [
      { id: 'skill-15', name: 'Couture Hand Stitching', category: 'Textile Arts', iconName: 'Scissors' },
      { id: 'skill-16', name: 'Generational Quilt Geometry', category: 'Textile Arts', iconName: 'Grid' },
    ],
    availability: [
      { dayOfWeek: 'Monday', startTime: '10:00 AM', endTime: '12:00 PM' },
      { dayOfWeek: 'Thursday', startTime: '01:00 PM', endTime: '03:00 PM' },
    ],
    reviewsCount: 27,
    averageRating: 4.88,
  },
];

mentorsRouter.get('/', (req: Request, res: Response) => {
  const { category, search } = req.query;
  let filtered = [...mockMentors];

  if (category && typeof category === 'string') {
    filtered = filtered.filter((m) =>
      m.skills.some((s) => s.category.toLowerCase().includes(category.toLowerCase()))
    );
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        m.skills.some((s) => s.name.toLowerCase().includes(q))
    );
  }

  return res.json({ mentors: filtered, total: filtered.length });
});

mentorsRouter.get('/:id', (req: Request, res: Response) => {
  const mentor = mockMentors.find((m) => m.id === req.params.id);
  if (!mentor) {
    return res.status(404).json({ error: 'Mentor not found' });
  }
  return res.json({ mentor });
});
