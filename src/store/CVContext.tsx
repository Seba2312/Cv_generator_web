import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CVProfile, AppState } from '../data/types';
import { initialProfile } from '../data/initialData';

interface CVContextType {
    profile: CVProfile;
    activeTemplate: 'classic' | 'modern' | 'classic2' | 'modern2';
    settings: AppState['settings']; // Expose settings
    setProfile: (profile: CVProfile) => void;
    updatePersonalInfo: (field: keyof CVProfile['personalInfo'], value: string) => void;
    addItem: (section: keyof Pick<CVProfile, 'education' | 'experience' | 'projects'>, item: any) => void;
    updateItem: (section: keyof Pick<CVProfile, 'education' | 'experience' | 'projects'>, id: string, updatedItem: any) => void;
    removeItem: (section: keyof Pick<CVProfile, 'education' | 'experience' | 'projects'>, id: string) => void;
    setTemplate: (template: 'classic' | 'modern' | 'classic2' | 'modern2') => void;
    updateSettings: (settings: Partial<AppState['settings']>) => void;
    resetData: () => void;
    loadJson: (json: string) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cv_generator_data';

export const CVProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfileState] = useState<CVProfile>(initialProfile);
    const [activeTemplate, setActiveTemplate] = useState<'classic' | 'modern' | 'classic2' | 'modern2'>('classic');
    const [settings, setSettingsState] = useState<AppState['settings']>({
        activeTemplate: 'classic',
        googleSheetUrl: 'https://script.google.com/macros/s/AKfycbwWSidjQXfBQphdlYHsGx6Xa5qesIkO1LkbRi00ULFKyelxiNvL2y1mL2nqdMgrSctR_w/exec'
    });

    // Helper to migrate legacy string arrays to SkillItem arrays
    const migrateSkills = (profileData: any): CVProfile => {
        const p = { ...profileData };
        if (p.skills) {
            ['languages', 'technical', 'interests'].forEach(key => {
                if (Array.isArray(p.skills[key]) && typeof p.skills[key][0] === 'string') {
                    p.skills[key] = p.skills[key].map((s: string) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        name: s,
                        isVisible: true
                    }));
                }
            });
        }
        return p as CVProfile;
    };

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                const parsed: AppState = JSON.parse(saved);
                if (parsed.profile) setProfileState(migrateSkills(parsed.profile));
                if (parsed.settings) {
                    setSettingsState(parsed.settings);
                    // Ensure type safety when loading
                    if (['classic', 'modern', 'classic2', 'modern2'].includes(parsed.settings.activeTemplate)) {
                        setActiveTemplate(parsed.settings.activeTemplate);
                    }
                }
            } catch (e) {
                console.error("Failed to load local storage", e);
            }
        }
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        const state: AppState = {
            profile,
            settings: { ...settings, activeTemplate }
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }, [profile, activeTemplate, settings]);

    const setProfile = (newProfile: CVProfile) => setProfileState(newProfile);

    const updatePersonalInfo = (field: keyof CVProfile['personalInfo'], value: string) => {
        setProfileState(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    const addItem = (section: keyof Pick<CVProfile, 'education' | 'experience' | 'projects'>, item: any) => {
        setProfileState(prev => ({
            ...prev,
            [section]: [item, ...prev[section]]
        }));
    };

    const updateItem = (section: keyof Pick<CVProfile, 'education' | 'experience' | 'projects'>, id: string, updatedFields: any) => {
        setProfileState(prev => ({
            ...prev,
            [section]: prev[section].map(item => item.id === id ? { ...item, ...updatedFields } : item)
        }));
    };

    const removeItem = (section: keyof Pick<CVProfile, 'education' | 'experience' | 'projects'>, id: string) => {
        setProfileState(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const setTemplate = (template: 'classic' | 'modern' | 'classic2' | 'modern2') => {
        setActiveTemplate(template);
        setSettingsState(prev => ({ ...prev, activeTemplate: template }));
    };

    const updateSettings = (newSettings: Partial<AppState['settings']>) => {
        setSettingsState(prev => ({ ...prev, ...newSettings }));
    };

    const resetData = () => {
        setProfileState(initialProfile);
        setActiveTemplate('classic');
        setSettingsState({ activeTemplate: 'classic' });
    };

    const loadJson = (json: string) => {
        try {
            const parsed = JSON.parse(json);
            if (parsed.personalInfo) {
                setProfileState(migrateSkills(parsed));
            } else if (parsed.profile) {
                setProfileState(migrateSkills(parsed.profile));
                if (parsed.settings) {
                    setSettingsState(parsed.settings);
                    if (['classic', 'modern', 'classic2', 'modern2'].includes(parsed.settings.activeTemplate)) {
                        setActiveTemplate(parsed.settings.activeTemplate);
                    }
                }
            }
        } catch (e) {
            alert("Invalid JSON");
        }
    };

    return (
        <CVContext.Provider value={{
            profile,
            activeTemplate,
            settings,
            setProfile,
            updatePersonalInfo,
            addItem,
            updateItem,
            removeItem,
            setTemplate,
            updateSettings,
            resetData,
            loadJson
        }}>
            {children}
        </CVContext.Provider>
    );
};

export const useCV = () => {
    const context = useContext(CVContext);
    if (!context) {
        throw new Error('useCV must be used within a CVProvider');
    }
    return context;
};
