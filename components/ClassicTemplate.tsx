import React from 'react';
import { ResumeData } from '../types';

interface Props {
  data: ResumeData;
}

const ClassicTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, activities, skills, projects, certifications } = data;

  const renderBullets = (text: string) => {
    if (!text) return null;
    const items = text.split('\n').filter(item => item.trim() !== '');
    return (
      <ul className="list-disc ml-5 mt-1 space-y-0.5">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm leading-snug">{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-black font-serif p-10 mx-auto shadow-lg box-border leading-relaxed text-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">{personalInfo.fullName}</h1>
        <div className="flex justify-center items-center gap-2 text-sm">
          <span>{personalInfo.address}</span>
          <span className="text-gray-400">|</span>
          <span>{personalInfo.cityStateZip}</span>
          <span className="text-gray-400">|</span>
          <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
          <span className="text-gray-400">|</span>
          <span>{personalInfo.phone}</span>
        </div>
      </div>

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b border-black mb-2 text-sm tracking-wider">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline font-bold">
                <span>{edu.school}</span>
                <span>{edu.city}, {edu.country}</span>
              </div>
              <div className="flex justify-between items-baseline italic">
                <span>{edu.degree}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
              {edu.description && (
                <div className="text-sm mt-1 text-gray-800">
                  {edu.description.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects / Open Source */}
      {projects && projects.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b border-black mb-2 text-sm tracking-wider">Projects / Open-Source</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <div className="flex items-baseline">
                    <span className="font-bold text-base">{project.name}</span>
                    {project.link && (
                        <>
                            <span className="mx-1">|</span>
                            <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">
                                Link
                            </a>
                        </>
                    )}
                </div>
                <span className="italic text-gray-800 text-sm">{project.technologies}</span>
              </div>
              <div className="text-sm text-gray-800 text-justify leading-snug">
                  {project.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b border-black mb-2 text-sm tracking-wider">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline font-bold">
                <span>{exp.company}</span>
                <span>{exp.city}, {exp.state}</span>
              </div>
              <div className="flex justify-between items-baseline italic mb-1">
                <span>{exp.position}</span>
                <span>{exp.startDate} – {exp.endDate}</span>
              </div>
              {renderBullets(exp.description)}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b border-black mb-2 text-sm tracking-wider">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
               <div className="flex justify-between items-baseline">
                  <div className="flex items-baseline gap-1">
                      <span className="font-bold text-base">{cert.name}</span>
                      {cert.link && (
                          <>
                              <span className="mx-1">|</span>
                              <a href={cert.link} target="_blank" rel="noreferrer" className="text-blue-800 hover:underline">Link</a>
                          </>
                      )}
                  </div>
                  {cert.date && <span className="italic text-gray-800 text-sm">{cert.date}</span>}
               </div>
               <div className="text-sm text-gray-800 italic">
                  Issued by {cert.issuer}
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Leadership & Activities */}
      {activities && activities.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b border-black mb-2 text-sm tracking-wider">Leadership & Activities</h2>
          {activities.map((act) => (
            <div key={act.id} className="mb-3">
              <div className="flex justify-between items-baseline font-bold">
                <span>{act.company}</span>
                <span>{act.city}, {act.state}</span>
              </div>
              <div className="flex justify-between items-baseline italic mb-1">
                <span>{act.position}</span>
                <span>{act.startDate} – {act.endDate}</span>
              </div>
              {renderBullets(act.description)}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="uppercase font-bold border-b border-black mb-2 text-sm tracking-wider">Skills & Interests</h2>
          <div className="space-y-1">
            {skills.map((skill) => (
              <div key={skill.id} className="text-sm">
                <span className="font-bold">{skill.category}: </span>
                <span>{skill.items}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;