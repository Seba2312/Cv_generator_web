import React, { useState } from 'react';
import { useCV } from '../../store/CVContext';
import { Button, Input } from '../ui/components';
import type { CVItem } from '../../data/types';

interface SectionEditorProps {
    section: 'education' | 'experience' | 'projects';
    title: string;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ section, title }) => {
    const { profile, addItem, updateItem, removeItem } = useCV();
    const items = profile[section];
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleAddNew = () => {
        const newItem: CVItem = {
            id: crypto.randomUUID(),
            title: 'New Item',
            bullets: [],
            isVisible: true
        };
        addItem(section, newItem);
        setEditingId(newItem.id);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{title}</h2>
                <Button onClick={handleAddNew}>+ Add New</Button>
            </div>

            <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="border rounded bg-slate-50 overflow-hidden">
                        {/* Item Header / Summary */}
                        <div className="p-4 flex items-center justify-between bg-white border-b">
                            <div className="flex-1">
                                <div className="font-semibold">{item.title}</div>
                                <div className="text-sm text-slate-500">{item.subtitle}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="flex items-center gap-1 text-xs cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={item.isVisible}
                                        onChange={(e) => updateItem(section, item.id, { isVisible: e.target.checked })}
                                        className="rounded text-blue-600"
                                    />
                                    Include
                                </label>
                                <Button variant="secondary" className="text-sm py-1 px-2" onClick={() => setEditingId(editingId === item.id ? null : item.id)}>
                                    {editingId === item.id ? 'Close' : 'Edit'}
                                </Button>
                            </div>
                        </div>

                        {/* Editor Form (Expanded) */}
                        {editingId === item.id && (
                            <div className="p-4 space-y-4 bg-slate-50">
                                <Input
                                    label="Title (University / Company / Project)"
                                    value={item.title}
                                    onChange={(e) => updateItem(section, item.id, { title: e.target.value })}
                                />
                                <Input
                                    label="Subtitle (Degree / Role / Context)"
                                    value={item.subtitle || ''}
                                    onChange={(e) => updateItem(section, item.id, { subtitle: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Location"
                                        value={item.location || ''}
                                        onChange={(e) => updateItem(section, item.id, { location: e.target.value })}
                                    />
                                    <Input
                                        label="Date"
                                        value={item.date || ''}
                                        onChange={(e) => updateItem(section, item.id, { date: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase text-slate-500">Bullets (One per line)</label>
                                    <textarea
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                        rows={5}
                                        value={item.bullets.join('\n')}
                                        onChange={(e) => updateItem(section, item.id, { bullets: e.target.value.split('\n') })}
                                    />
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <Button variant="danger" onClick={() => {
                                        if (confirm('Delete this item?')) removeItem(section, item.id);
                                    }}>Delete</Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionEditor;
