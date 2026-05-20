import React from 'react';
import { useCV } from '../store/CVContext';
import styles from './ClassicTemplate.module.css';

const ClassicTemplate: React.FC = () => {
    const { profile } = useCV();
    const { personalInfo, education, experience, projects, skills } = profile;

    return (
        <div className={`${styles.cvPage} text-neutral-900 antialiased`}>
            <div className={styles.cvInner}>
                {/* Header */}
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-semibold tracking-tight uppercase">{personalInfo.fullName}</h1>
                    <p className="mt-1 text-[13px] text-neutral-700">
                        <span>{personalInfo.phone}</span>
                        <span className="mx-2">|</span>
                        <span>{personalInfo.email}</span>
                        {personalInfo.location && (
                            <>
                                <span className="mx-2">|</span>
                                <span>{personalInfo.location}</span>
                            </>
                        )}
                        {personalInfo.linkedin && (
                            <>
                                <span className="mx-2">|</span>
                                <a
                                    href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    LinkedIn
                                </a>
                            </>
                        )}
                        {personalInfo.website && (
                            <>
                                <span className="mx-2">|</span>
                                <a
                                    href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {personalInfo.website.toLowerCase().includes('github.com') ? 'GitHub' : 'Website'}
                                </a>
                            </>
                        )}
                    </p>
                </header>

                {/* Education */}
                <section className={`${styles.cvSection} pt-0`}>
                    <h2 className={styles.cvSectionTitle}>Education</h2>
                    <div className={`${styles.cvBlock} space-y-2`}>
                        {education.filter(item => item.isVisible).map(item => (
                            <div key={item.id} className={styles.cvAvoidBreak}>
                                <div className={styles.cvRow}>
                                    <div>
                                        <div className={styles.cvHeading}>
                                            {item.title}
                                            {item.subtitle && <span className={styles.cvRole}> • {item.subtitle}</span>}
                                        </div>
                                        <ul className={styles.cvList}>
                                            {item.bullets.map((bullet, idx) => (
                                                <li key={idx} className={styles.cvItem}>{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.cvLocation}>
                                        {item.location}
                                        {item.date && <><br />{item.date}</>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Work Experience */}
                <section className={styles.cvSection}>
                    <h2 className={styles.cvSectionTitle}>Work Experience</h2>
                    <div className={`${styles.cvBlock} space-y-2`}>
                        {experience.filter(item => item.isVisible).map(item => (
                            <div key={item.id} className={styles.cvAvoidBreak}>
                                <div className={styles.cvRow}>
                                    <div>
                                        <div className={styles.cvHeading}>
                                            {item.title}
                                            {item.subtitle && <span className={styles.cvRole}> • {item.subtitle}</span>}
                                        </div>
                                        <ul className={styles.cvList}>
                                            {item.bullets.map((bullet, idx) => (
                                                <li key={idx} className={styles.cvItem}>{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.cvLocation}>
                                        {item.location}
                                        {item.date && <><br />{item.date}</>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className={styles.cvSection}>
                    <h2 className={styles.cvSectionTitle}>Projects</h2>
                    <div className={`${styles.cvBlock} space-y-2`}>
                        {projects.filter(item => item.isVisible).map(item => (
                            <div key={item.id} className={styles.cvAvoidBreak}>
                                <div className={styles.cvRow}>
                                    <div>
                                        <div className={styles.cvHeading}>
                                            {item.title}
                                            {item.subtitle && <span className={styles.cvRole}> • {item.subtitle}</span>}
                                        </div>
                                        <ul className={styles.cvList}>
                                            {item.bullets.map((bullet, idx) => (
                                                <li key={idx} className={styles.cvItem}>{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.cvLocation}>
                                        {item.location}
                                        {item.date && <><br />{item.date}</>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills & Interests */}
                <section className={styles.cvSection}>
                    <h2 className={styles.cvSectionTitle}>Skills & Interests</h2>
                    <div className={`${styles.cvBlock} space-y-1 text-[12.5px]`}>
                        {skills.languages.some(s => s.isVisible) && (
                            <div className={styles.cvItem}>
                                <span className="font-semibold">Languages:</span> {skills.languages.filter(s => s.isVisible).map(s => s.name).join(', ')}
                            </div>
                        )}
                        {skills.technical.some(s => s.isVisible) && (
                            <div className={styles.cvItem}>
                                <span className="font-semibold">Technical:</span> {skills.technical.filter(s => s.isVisible).map(s => s.name).join(', ')}
                            </div>
                        )}
                        {skills.interests.some(s => s.isVisible) && (
                            <div className={styles.cvItem}>
                                <span className="font-semibold">Interests:</span> {skills.interests.filter(s => s.isVisible).map(s => s.name).join(', ')}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ClassicTemplate;
