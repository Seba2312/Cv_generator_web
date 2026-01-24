import React from 'react';
import { useCV } from '../store/CVContext';
import styles from './ModernTemplate.module.css';

const ModernTemplate: React.FC = () => {
    const { profile } = useCV();
    const { personalInfo, education, experience, projects, skills } = profile;

    return (
        <div className={styles.cvPage}>
            {/* Left Sidebar */}
            <div className={styles.sidebar}>
                {personalInfo.image && (
                    <img src={personalInfo.image} alt={personalInfo.fullName} className={styles.profileImage} />
                )}

                <div className={styles.sidebarSection}>
                    <h3 className={styles.sidebarTitle}>Contact</h3>
                    <div className={styles.contactItem}>{personalInfo.email}</div>
                    <div className={styles.contactItem}>{personalInfo.phone}</div>
                    {personalInfo.location && <div className={styles.contactItem}>{personalInfo.location}</div>}
                    {personalInfo.website && <div className={styles.contactItem}>{personalInfo.website}</div>}
                    {personalInfo.linkedin && <div className={styles.contactItem}>{personalInfo.linkedin}</div>}
                </div>

                <div className={styles.sidebarSection}>
                    <h3 className={styles.sidebarTitle}>Skills</h3>
                    <div className="flex flex-wrap">
                        {skills.technical.filter(s => s.isVisible).map((skill) => (
                            <span key={skill.id} className={styles.skillItem}>{skill.name}</span>
                        ))}
                    </div>
                </div>

                <div className={styles.sidebarSection}>
                    <h3 className={styles.sidebarTitle}>Languages</h3>
                    <div className="flex flex-wrap">
                        {skills.languages.filter(s => s.isVisible).map((lang) => (
                            <span key={lang.id} className={styles.skillItem}>{lang.name}</span>
                        ))}
                    </div>
                </div>

                <div className={styles.sidebarSection}>
                    <h3 className={styles.sidebarTitle}>Interests</h3>
                    <div className="flex flex-wrap">
                        {skills.interests.filter(s => s.isVisible).map((int) => (
                            <span key={int.id} className={styles.skillItem}>{int.name}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.main}>
                <header>
                    <h1 className={styles.mainTitle}>{personalInfo.fullName}</h1>
                    <p className={styles.mainSubtitle}>Professional Title or Summary (Use Profile)</p>
                </header>

                <section>
                    <h2 className={styles.sectionTitle}>Experience</h2>
                    <div className="space-y-4">
                        {experience.filter(i => i.isVisible).map(item => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">{item.subtitle}</h3>
                                    <span className="text-sm font-semibold text-slate-500">{item.date}</span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="font-medium text-slate-700">{item.title}</h4>
                                    <span className="text-sm italic text-slate-500">{item.location}</span>
                                </div>
                                <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                                    {item.bullets.map((b, idx) => (
                                        <li key={idx}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    <div className="space-y-4">
                        {education.filter(i => i.isVisible).map(item => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <span className="text-sm font-semibold text-slate-500">{item.date}</span>
                                </div>
                                <div className="mb-2">
                                    <h4 className="font-medium text-slate-700">{item.subtitle}</h4>
                                    <span className="text-sm italic text-slate-500 block">{item.location}</span>
                                </div>
                                <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                                    {item.bullets.map((b, idx) => (
                                        <li key={idx}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className={styles.sectionTitle}>Projects</h2>
                    <div className="space-y-4">
                        {projects.filter(i => i.isVisible).map(item => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <span className="text-sm font-semibold text-slate-500">{item.date}</span>
                                </div>
                                <div className="mb-2">
                                    <h4 className="font-medium text-slate-700">{item.subtitle}</h4>
                                </div>
                                <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                                    {item.bullets.map((b, idx) => (
                                        <li key={idx}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ModernTemplate;
