import { ActivityItem, Article, LexilePoint, ProgressPoint, QuizQuestion, UserStats } from './types';

export const DEMO_USER_STATS: UserStats = {
  quizzesDone: 42,
  accuracy: 88,
  articlesRead: 56,
  lexileScore: 850,
};

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Breakthrough in AI Could Change How We Interact with Technology',
    category: 'Technology',
    source: 'Tech Chronicle',
    timeAgo: '15m ago',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA1IsqXauAxUw1Kr2cE9FlEwsZ3_HSYwHD0Odsk8I6a8nqnUEwE7IJFdoCr6NtqQooriz4AK_-aZoHt5zjI9ChgHVA7ANgoZ3CBS-jyr7G36OceKUkdK91S-XBwpfZOCzi9qGbvtzgKWLNKcRCIyl1NiIobrFy5aMKAQIJ6SxDToMkWPxMfIu5uq08YIMl0ubC4zSGF_ebaC45-qgKwynNU1E5KiZ1fUovtxxklEB44ZNJYQI51nPMJekjmvzNg5L1aN_DZiNJygJU',
    progress: 25,
    content: [
      'Artificial Intelligence is evolving rapidly, with new models capable of reasoning and understanding context better than ever before.',
      'Researchers at top tech firms have released a new framework that allows AI to process information in a way that mimics human thought patterns more closely.',
      'This could lead to personal assistants that truly understand your needs, rather than just responding to keywords.',
    ],
  },
  {
    id: '2',
    title: "Exploring the Marianas Trench: Earth's Final Frontier",
    category: 'Science',
    source: 'GeoNews Daily',
    timeAgo: 'Oct 26, 2023',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2AeafK9I9ammBn87gnJ8Gm_2RZN2GLV8pJqcb8LDWcOTo1AzNbsmewvPp96a54QJ4LAP_tcau26rsKhYX8aHnerX6Sbqlo4u4vI3g3Le1ooD0p0olGP_6r1tiXtAk-Goj39cLvrgoWARhKPy_ZfKUqDaF-LUcXDpDVbrxhCQcFVuv5NA0fMsyGmwzMEhlQt6cQNsWiDrLNFE-vyv9FuxK5f8PX-FAc9uhSvrIaHEN517T3OnNzxQmH67q06Q87p1Mlz2tMPryfio',
    progress: 75,
    content: [
      "The Marianas Trench, a crescent-shaped scar in the Earth's crust, represents one of the most enigmatic and least-explored regions on our planet. Located in the western Pacific Ocean, it is home to the Challenger Deep, the deepest known point on Earth, plunging to depths of nearly 11,000 meters (about 36,000 feet). The pressure here is over 1,000 times that at sea level, a crushing force that would obliterate most conventional submersibles.",
      'Despite the extreme conditions—complete darkness, near-freezing temperatures, and immense pressure—life has found a way to thrive. Scientists have discovered a variety of unique organisms, known as extremophiles, adapted to this harsh environment. These include giant amoebas called xenophyophores, translucent snailfish, and shrimp-like amphipods that thrive in the crushing depths.',
      'Studying these creatures provides invaluable insights into the limits of life and the potential for existence in other extreme environments, both on Earth and potentially on other planets. The unique biochemical adaptations these organisms possess could also hold the key to new discoveries in biotechnology and medicine.',
      "Recent expeditions, utilizing advanced remotely operated vehicles (ROVs), have expanded our understanding of the trench's geology and biology. These missions have collected sediment samples, recorded never-before-seen species, and mapped the trench floor with unprecedented detail.",
    ],
  },
  {
    id: '3',
    title: 'Ancient Roman Villa Unearthed with Perfectly Preserved Mosaics',
    category: 'History',
    source: 'History Today',
    timeAgo: '5h ago',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCsOxQV8w-M65kPKpXY3jQOAtTWrzh47ofSyrLvbXQ__MGmk8EpuS5lOGpiVZyMgaC-otkKYbh4uqMdrTetJBSdPhcnMpN-h5a4iXq6rrhbny2yXprR5wrRGQcJfouN3uCITYCeFWLXkA7dD0np8Yz8vwmhhNWdjvr05xhj9J_ioeXMWXUaoBRbwSilhm8TJFt0xY1xzingQMmioXIARBzRXxwEVywNxBjqGRzxqjwj9gsSCXjIifZz8R3PphG0MHcyjBAZnkJF1M',
    progress: 0,
    content: [
      'Archaeologists have stumbled upon a remarkable find in the outskirts of Rome.',
      'A villa dating back to the 2nd century AD has been found with its intricate floor mosaics largely intact.',
    ],
  },
  {
    id: '4',
    title: 'Astronomers Detect Mysterious Signal From Edge of the Galaxy',
    category: 'Science',
    source: 'Space.com',
    timeAgo: '1d ago',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuACCNg6PThVE0Q7UXmHjS34WgqPSWppPKg8ufh7yHGI-1asUN3-vIqJTDdZs_uLDh8lD6b2qSr8XAq-m6dfvtbr6dG8EnaT5NTKQqUquSnIB3T01gqMt2YjO0opyi2pP9jm273YeRPrJwvnKSi9CdlxwmKTdhVwKbYyTYtOAk0MUNUpsGVHRChtfWIZk9ChZ97oqHKZ8GimX5Yv3nzR9licOpPKIquby2Ai6CX0y7wqZ-Au3--WwVzypouUbvab4eEYiRGBdypR7QU',
    progress: 0,
    content: [
      'A repeating radio signal has been detected from a source thousands of lightyears away.',
      'This phenomenon, known as a Fast Radio Burst (FRB), continues to puzzle scientists.',
    ],
  },
];

export const MOCK_QUIZ: QuizQuestion = {
  id: 'q1',
  text: 'What is the main reason for the recent surge in renewable energy adoption?',
  options: [
    { id: 'a', text: 'Decreasing costs and technological advancements.' },
    { id: 'b', text: 'Sudden increase in fossil fuel availability.' },
    { id: 'c', text: 'Global decline in energy consumption.' },
    { id: 'd', text: 'International policies banning traditional energy.' },
  ],
  correctOptionId: 'a',
  explanation: 'Costs have dropped significantly, making solar and wind power more competitive.',
};

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: 'a1', title: 'The Future of Space Exploration', date: 'Oct 26, 2023', score: '9/10' },
  { id: 'a2', title: 'Climate Change: A Global Challenge', date: 'Oct 24, 2023', score: '7/10' },
];

export const LEXILE_HISTORY: LexilePoint[] = [
  { label: 'Sep', score: 800 },
  { label: 'Oct', score: 820 },
  { label: 'Nov', score: 840 },
  { label: 'Dec', score: 850 },
];

export const WEEKLY_PROGRESS: ProgressPoint[] = [
  { label: 'Mon', value: 80 },
  { label: 'Tue', value: 60 },
  { label: 'Wed', value: 90 },
  { label: 'Thu', value: 50 },
  { label: 'Fri', value: 100 },
  { label: 'Sat', value: 75 },
  { label: 'Sun', value: 95 },
];
