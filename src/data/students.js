// Batch 2023–2027. Leaders have a front photo and a "back" photo revealed on flip.
export const leaders = [
  { name: 'Vicent Bernabe V. Romeo', role: 'Leader', front: '/img/Daisu.png', back: '/img/Daisu.png', github: 'https://github.com', facebook: 'https://facebook.com' },
  { name: 'Elijah Tugad', role: 'Leader', front: '/img/elijah.png', back: '/img/meme-elijah.jpg', github: 'https://github.com', facebook: 'https://facebook.com' },
  { name: 'Lord Jason Riveral', role: 'Leader', front: '/img/jason.png', back: '/img/meme-jason.jpg', github: 'https://github.com', facebook: 'https://facebook.com' },
  { name: 'John Cadaro', role: 'Leader', front: '/img/john.png', back: '/img/meme-john.jpg', github: 'https://github.com', facebook: 'https://facebook.com' },
  { name: 'Marco Montellano', role: 'Leader', front: '/img/Marco.jpg', back: '/img/meme-marco.jpg', github: 'https://github.com', facebook: 'https://facebook.com' },
  { name: 'Zea Marae Ramil', role: 'Leader', front: '/img/zea.png', back: '/img/zea.png', github: 'https://github.com', facebook: 'https://facebook.com' },
  { name: 'Merry Apple Edaño', role: 'Leader', front: '/img/apple.png', back: '/img/apple.png', github: 'https://github.com', facebook: 'https://facebook.com' },
  { name: 'Allan Jr. De Jesus', role: 'Leader', front: '/img/allan.png', back: '/img/meme-allan.jpg', github: 'https://github.com', facebook: 'https://facebook.com' },
];

export const classmates = [
  'Kier Louie Arriesgado', 'Francis Keith Banan', 'Romel Batusbatusan', 'John Fernand Bauno',
  'Monick Cabagte', 'Fanny Rose Caballes', 'Carmela Cabardo', 'Hazzel Canama', 'Christine Conde',
  'Jhemarsh Lee Conde', 'Jovannie Congson', 'Bea Dejito', 'Frances Mae Dela Pieza', 'Bea Delos Santos',
  'Vence Peter Doble', 'Justin Dumon', 'Kirt Irah Fernandez', 'Mariel Gonato', 'Lawrence Ledesma',
  'Alexa Suzane Loon', 'Jerome Magdadaro', 'Restie Moralde', 'Reyvehn Nulla', 'Rheina Ompoy',
  'Raniza Pepito', 'Matthew Gayle Pepito', 'Alyza Pitogo', 'Christine Rosalejos', 'Angel Mae Santosidad',
  'Benjie Sumile', 'Kenneth Brian Tangkay', 'Ma. Bliza Tayo', 'Elijah Glenn B. Tugad', 'Lourence Zambas',
].map((name) => ({ name, role: 'BSIT Student', facebook: 'https://facebook.com' }));

export const batchSize = leaders.length + classmates.length;
