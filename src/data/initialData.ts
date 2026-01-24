import type { CVProfile } from './types';

export const initialProfile: CVProfile = {
    id: 'default',
    personalInfo: {
        fullName: 'Your Name',
        phone: '+1 234 567 890',
        email: 'email@example.com',
        location: 'City, Country',
        image: '', // Empty initially
    },
    education: [
        {
            id: 'edu-1',
            title: 'University Name',
            subtitle: 'Degree and Field',
            location: 'City, Country',
            date: 'Start — End',
            bullets: ['Achievement, scholarship, GPA, honours'],
            isVisible: true,
        },
        {
            id: 'edu-2',
            title: 'University Name',
            subtitle: 'Exchange or Programme',
            location: 'City, Country',
            date: 'Start — End',
            bullets: ['Programme details, focus areas'],
            isVisible: true,
        },
    ],
    experience: [
        {
            id: 'exp-1',
            title: 'Organisation Name',
            subtitle: 'Role Title',
            location: 'City, Country',
            date: 'Start — End',
            bullets: ['Key responsibility or achievement', 'Key responsibility or achievement'],
            isVisible: true,
        },
        {
            id: 'exp-2',
            title: 'Company Name',
            subtitle: 'Role Title',
            location: 'City, Country',
            date: 'Start — End',
            bullets: ['Key responsibility or achievement', 'Key responsibility or achievement'],
            isVisible: true,
        },
    ],
    projects: [
        {
            id: 'proj-1',
            title: 'Project Name',
            subtitle: 'Role and Context',
            location: 'City, Country',
            date: 'Start — End',
            bullets: ['Project goal and contribution', 'Methods, technologies, or results'],
            isVisible: true,
        },
    ],
    skills: {
        languages: [
            { id: 'l1', name: 'English', isVisible: true },
            { id: 'l2', name: 'Spanish', isVisible: true }
        ],
        technical: [
            { id: 't1', name: 'React', isVisible: true },
            { id: 't2', name: 'TypeScript', isVisible: true },
            { id: 't3', name: 'TailwindCSS', isVisible: true },
            { id: 't4', name: 'Node.js', isVisible: false } // Example hidden one
        ],
        interests: [
            { id: 'i1', name: 'Coding', isVisible: true },
            { id: 'i2', name: 'Design', isVisible: true }
        ],
    },
};
