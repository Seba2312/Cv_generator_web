import type { SectionType } from '../layout/MainLayout';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SectionEditor from './SectionEditor';
import SkillsEditor from './SkillsEditor';
import SettingsEditor from './SettingsEditor';

interface EditorPaneProps {
    activeSection: SectionType;
}

const EditorPane: React.FC<EditorPaneProps> = ({ activeSection }) => {
    switch (activeSection) {
        case 'personal':
            return <PersonalInfoForm />;
        case 'education':
            return <SectionEditor section="education" title="Education" />;
        case 'experience':
            return <SectionEditor section="experience" title="Work Experience" />;
        case 'projects':
            return <SectionEditor section="projects" title="Projects" />;
        case 'skills':
            return <SkillsEditor />;
        case 'settings':
            return <SettingsEditor />;
        default:
            return null;
    }
};

export default EditorPane;
