import React from 'react';
import { useCV } from '../store/CVContext';
import styles from './ModernTemplate2.module.css';

const ModernTemplate2: React.FC = () => {
    const { profile } = useCV();
    const { personalInfo, education, experience, projects, skills } = profile;

    return (
        <div className={styles.cvPage}>
            <div className={styles.header}>
                {personalInfo.image && (
                    <img src={personalInfo.image} alt={personalInfo.fullName} className={styles.profileImage} />
                )}
                <div className={styles.headerContent}>
                    <h1 className={styles.name}>{personalInfo.fullName}</h1>
                    <div className={styles.contact}>
                        <span>{personalInfo.email}</span>
                        {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                        {personalInfo.location && <span>| {personalInfo.location}</span>}
                        {personalInfo.website && <span>| {personalInfo.website}</span>}
                    </div>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.mainColumn}>
                    <section>
                        <h2 className={styles.sectionTitle}>Experience</h2>
                        {experience.filter(i => i.isVisible).map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemRole}>{item.subtitle}</div>
                                <div className={styles.itemOrg}>{item.title}</div>
                                <div className={styles.itemDate}>{item.date} • {item.location}</div>
                                <ul className={styles.bullets}>
                                    {item.bullets.map((b, i) => <li key={i} className={styles.bullet}>{b}</li>)}
                                </ul>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className={styles.sectionTitle}>Projects</h2>
                        {projects.filter(i => i.isVisible).map(item => (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.itemRole}>{item.title}</div>
                                <div className={styles.itemOrg}>{item.subtitle}</div>
                                <div className={styles.itemDate}>{item.date}</div>
                                <ul className={styles.bullets}>
                                    {item.bullets.map((b, i) => <li key={i} className={styles.bullet}>{b}</li>)}
                                </ul>
                            </div>
                        ))}
                    </section>
                </div>

                <div className={styles.sideColumn}>
                    <section className="mb-8">
                        <h2 className={styles.sectionTitle}>Education</h2>
                        {education.filter(i => i.isVisible).map(item => (
                            <div key={item.id} className="mb-6">
                                <div className="font-bold text-gray-800">{item.title}</div>
                                <div className="text-sm text-gray-600 mb-1">{item.subtitle}</div>
                                <div className="text-xs text-gray-500">{item.date}</div>
                            </div>
                        ))}
                    </section>

                    <section className="mb-8">
                        <h2 className={styles.sectionTitle}>Skills</h2>
                        <div className="space-y-1">
                            {skills.technical.filter(s => s.isVisible).map((s) => <span key={s.id} className={styles.skillTag}>{s.name}</span>)}
                        </div>
                    </section>

                    <section>
                        <h2 className={styles.sectionTitle}>Languages</h2>
                        <div className="space-y-1">
                            {skills.languages.filter(s => s.isVisible).map((s) => <span key={s.id} className={styles.skillTag}>{s.name}</span>)}
                        </div>
                    </section>

                    {skills.interests.some(s => s.isVisible) && <section className="mt-8">
                        <h2 className={styles.sectionTitle}>Interests</h2>
                        <div className="space-y-1">
                            {skills.interests.filter(s => s.isVisible).map((s) => <span key={s.id} className={styles.skillTag}>{s.name}</span>)}
                        </div>
                    </section>}
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate2;
