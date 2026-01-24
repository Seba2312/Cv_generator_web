import React, { useState } from 'react';
import Sidebar from './Sidebar';
import EditorPane from '../editor/EditorPane';
import PreviewPane from './PreviewPane'; // We will create this next

export type SectionType = 'personal' | 'education' | 'experience' | 'projects' | 'skills' | 'settings';

const MainLayout: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionType>('personal');


    return (
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden print:overflow-visible print:h-auto print:block text-slate-800 font-sans">
            {/* Sidebar Navigation */}
            <div className="no-print">
                <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            </div>

            {/* Editor Pane (Middle) */}
            <div className="w-full max-w-lg border-r border-slate-200 bg-white flex flex-col h-full overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 no-print">
                <EditorPane activeSection={activeSection} />
            </div>

            {/* Preview Pane (Right) */}
            <div className="flex-1 bg-slate-100 p-8 overflow-y-auto flex justify-center relative print:p-0 print:bg-white print:block print:overflow-visible">
                <div className="scale-[0.85] origin-top sm:scale-90 md:scale-95 lg:scale-100 transition-transform print:scale-100 print:transform-none">
                    <PreviewPane />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
