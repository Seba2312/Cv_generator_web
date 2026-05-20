import React from 'react';
import { useCV } from '../store/CVContext';
import styles from './ClassicTemplate2.module.css';

const ClassicTemplate2: React.FC = () => {
    const { profile } = useCV();
    const { personalInfo, education, experience, projects, skills } = profile;

    return (
        <div className={styles.cvPage}>
            <header className={styles.header}>
                <h1 className={styles.name}>{personalInfo.fullName}</h1>
                <div className={styles.contact}>
                    <span>{personalInfo.email}</span>
                    {personalInfo.phone && <span> • {personalInfo.phone}</span>}
                    {personalInfo.location && <span> • {personalInfo.location}</span>}
                    {personalInfo.linkedin && (
                        <span> • <a
                            href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            LinkedIn
                        </a></span>
                    )}
                    {personalInfo.website && <span> • <a
                        href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        {personalInfo.website.toLowerCase().includes('github.com') ? 'GitHub' : 'Website'}
                    </a></span>}
                </div>
            </header>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Education</h2>
                {education.filter(toShow => toShow.isVisible).map(edu => (
                    <div key={edu.id} className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span>{edu.title}</span>
                            <span>{edu.location}</span>
                        </div>
                        <div className={styles.itemMeta}>
                            <span>{edu.subtitle}</span>
                            <span>{edu.date}</span>
                        </div>
                        <ul className={styles.bullets}>
                            {edu.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Experience</h2>
                {experience.filter(toShow => toShow.isVisible).map(exp => (
                    <div key={exp.id} className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span>{exp.title}</span>
                            <span>{exp.location}</span>
                        </div>
                        <div className={styles.itemMeta}>
                            <span>{exp.subtitle}</span>
                            <span>{exp.date}</span>
                        </div>
                        <ul className={styles.bullets}>
                            {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Projects</h2>
                {projects.filter(toShow => toShow.isVisible).map(proj => (
                    <div key={proj.id} className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span>{proj.title}</span>
                            <span>{proj.location}</span>
                        </div>
                        <div className={styles.itemMeta}>
                            <span>{proj.subtitle}</span>
                            <span>{proj.date}</span>
                        </div>
                        <ul className={styles.bullets}>
                            {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                    </div>
                ))}
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                {skills.languages.some(s => s.isVisible) && (
                    <div className={styles.skillsGroup}>
                        <span className={styles.skillsLabel}>Languages:</span>
                        <span>{skills.languages.filter(s => s.isVisible).map(s => s.name).join(', ')}</span>
                    </div>
                )}
                {skills.technical.some(s => s.isVisible) && (
                    <div className={styles.skillsGroup}>
                        <span className={styles.skillsLabel}>Technical:</span>
                        <span>{skills.technical.filter(s => s.isVisible).map(s => s.name).join(', ')}</span>
                    </div>
                )}
                {skills.interests.some(s => s.isVisible) && (
                    <div className={styles.skillsGroup}>
                        <span className={styles.skillsLabel}>Interests:</span>
                        <span>{skills.interests.filter(s => s.isVisible).map(s => s.name).join(', ')}</span>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ClassicTemplate2;
