import React, { useState } from 'react';
import { useCV } from '../../store/CVContext';
import type { SkillItem } from '../../data/types';

const SkillCategoryHelper: React.FC<{
    title: string;
    items: SkillItem[];
    onUpdate: (items: SkillItem[]) => void;
}> = ({ title, items, onUpdate }) => {
    const [newItem, setNewItem] = useState('');

    const handleAdd = () => {
        if (!newItem.trim()) return;
        const newSkill: SkillItem = {
            id: Math.random().toString(36).substr(2, 9),
            name: newItem.trim(),
            isVisible: true
        };
        onUpdate([...items, newSkill]);
        setNewItem('');
    };

    const toggleVisibility = (id: string) => {
        onUpdate(items.map(i => i.id === id ? { ...i, isVisible: !i.isVisible } : i));
    };

    const deleteItem = (id: string) => {
        onUpdate(items.filter(i => i.id !== id));
    };

    // Allow adding with Enter key
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleAdd();
    };

    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-lg">{title}</h3>

            {/* Add New */}
            <div className="flex gap-2">
                <input
                    className="flex-1 p-2 border rounded"
                    placeholder="Add new..."
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </div>

            {/* List */}
            <div className="space-y-1 max-h-60 overflow-y-auto">
                {items.length === 0 && <div className="text-sm text-slate-400 italic">No skills added yet.</div>}

                {items.map(item => (
                    <div key={item.id} className={`flex items-center justify-between p-2 rounded border ${item.isVisible ? 'bg-white' : 'bg-slate-50'}`}>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={item.isVisible}
                                onChange={() => toggleVisibility(item.id)}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className={item.isVisible ? 'text-slate-900' : 'text-slate-400 line-through'}>
                                {item.name}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm px-2"
                            title="Delete"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SkillsEditor: React.FC = () => {
    const { profile, setProfile } = useCV();
    const { skills } = profile;

    const updateCategory = (category: keyof typeof skills, newItems: SkillItem[]) => {
        setProfile({
            ...profile,
            skills: {
                ...skills,
                [category]: newItems
            }
        });
    };

    return (
        <div className="p-6 space-y-8 pb-20">
            <div>
                <h2 className="text-2xl font-bold">Skills & Interests</h2>
                <p className="text-sm text-slate-500">
                    Add skills to your master list. Check the box to show them on your CV.
                </p>
            </div>

            <div className="grid gap-8">
                <SkillCategoryHelper
                    title="Languages"
                    items={skills.languages}
                    onUpdate={items => updateCategory('languages', items)}
                />
                <SkillCategoryHelper
                    title="Technical Skills"
                    items={skills.technical}
                    onUpdate={items => updateCategory('technical', items)}
                />
                <SkillCategoryHelper
                    title="Interests"
                    items={skills.interests}
                    onUpdate={items => updateCategory('interests', items)}
                />
            </div>
        </div>
    );
};

export default SkillsEditor;
