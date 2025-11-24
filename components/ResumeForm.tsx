import React from 'react';
import { ResumeData, Education, Experience, SkillGroup, Project, Certification } from '../types';
import { Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<Props> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = React.useState<string>('personal');

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: 'University Name',
      degree: 'Degree Title',
      city: 'City',
      country: 'Country',
      startDate: '2020',
      endDate: '2024',
      description: ''
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(e => e.id !== id) });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: 'Company Name',
      position: 'Job Title',
      city: 'City',
      state: 'State',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: 'Responsibility 1\nResponsibility 2'
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: 'Project Name',
      technologies: 'Tech Stack',
      link: '',
      description: 'Project description...'
    };
    // Handle case where projects might be undefined if loading old data
    const currentProjects = data.projects || [];
    onChange({ ...data, projects: [...currentProjects, newProject] });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: (data.projects || []).map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: (data.projects || []).filter(p => p.id !== id) });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: 'Certificate Name',
      issuer: 'Issuer Name',
      link: '',
      date: '2024'
    };
    const currentCerts = data.certifications || [];
    onChange({ ...data, certifications: [...currentCerts, newCert] });
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange({
      ...data,
      certifications: (data.certifications || []).map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };

  const removeCertification = (id: string) => {
    onChange({ ...data, certifications: (data.certifications || []).filter(c => c.id !== id) });
  };

  const addSkill = () => {
    onChange({
        ...data,
        skills: [...data.skills, { id: Date.now().toString(), category: 'Technical', items: 'Java, Python, React' }]
    })
  }

  const updateSkill = (id: string, field: keyof SkillGroup, value: string) => {
     onChange({
      ...data,
      skills: data.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  }

  const removeSkill = (id: string) => {
    onChange({ ...data, skills: data.skills.filter(s => s.id !== id) });
  };


  const SectionHeader = ({ title, id }: { title: string, id: string }) => (
    <button
      onClick={() => setActiveSection(activeSection === id ? '' : id)}
      className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 border-b border-gray-200 transition-colors"
    >
      <span className="font-semibold text-gray-700">{title}</span>
      {activeSection === id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden h-full flex flex-col">
      <div className="p-4 bg-gray-800 text-white font-bold">Edit Content</div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar">
        
        {/* Personal Info */}
        <SectionHeader title="Personal Information" id="personal" />
        {activeSection === 'personal' && (
          <div className="p-4 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Full Name" 
                className="input-field" 
                value={data.personalInfo.fullName} 
                onChange={e => updatePersonalInfo('fullName', e.target.value)} 
              />
               <input 
                type="text" placeholder="Job Title" 
                className="input-field" 
                value={data.personalInfo.jobTitle || ''} 
                onChange={e => updatePersonalInfo('jobTitle', e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="email" placeholder="Email" 
                className="input-field" 
                value={data.personalInfo.email} 
                onChange={e => updatePersonalInfo('email', e.target.value)} 
              />
              <input 
                type="text" placeholder="Phone" 
                className="input-field" 
                value={data.personalInfo.phone} 
                onChange={e => updatePersonalInfo('phone', e.target.value)} 
              />
            </div>
             <div className="grid grid-cols-2 gap-4">
               <input 
                type="text" placeholder="Address" 
                className="input-field" 
                value={data.personalInfo.address} 
                onChange={e => updatePersonalInfo('address', e.target.value)} 
              />
               <input 
                type="text" placeholder="City, State Zip (For Classic)" 
                className="input-field" 
                value={data.personalInfo.cityStateZip || ''} 
                onChange={e => updatePersonalInfo('cityStateZip', e.target.value)} 
              />
             </div>
             <input 
                type="text" placeholder="Profile Image URL (For Modern Template)" 
                className="input-field w-full" 
                value={data.personalInfo.photoUrl || ''} 
                onChange={e => updatePersonalInfo('photoUrl', e.target.value)} 
              />
            <textarea
              placeholder="Professional Summary"
              className="input-field w-full h-24"
              value={data.personalInfo.summary || ''}
              onChange={e => updatePersonalInfo('summary', e.target.value)}
            />
          </div>
        )}

        {/* Education */}
        <SectionHeader title="Education" id="education" />
        {activeSection === 'education' && (
          <div className="p-4 space-y-4 bg-gray-50/50">
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="p-4 bg-white border border-gray-200 rounded shadow-sm relative group">
                <button 
                  onClick={() => removeEducation(edu.id)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                
                <div className="mb-2">
                  <label className="text-xs text-gray-500 font-semibold uppercase">School</label>
                  <input type="text" className="input-field" value={edu.school} onChange={e => updateEducation(edu.id, 'school', e.target.value)} />
                </div>

                <div className="mb-2">
                  <label className="text-xs text-gray-500 font-semibold uppercase">Degree</label>
                  <input type="text" className="input-field" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="text-xs text-gray-500 font-semibold uppercase">City</label>
                    <input type="text" className="input-field" value={edu.city} onChange={e => updateEducation(edu.id, 'city', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-semibold uppercase">Country</label>
                    <input type="text" className="input-field" value={edu.country} onChange={e => updateEducation(edu.id, 'country', e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="text-xs text-gray-500 font-semibold text-gray-600">Start Month / Year</label>
                    <input type="text" placeholder="MM/YYYY" className="input-field" value={edu.startDate} onChange={e => updateEducation(edu.id, 'startDate', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-semibold text-gray-600">End Month / Year</label>
                    <input type="text" placeholder="MM/YYYY" className="input-field" value={edu.endDate} onChange={e => updateEducation(edu.id, 'endDate', e.target.value)} />
                  </div>
                </div>

                <div>
                   <label className="text-xs text-gray-500 font-semibold uppercase">Description</label>
                   <textarea 
                    placeholder="Details (Optional)" 
                    className="input-field w-full h-16 text-sm" 
                    value={edu.description} 
                    onChange={e => updateEducation(edu.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button onClick={addEducation} className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
              <Plus size={16} /> Add Education
            </button>
          </div>
        )}

        {/* Projects */}
        <SectionHeader title="Projects / Open Source" id="projects" />
        {activeSection === 'projects' && (
          <div className="p-4 space-y-4 bg-gray-50/50">
             {(data.projects || []).map((proj) => (
              <div key={proj.id} className="p-4 bg-white border border-gray-200 rounded shadow-sm relative group">
                <button 
                  onClick={() => removeProject(proj.id)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                
                <div className="mb-2">
                  <label className="text-xs text-gray-500 font-semibold uppercase">Project Name</label>
                  <input type="text" placeholder="AntarExchange" className="input-field" value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} />
                </div>

                <div className="mb-2">
                  <label className="text-xs text-gray-500 font-semibold uppercase">Technologies Used</label>
                  <input type="text" placeholder="Next.js, Tailwind CSS..." className="input-field" value={proj.technologies} onChange={e => updateProject(proj.id, 'technologies', e.target.value)} />
                </div>

                <div className="mb-2">
                  <label className="text-xs text-gray-500 font-semibold uppercase">Project Link / GitHub Repository</label>
                  <input type="text" placeholder="github.com/username/repo" className="input-field" value={proj.link || ''} onChange={e => updateProject(proj.id, 'link', e.target.value)} />
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-semibold uppercase">Description</label>
                  <textarea 
                    placeholder="Description of the project..." 
                    className="input-field w-full h-24 text-sm" 
                    value={proj.description} 
                    onChange={e => updateProject(proj.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button onClick={addProject} className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
              <Plus size={16} /> Add Project
            </button>
          </div>
        )}
        
        {/* Certifications */}
        <SectionHeader title="Certifications" id="certifications" />
        {activeSection === 'certifications' && (
          <div className="p-4 space-y-4 bg-gray-50/50">
             {(data.certifications || []).map((cert) => (
              <div key={cert.id} className="p-4 bg-white border border-gray-200 rounded shadow-sm relative group">
                <button 
                  onClick={() => removeCertification(cert.id)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                
                <div className="mb-2">
                  <label className="text-xs text-gray-500 font-semibold uppercase">Certificate Name</label>
                  <input type="text" placeholder="AWS Certified Cloud Practitioner" className="input-field" value={cert.name} onChange={e => updateCertification(cert.id, 'name', e.target.value)} />
                </div>

                <div className="mb-2">
                  <label className="text-xs text-gray-500 font-semibold uppercase">Certificate Link</label>
                  <input type="text" placeholder="credential.net/..." className="input-field" value={cert.link || ''} onChange={e => updateCertification(cert.id, 'link', e.target.value)} />
                </div>

                <div className="mb-2">
                   <label className="text-xs text-gray-500 font-semibold uppercase">Issued by</label>
                   <input type="text" placeholder="Amazon Web Services" className="input-field" value={cert.issuer} onChange={e => updateCertification(cert.id, 'issuer', e.target.value)} />
                </div>
                
                 <div className="mb-2">
                   <label className="text-xs text-gray-500 font-semibold uppercase">Date (Optional)</label>
                   <input type="text" placeholder="May 2024" className="input-field" value={cert.date || ''} onChange={e => updateCertification(cert.id, 'date', e.target.value)} />
                </div>

              </div>
            ))}
            <button onClick={addCertification} className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
              <Plus size={16} /> Add Certification
            </button>
          </div>
        )}

        {/* Experience */}
        <SectionHeader title="Experience" id="experience" />
        {activeSection === 'experience' && (
          <div className="p-4 space-y-4 bg-gray-50/50">
             {data.experience.map((exp, idx) => (
              <div key={exp.id} className="p-4 bg-white border border-gray-200 rounded shadow-sm relative group">
                <button 
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                
                <div className="mb-2">
                  <label className="text-xs text-gray-500 font-semibold uppercase">Company</label>
                  <input type="text" className="input-field" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                </div>

                <div className="mb-2">
                  <label className="text-xs text-gray-500 font-semibold uppercase">Position</label>
                  <input type="text" className="input-field" value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="text-xs text-gray-500 font-semibold uppercase">City</label>
                    <input type="text" className="input-field" value={exp.city} onChange={e => updateExperience(exp.id, 'city', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-semibold uppercase">State</label>
                    <input type="text" className="input-field" value={exp.state} onChange={e => updateExperience(exp.id, 'state', e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                   <div>
                      <label className="text-xs text-gray-500 font-semibold text-gray-600">Start Month / Year</label>
                      <input type="text" placeholder="MM/YYYY" className="input-field" value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-xs text-gray-500 font-semibold text-gray-600">End Month / Year</label>
                      <input type="text" placeholder="MM/YYYY" className="input-field" value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} />
                   </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-semibold uppercase">Description</label>
                  <textarea 
                    placeholder="Job descriptions (Each new line is a bullet point)" 
                    className="input-field w-full h-24 text-sm font-mono" 
                    value={exp.description} 
                    onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button onClick={addExperience} className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )}

        {/* Skills */}
        <SectionHeader title="Skills" id="skills" />
        {activeSection === 'skills' && (
          <div className="p-4 space-y-4 bg-gray-50/50">
             {data.skills.map((skill) => (
               <div key={skill.id} className="p-4 bg-white border border-gray-200 rounded shadow-sm relative group">
                  <button 
                    onClick={() => removeSkill(skill.id)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                  <input type="text" placeholder="Category (e.g., Technical)" className="input-field mb-2" value={skill.category} onChange={e => updateSkill(skill.id, 'category', e.target.value)} />
                  <textarea placeholder="List skills here" className="input-field w-full h-16" value={skill.items} onChange={e => updateSkill(skill.id, 'items', e.target.value)} />
               </div>
             ))}
             <button onClick={addSkill} className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
              <Plus size={16} /> Add Skill Group
            </button>
          </div>
        )}

      </div>
      <style>{`
        .input-field {
          @apply w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-shadow;
        }
      `}</style>
    </div>
  );
};

export default ResumeForm;