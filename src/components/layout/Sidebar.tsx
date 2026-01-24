import React from 'react';
import type { SectionType } from './MainLayout';

interface SidebarProps {
    activeSection: SectionType;
    setActiveSection: (section: SectionType) => void;
}

const navItems: { id: SectionType; label: string; icon: string }[] = [
    { id: 'personal', label: 'Profile', icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
    return (
        <nav className="w-20 bg-slate-900 flex flex-col items-center py-6 gap-2 shrink-0 z-20">
            <div className="mb-4 text-white font-bold text-xl tracking-tighter">CV</div>
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-200
            ${activeSection === item.id
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-105'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
          `}
                    title={item.label}
                >
                    {item.icon}
                </button>
            ))}
        </nav>
    );
};

export default Sidebar;
