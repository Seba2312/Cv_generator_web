import React from 'react';
import { useCV } from '../../../store/CVContext';
import { Input } from '../../ui/components';

const PersonalInfoForm: React.FC = () => {
    const { profile, updatePersonalInfo } = useCV();
    const { fullName, phone, email, location, linkedin, website, image } = profile.personalInfo;

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Personal Info</h2>

            {/* Image Upload */}
            <div>
                <label className="text-xs font-semibold uppercase text-slate-500 mb-1 block">Profile Photo (for Modern Template)</label>
                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    updatePersonalInfo('image', reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                        className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {image && (
                        <div className="relative group shrink-0">
                            <img src={image} alt="Profile" className="w-16 h-16 rounded-full object-cover border" />
                            <button onClick={() => updatePersonalInfo('image', '')} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                        </div>
                    )}
                </div>
            </div>

            <Input label="Full Name" value={fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
                <Input label="Phone" value={phone} onChange={e => updatePersonalInfo('phone', e.target.value)} />
                <Input label="Email" value={email} onChange={e => updatePersonalInfo('email', e.target.value)} />
            </div>
            <Input label="Location" value={location || ''} onChange={e => updatePersonalInfo('location', e.target.value)} />
            <Input label="LinkedIn (Optional)" value={linkedin || ''} onChange={e => updatePersonalInfo('linkedin', e.target.value)} />
            <Input label="Website (Optional)" value={website || ''} onChange={e => updatePersonalInfo('website', e.target.value)} />
        </div>
    );
};

export default PersonalInfoForm;
