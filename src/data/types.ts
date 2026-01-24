export interface CVItem {
    id: string;
    title: string; // e.g. University Name, Company Name, Project Name
    subtitle?: string; // e.g. Degree, Role, Context
    location?: string;
    date?: string;
    bullets: string[];
    isVisible: boolean; // For selection logic
}

export interface SocialLink {
    platform: string;
    url: string;
    username: string;
}

export interface CVProfile {
    id: string; // specialized for saving multiple profiles if needed later
    personalInfo: {
        fullName: string;
        phone: string;
        email: string;
        location?: string;
        website?: string;
        linkedin?: string;
        github?: string;
        image?: string; // base64
    };
    education: CVItem[];
    experience: CVItem[];
    projects: CVItem[];
    skills: {
        languages: SkillItem[];
        technical: SkillItem[];
        interests: SkillItem[];
    };
}

export interface SkillItem {
    id: string;
    name: string;
    isVisible: boolean;
}

export interface AppState {
    profile: CVProfile;
    settings: {
        activeTemplate: 'classic' | 'modern' | 'classic2' | 'modern2';
        googleSheetUrl?: string;
    };
}
