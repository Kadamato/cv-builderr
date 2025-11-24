import React from 'react';
import { ResumeData, Education, Experience, SkillGroup, Project, Certification } from '../types';
import { Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

// --- Reusable UI Components ---

const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${className}`}>{children}</label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2.5 border transition-colors placeholder-gray-400"
  />
);

const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2.5 border transition-colors placeholder-gray-400"
  />
);

const SectionHeader = ({ title, isOpen, onClick }: { title: string; isOpen: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex justify-between items-center p-4 text-left transition-colors border-b border-gray-200 ${
      isOpen ? 'bg-blue-50 text-blue-700' : 'bg-white hover:bg-gray-50 text-gray-700'
    }`}
  >
    <span className="font-semibold text-sm uppercase tracking-wide">{title}</span>
    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
  </button>
);

const AddButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all mt-2"
  >
    <Plus size={18} /> {label}
  </button>
);

const RemoveButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
    title="Remove item"
  >
    <Trash2 size={18} />
  </button>
);

const Card: React.FC<{ children: React.ReactNode; title?: string; onRemove?: () => void }> = ({ children, title, onRemove }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-4 transition-shadow hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
       {title && <h4 className="text-sm font-bold text-gray-800 uppercase border-l-4 border-blue-500 pl-2">{title}</h4>}
       {onRemove && (
         <div className="ml-auto">
            <RemoveButton onClick={onRemove} />
         </div>
       )}
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);


const ResumeForm: React.FC<Props> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = React.useState<string>('personal');

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? '' : id);
  };

  // --- Updaters ---

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  // Education
  const addEducation = () => {
    onChange({ 
      ...data, 
      education: [...data.education, {
        id: Date.now().toString(),
        school: '',
        degree: '',
        city: '',
        country: '',
        startDate: '',
        endDate: '',
        description: ''
      }] 
    });
  };
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };
  const removeEducation = (id: string) => onChange({ ...data, education: data.education.filter(e => e.id !== id) });

  // Experience
  const addExperience = () => {
    onChange({ 
      ...data, 
      experience: [...data.experience, {
        id: Date.now().toString(),
        company: '',
        position: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        description: ''
      }] 
    });
  };
  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };
  const removeExperience = (id: string) => onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });

  // Projects
  const addProject = () => {
    onChange({ 
      ...data, 
      projects: [...(data.projects || []), {
        id: Date.now().toString(),
        name: '',
        technologies: '',
        link: '',
        description: ''
      }] 
    });
  };
  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: (data.projects || []).map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };
  const removeProject = (id: string) => onChange({ ...data, projects: (data.projects || []).filter(p => p.id !== id) });

  // Certifications
  const addCertification = () => {
    onChange({ 
      ...data, 
      certifications: [...(data.certifications || []), {
        id: Date.now().toString(),
        name: '',
        issuer: '',
        link: '',
        date: ''
      }] 
    });
  };
  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange({
      ...data,
      certifications: (data.certifications || []).map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };
  const removeCertification = (id: string) => onChange({ ...data, certifications: (data.certifications || []).filter(c => c.id !== id) });

  // Skills
  const addSkill = () => {
    onChange({
        ...data,
        skills: [...data.skills, { id: Date.now().toString(), category: 'Category', items: '' }]
    })
  }
  const updateSkill = (id: string, field: keyof SkillGroup, value: string) => {
     onChange({
      ...data,
      skills: data.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  }
  const removeSkill = (id: string) => onChange({ ...data, skills: data.skills.filter(s => s.id !== id) });


  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden h-full flex flex-col border border-gray-200">
      <div className="p-4 bg-gray-900 text-white font-bold flex items-center gap-2 shadow-md z-10">
        <span>Edit Content</span>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50">
        
        {/* Personal Info */}
        <SectionHeader title="Personal Information" isOpen={activeSection === 'personal'} onClick={() => toggleSection('personal')} />
        {activeSection === 'personal' && (
          <div className="p-5 space-y-5 animate-fadeIn bg-white border-b border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input value={data.personalInfo.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} placeholder="e.g. John Doe" />
              </div>
              <div>
                <Label>Job Title</Label>
                <Input value={data.personalInfo.jobTitle || ''} onChange={e => updatePersonalInfo('jobTitle', e.target.value)} placeholder="e.g. Software Engineer" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                <Label>Email</Label>
                <Input type="email" value={data.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} placeholder="john@example.com" />
              </div>
               <div>
                <Label>Phone</Label>
                <Input value={data.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} placeholder="+1 234 567 890" />
              </div>
            </div>

            <div>
               <Label>Address</Label>
               <Input value={data.personalInfo.address} onChange={e => updatePersonalInfo('address', e.target.value)} placeholder="Street Address" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                 <Label>City, State Zip (Classic Layout)</Label>
                 <Input value={data.personalInfo.cityStateZip || ''} onChange={e => updatePersonalInfo('cityStateZip', e.target.value)} placeholder="New York, NY 10001" />
               </div>
               <div>
                  <Label>Website / Portfolio</Label>
                  <Input value={data.personalInfo.website || ''} onChange={e => updatePersonalInfo('website', e.target.value)} placeholder="www.johndoe.com" />
               </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <Label>LinkedIn</Label>
                   <Input value={data.personalInfo.linkedin || ''} onChange={e => updatePersonalInfo('linkedin', e.target.value)} placeholder="linkedin.com/in/johndoe" />
                </div>
                <div>
                   <Label>Photo URL (Modern Layout)</Label>
                   <Input value={data.personalInfo.photoUrl || ''} onChange={e => updatePersonalInfo('photoUrl', e.target.value)} placeholder="https://..." />
                </div>
             </div>
            
            <div>
              <Label>Professional Summary</Label>
              <TextArea 
                className="h-32" 
                value={data.personalInfo.summary || ''} 
                onChange={e => updatePersonalInfo('summary', e.target.value)} 
                placeholder="Write a short professional summary..."
              />
            </div>
          </div>
        )}

        {/* Education */}
        <SectionHeader title="Education" isOpen={activeSection === 'education'} onClick={() => toggleSection('education')} />
        {activeSection === 'education' && (
          <div className="p-5 bg-gray-50">
            {data.education.map((edu) => (
              <Card key={edu.id} title={edu.school || 'Education Entry'} onRemove={() => removeEducation(edu.id)}>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>School</Label>
                      <Input value={edu.school} onChange={e => updateEducation(edu.id, 'school', e.target.value)} placeholder="University Name" />
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input value={edu.city} onChange={e => updateEducation(edu.id, 'city', e.target.value)} placeholder="City" />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Input value={edu.country} onChange={e => updateEducation(edu.id, 'country', e.target.value)} placeholder="Country" />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Month / Year</Label>
                      <Input value={edu.startDate} onChange={e => updateEducation(edu.id, 'startDate', e.target.value)} placeholder="Aug 2018" />
                    </div>
                    <div>
                      <Label>End Month / Year</Label>
                      <Input value={edu.endDate} onChange={e => updateEducation(edu.id, 'endDate', e.target.value)} placeholder="May 2022" />
                    </div>
                 </div>
                 
                 <div>
                   <Label>Description</Label>
                   <TextArea 
                      className="h-20" 
                      value={edu.description} 
                      onChange={e => updateEducation(edu.id, 'description', e.target.value)} 
                      placeholder="Additional details..."
                   />
                   <p className="text-xs text-gray-400 mt-1 text-right">Markdown supported</p>
                 </div>
              </Card>
            ))}
            <AddButton onClick={addEducation} label="Add Education" />
          </div>
        )}

        {/* Projects */}
        <SectionHeader title="Projects / Open Source" isOpen={activeSection === 'projects'} onClick={() => toggleSection('projects')} />
        {activeSection === 'projects' && (
          <div className="p-5 bg-gray-50">
             {(data.projects || []).map((proj) => (
              <Card key={proj.id} title={proj.name || 'Project Entry'} onRemove={() => removeProject(proj.id)}>
                 <div>
                    <Label>Project Name</Label>
                    <Input value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} placeholder="My Awesome Project" />
                 </div>
                 
                 <div>
                    <Label>Technologies</Label>
                    <Input value={proj.technologies} onChange={e => updateProject(proj.id, 'technologies', e.target.value)} placeholder="React, TypeScript, Node.js" />
                 </div>
                 
                 <div>
                    <Label>Link</Label>
                    <Input value={proj.link || ''} onChange={e => updateProject(proj.id, 'link', e.target.value)} placeholder="github.com/user/repo" />
                 </div>

                 <div>
                   <Label>Description</Label>
                   <TextArea 
                      className="h-24" 
                      value={proj.description} 
                      onChange={e => updateProject(proj.id, 'description', e.target.value)} 
                      placeholder="Describe what you built..."
                   />
                   <p className="text-xs text-gray-400 mt-1 text-right">Markdown supported</p>
                 </div>
              </Card>
            ))}
            <AddButton onClick={addProject} label="Add Project" />
          </div>
        )}
        
        {/* Certifications */}
        <SectionHeader title="Certifications" isOpen={activeSection === 'certifications'} onClick={() => toggleSection('certifications')} />
        {activeSection === 'certifications' && (
          <div className="p-5 bg-gray-50">
             {(data.certifications || []).map((cert) => (
              <Card key={cert.id} title={cert.name || 'Certification Entry'} onRemove={() => removeCertification(cert.id)}>
                <div>
                    <Label>Certificate Name</Label>
                    <Input value={cert.name} onChange={e => updateCertification(cert.id, 'name', e.target.value)} placeholder="AWS Solutions Architect" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <Label>Issued By</Label>
                      <Input value={cert.issuer} onChange={e => updateCertification(cert.id, 'issuer', e.target.value)} placeholder="Amazon" />
                   </div>
                   <div>
                      <Label>Date</Label>
                      <Input value={cert.date || ''} onChange={e => updateCertification(cert.id, 'date', e.target.value)} placeholder="Jan 2024" />
                   </div>
                </div>
                
                <div>
                   <Label>Link</Label>
                   <Input value={cert.link || ''} onChange={e => updateCertification(cert.id, 'link', e.target.value)} placeholder="https://certificate-url.com" />
                </div>
              </Card>
            ))}
            <AddButton onClick={addCertification} label="Add Certification" />
          </div>
        )}

        {/* Experience */}
        <SectionHeader title="Experience" isOpen={activeSection === 'experience'} onClick={() => toggleSection('experience')} />
        {activeSection === 'experience' && (
          <div className="p-5 bg-gray-50">
             {data.experience.map((exp) => (
              <Card key={exp.id} title={exp.company || 'Experience Entry'} onRemove={() => removeExperience(exp.id)}>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <Label>Employer</Label>
                      <Input value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company Name" />
                   </div>
                   <div>
                      <Label>Job Title</Label>
                      <Input value={exp.position} onChange={e => updateExperience(exp.id, 'position', e.target.value)} placeholder="Position" />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <Label>Start Month / Year</Label>
                      <Input value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="MM/YYYY" />
                   </div>
                   <div>
                      <Label>End Month / Year</Label>
                      <Input value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="MM/YYYY or Present" />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <Label>Location (City)</Label>
                      <Input value={exp.city} onChange={e => updateExperience(exp.id, 'city', e.target.value)} placeholder="City" />
                   </div>
                   <div>
                      <Label>State / Country</Label>
                      <Input value={exp.state} onChange={e => updateExperience(exp.id, 'state', e.target.value)} placeholder="State" />
                   </div>
                </div>

                <div>
                   <Label>Description</Label>
                   <TextArea 
                      className="h-32 font-mono text-sm" 
                      value={exp.description} 
                      onChange={e => updateExperience(exp.id, 'description', e.target.value)} 
                      placeholder="- Accomplishment 1&#10;- Accomplishment 2"
                   />
                   <div className="flex justify-between mt-1">
                     <span className="text-xs text-blue-500 cursor-pointer hover:underline" onClick={() => updateExperience(exp.id, 'description', exp.description + '\n- ')}>+ Add Bullet</span>
                     <span className="text-xs text-gray-400">Markdown supported</span>
                   </div>
                </div>
              </Card>
            ))}
            <AddButton onClick={addExperience} label="Add Experience" />
          </div>
        )}

        {/* Skills */}
        <SectionHeader title="Skills" isOpen={activeSection === 'skills'} onClick={() => toggleSection('skills')} />
        {activeSection === 'skills' && (
          <div className="p-5 bg-gray-50">
             {data.skills.map((skill) => (
               <Card key={skill.id} onRemove={() => removeSkill(skill.id)}>
                  <div className="mb-3">
                     <Label>Category</Label>
                     <Input value={skill.category} onChange={e => updateSkill(skill.id, 'category', e.target.value)} placeholder="e.g. Technical, Languages" />
                  </div>
                  <div>
                     <Label>Skills List</Label>
                     <TextArea 
                        className="h-20"
                        value={skill.items} 
                        onChange={e => updateSkill(skill.id, 'items', e.target.value)} 
                        placeholder="Java, Python, React, etc." 
                     />
                     <p className="text-xs text-gray-400 mt-1">Comma separated values</p>
                  </div>
               </Card>
             ))}
             <AddButton onClick={addSkill} label="Add Skill Group" />
          </div>
        )}

      </div>
    </div>
  );
};

export default ResumeForm;