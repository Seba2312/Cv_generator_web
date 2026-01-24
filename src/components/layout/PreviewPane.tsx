import React from 'react';
import { useCV } from '../../store/CVContext';
import ClassicTemplate from '../../templates/ClassicTemplate';
import ModernTemplate from '../../templates/ModernTemplate';
import ClassicTemplate2 from '../../templates/ClassicTemplate2';
import ModernTemplate2 from '../../templates/ModernTemplate2';

const PreviewPane: React.FC = () => {
    const { activeTemplate } = useCV();
    const [zoom, setZoom] = React.useState(1);
    const [showFitMenu, setShowFitMenu] = React.useState(false);

    const print = () => {
        window.print();
    };

    const handleFit = (level: 'reset' | 'light' | 'medium' | 'hard') => {
        switch (level) {
            case 'reset': setZoom(1); break;
            case 'light': setZoom(0.95); break;
            case 'medium': setZoom(0.85); break;
            case 'hard': setZoom(0.75); break;
        }
        setShowFitMenu(false);
    };

    const renderTemplate = () => {
        switch (activeTemplate) {
            case 'classic': return <ClassicTemplate />;
            case 'modern': return <ModernTemplate />;
            case 'classic2': return <ClassicTemplate2 />;
            case 'modern2': return <ModernTemplate2 />;
            default: return <ClassicTemplate />;
        }
    };

    return (
        <div className="flex flex-col items-center print:block print:w-full">
            <div className="mb-4 flex gap-4 no-print items-center relative">
                {/* Toolbar */}
                <button onClick={print} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors">
                    Download PDF
                </button>

                <div className="relative">
                    <button
                        onClick={() => setShowFitMenu(!showFitMenu)}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <span>Fit to 1 Page</span>
                        <span className="text-xs">
                            {zoom === 1 ? '(Default)' : zoom === 0.95 ? '(Light)' : zoom === 0.85 ? '(Medium)' : '(Hard)'}
                        </span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {showFitMenu && (
                        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded shadow-lg z-10 py-1">
                            <button onClick={() => handleFit('reset')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                                Standard (100%)
                            </button>
                            <button onClick={() => handleFit('light')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                                Light (Reduce fonts by ~1)
                            </button>
                            <button onClick={() => handleFit('medium')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                                Medium (Reduce fonts by ~2)
                            </button>
                            <button onClick={() => handleFit('hard')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                                Hard (Reduce fonts by ~3)
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="shadow-2xl print:shadow-none bg-white print:w-full origin-top"
                style={{
                    // Use zoom for Chrome/Edge/Safari (renders layout smaller)
                    // @ts-ignore
                    zoom: zoom,
                    // Fallback for Firefox (conceptually, though zoom is preferred for layout shrink)
                    MozTransform: `scale(${zoom})`,
                    MozTransformOrigin: 'top center'
                }}
            >
                {renderTemplate()}
            </div>
        </div>
    );
};

export default PreviewPane;
