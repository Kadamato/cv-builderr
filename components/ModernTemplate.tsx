import React from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface Props {
  data: ResumeData;
}

const ModernTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, education, experience, skills } = data;

  const renderBullets = (text: string) => {
    if (!text) return null;
    const items = text.split('\n').filter(item => item.trim() !== '');
    return (
      <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm leading-relaxed">{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white flex shadow-lg mx-auto font-sans overflow-hidden">
      
      {/* Sidebar (Left) */}
      <div className="w-[35%] bg-[#a83246] text-white p-6 flex flex-col items-center pt-10">
        
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-full border-4 border-white/30 overflow-hidden mb-6 bg-white">
          {personalInfo.photoUrl ? (
            <img 
              src={personalInfo.photoUrl} 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-4xl font-bold">
               {personalInfo.fullName.charAt(0)}
             </div>
          )}
        </div>

        {/* Name & Title */}
        <div className="text-center mb-10 w-full">
          <h1 className="text-2xl font-bold mb-1 leading-tight">{personalInfo.fullName}</h1>
          <p className="text-red-100 font-medium text-lg border-t border-red-300/50 pt-2 inline-block w-full">
            {personalInfo.jobTitle || 'Professional Title'}
          </p>
        </div>

        {/* Contact Details */}
        <div className="w-full mb-10">
          <h3 className="text-lg font-semibold border-b border-white/40 pb-1 mb-4">Contact Details</h3>
          <div className="space-y-3 text-sm font-light">
            {personalInfo.phone && (
              <div className="flex items-center gap-3">
                <Phone size={16} /> <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-3 break-all">
                <Mail size={16} /> <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-3">
                <MapPin size={16} /> <span>{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-3">
                <Linkedin size={16} /> <span>{personalInfo.linkedin}</span>
              </div>
            )}
             {personalInfo.website && (
              <div className="flex items-center gap-3">
                <Globe size={16} /> <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Core Skills - Sidebar */}
        {skills.length > 0 && (
           <div className="w-full">
            <h3 className="text-lg font-semibold border-b border-white/40 pb-1 mb-4">Core Skills</h3>
            <div className="space-y-4">
              {skills.map(group => (
                 <div key={group.id}>
                    <p className="font-semibold text-red-100 text-xs uppercase mb-1">{group.category}</p>
                    <ul className="list-disc ml-4 space-y-1 text-sm font-light">
                        {group.items.split(',').map((item, i) => (
                            <li key={i}>{item.trim()}</li>
                        ))}
                    </ul>
                 </div>
              ))}
            </div>
           </div>
        )}
      </div>

      {/* Main Content (Right) */}
      <div className="w-[65%] p-8 pt-12">
        
        {/* Profile Summary */}
        {personalInfo.summary && (
            <div className="mb-8">
                <h2 className="text-[#a83246] text-xl font-bold uppercase tracking-wider mb-3">Professional Profile</h2>
                <p className="text-gray-700 text-sm leading-relaxed text-justify">
                    {personalInfo.summary}
                </p>
            </div>
        )}

        {/* Education */}
        {education.length > 0 && (
            <div className="mb-8">
                <h2 className="text-[#a83246] text-xl font-bold uppercase tracking-wider mb-4">Education</h2>
                <div className="space-y-5">
                    {education.map(edu => (
                        <div key={edu.id} className="relative pl-4 border-l-2 border-gray-200">
                             <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#a83246]"></div>
                             <h3 className="font-bold text-gray-900 text-sm leading-tight">{edu.degree}</h3>
                             <div className="text-xs text-[#a83246] font-semibold mb-1">
                                {edu.school} | {edu.startDate} - {edu.endDate}
                             </div>
                             <p className="text-sm text-gray-600 italic">{edu.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Experience / Career Summary */}
        {experience.length > 0 && (
            <div>
                 <h2 className="text-[#a83246] text-xl font-bold uppercase tracking-wider mb-4">Career Summary</h2>
                 <div className="space-y-6">
                    {experience.map(exp => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-bold text-sm text-[#a83246]">{exp.startDate} - {exp.endDate}</span>
                                <span className="font-bold text-gray-900">{exp.company}, {exp.city}</span>
                            </div>
                            <h3 className="font-bold text-black text-sm mb-2">{exp.position}</h3>
                            <div className="text-gray-700 text-sm">
                                {renderBullets(exp.description)}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default ModernTemplate;