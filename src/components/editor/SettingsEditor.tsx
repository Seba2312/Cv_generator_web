import React, { useRef, useState } from 'react';
import { useCV } from '../../store/CVContext';
import { Button, Input } from '../ui/components';
import { downloadJson, readJsonFile } from '../../utils/fileHelpers';

const SettingsEditor: React.FC = () => {
    const { profile, activeTemplate, settings, setTemplate, updateSettings, setProfile, resetData, loadJson } = useCV();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);
    const [syncStatus, setSyncStatus] = useState<string>('');
    const [folderFiles, setFolderFiles] = useState<File[]>([]);

    const handleSaveFile = () => {
        downloadJson(profile, `cv-backup-${new Date().toISOString().split('T')[0]}.json`);
    };

    const handleLoadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            try {
                const json = await readJsonFile(e.target.files[0]);
                loadJson(json);
            } catch (err) {
                alert('Failed to read file');
            }
        }
    };

    const handleFolderSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const jsonFiles = files.filter(f => f.name.endsWith('.json'));
            setFolderFiles(jsonFiles);

            // Magic Image Loader: Check for mypic.png/jpg/jpeg
            const imageFile = files.find(f => ['mypic.png', 'mypic.jpg', 'mypic.jpeg'].includes(f.name.toLowerCase()));
            if (imageFile) {
                try {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64String = reader.result as string;
                        // Determine type based on extension
                        // const type = imageFile.name.toLowerCase().endsWith('.png') ? 'png' : 'jpeg';

                        // Update profile image automatically
                        setProfile({
                            ...profile,
                            personalInfo: {
                                ...profile.personalInfo,
                                image: base64String
                            }
                        });
                        alert(`Magic Loader: Automatically loaded profile image from ${imageFile.name}`);
                    };
                    reader.readAsDataURL(imageFile);
                } catch (err) {
                    console.error("Failed to load auto-image", err);
                }
            }
        }
    };

    const loadFromFileInFolder = async (file: File) => {
        try {
            const json = await readJsonFile(file);
            loadJson(json);
        } catch (err) {
            alert('Failed to read file');
        }
    };

    const handleGoogleSync = async (direction: 'upload' | 'download') => {
        if (!settings?.googleSheetUrl) {
            alert('Please enter a Google Apps Script Web App URL first.');
            return;
        }

        setSyncStatus('Syncing...');
        try {
            if (direction === 'upload') {
                await fetch(settings.googleSheetUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify(profile)
                });
                setSyncStatus('Upload sent (check Sheet)');
            } else {
                const res = await fetch(settings.googleSheetUrl);
                const data = await res.json();
                if (data && data.personalInfo) {
                    setProfile(data);
                    setSyncStatus('Download complete');
                } else {
                    setSyncStatus('Invalid data received');
                }
            }
        } catch (e) {
            console.error(e);
            setSyncStatus('Sync failed');
        }
    };

    return (
        <div className="p-6 space-y-8 pb-20">
            <h2 className="text-2xl font-bold">Settings</h2>

            {/* Template Selection */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Template</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setTemplate('classic')} className={`p-4 border rounded-lg text-center ${activeTemplate === 'classic' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-slate-50'}`}>
                        <div className="font-bold">Original HTML</div>
                        <div className="text-xs text-slate-500">Clean, Classic</div>
                    </button>
                    <button onClick={() => setTemplate('classic2')} className={`p-4 border rounded-lg text-center ${activeTemplate === 'classic2' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-slate-50'}`}>
                        <div className="font-bold">Academic</div>
                        <div className="text-xs text-slate-500">Serif, Condensed</div>
                    </button>
                    <button onClick={() => setTemplate('modern')} className={`p-4 border rounded-lg text-center ${activeTemplate === 'modern' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-slate-50'}`}>
                        <div className="font-bold">Modern Sidebar</div>
                        <div className="text-xs text-slate-500">Photo, Dark Left</div>
                    </button>
                    <button onClick={() => setTemplate('modern2')} className={`p-4 border rounded-lg text-center ${activeTemplate === 'modern2' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-slate-50'}`}>
                        <div className="font-bold">Modern Bold</div>
                        <div className="text-xs text-slate-500">Photo, Split Header</div>
                    </button>
                </div>
            </div>

            {/* Folder Loader */}
            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Load from Folder</h3>
                <div className="flex flex-col gap-2">
                    <input
                        type="file"
                        webkitdirectory=""
                        directory=""
                        className="hidden"
                        ref={folderInputRef}
                        onChange={handleFolderSelect}
                    />
                    <Button variant="secondary" onClick={() => folderInputRef.current?.click()}>
                        Select Folder with JSONs
                    </Button>

                    {folderFiles.length > 0 && (
                        <div className="border rounded bg-slate-50 max-h-40 overflow-y-auto p-2 space-y-1">
                            {folderFiles.map((f, i) => (
                                <button key={i} onClick={() => loadFromFileInFolder(f)} className="w-full text-left px-3 py-2 bg-white rounded border hover:bg-blue-50 text-sm flex justify-between">
                                    <span>{f.name}</span>
                                    <span className="text-xs text-slate-400">Load</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Google Sheets Sync */}
            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Google Drive / Sheets Cloud Sync</h3>
                <p className="text-xs text-slate-500">
                    Host your own backend using Google Apps Script.
                </p>
                <Input
                    label="Web App URL"
                    value={settings?.googleSheetUrl || ''}
                    onChange={e => updateSettings({ googleSheetUrl: e.target.value })}
                    placeholder="https://script.google.com/macros/s/..."
                />
                <div className="flex gap-2">
                    <Button onClick={() => handleGoogleSync('upload')} className="flex-1">Upload to Cloud</Button>
                    <Button variant="secondary" onClick={() => handleGoogleSync('download')} className="flex-1">Download from Cloud</Button>
                </div>
                {syncStatus && <div className="text-xs text-blue-600 font-medium">{syncStatus}</div>}
            </div>

            {/* Local Data Management */}
            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Local Data</h3>
                <div className="flex flex-col gap-3">
                    <Button onClick={handleSaveFile}>Save / Export JSON</Button>

                    <div className="flex gap-2">
                        <input
                            type="file"
                            accept=".json"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleLoadFile}
                        />
                        <Button variant="secondary" className="flex-1" onClick={() => fileInputRef.current?.click()}>
                            Load Single JSON
                        </Button>
                        <Button variant="danger" className="flex-1" onClick={() => {
                            if (confirm('Are you sure you want to reset all data? This cannot be undone.')) resetData();
                        }}>
                            Reset Everything
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

declare module 'react' {
    interface InputHTMLAttributes<T> extends React.HTMLAttributes<T> {
        webkitdirectory?: string;
        directory?: string;
    }
}

export default SettingsEditor;
