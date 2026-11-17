import { Laptop, Wrench, Server, Palette } from 'lucide-react';

export const programs = [
  { title: 'Computer Science', icon: Laptop, hue: 172, description: 'Algorithms, software engineering, and the theory of computation.' },
  { title: 'Engineering', icon: Wrench, hue: 38, description: 'Practical engineering principles applied to real problems.' },
  { title: 'Information Technology', icon: Server, hue: 195, description: 'Modern IT systems, networks, and digital infrastructure.' },
  { title: 'Multimedia Arts', icon: Palette, hue: 330, description: 'Digital content built through design and creativity.' },
];

export const projects = [
  {
    title: 'Daanbantayan Paradise',
    description: 'Tourist booking platform for Daanbantayan, Cebu. Connects travelers with accommodations, diving adventures, and island hopping tours at the northern tip of Cebu.',
    image: '/img/project/db.png', tags: ['Tourism', 'Booking System', 'Web App'], year: '2023–2024', link: 'https://dbtourist.vercel.app/',
  },
  {
    title: 'SSG Innovoice',
    description: 'Digital suggestion box for the student government: collect, manage, and respond to student feedback.',
    image: '/img/project/innovoice.png', tags: ['Suggestion System', 'Student Portal', 'Web App'], year: '2024–2025', link: 'https://ssginnovoice.filipino.gg/',
  },
  {
    title: 'GPTracker',
    description: 'Transparent group payment records. Create tabs, add members, record transactions, and generate reports with Firebase.',
    image: '/img/project/gpt.png', tags: ['Payment Tracker', 'Firebase', 'Google Auth'], year: '2024–2025', link: 'https://group-payment-tracker.web.app/',
  },
  {
    title: 'OnBoard',
    description: 'Community management with the Bayanihan spirit: attendance tracking, performance monitoring, and communication tools.',
    image: '/img/project/onboard.png', tags: ['Community', 'Attendance', 'Dashboard'], year: '2024–2025', link: 'https://onboard-40e06.web.app/',
  },
  {
    title: 'SSG Office Assistant',
    description: 'Prototype office system for the student government covering admin tasks, documents, and student services.',
    image: '/img/project/ssg.png', tags: ['Office Management', 'Student Services', 'Prototype'], year: '2024–2025', link: 'https://elijahtugad2005.github.io/Prototype-SSG-Office-Assistant-App/',
  },
];
