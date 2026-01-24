import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => (
    <div className="flex flex-col gap-1">
        {label && <label className="text-xs font-semibold uppercase text-slate-500">{label}</label>}
        <input className={`px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} {...props} />
    </div>
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className, ...props }) => (
    <div className="flex flex-col gap-1">
        {label && <label className="text-xs font-semibold uppercase text-slate-500">{label}</label>}
        <textarea className={`px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] ${className}`} {...props} />
    </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }> = ({ variant = 'primary', className, ...props }) => {
    const base = "px-4 py-2 rounded font-medium transition-colors";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
        danger: "bg-red-50 text-red-600 hover:bg-red-100"
    };
    return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
};
