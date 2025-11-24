import React, { useState, useEffect } from 'react';
import { ResumeData, TemplateType } from './types';
import ClassicTemplate from './components/ClassicTemplate';
import ModernTemplate from './components/ModernTemplate';
import ResumeForm from './components/ResumeForm';
import { Save, Printer, ArrowLeft, LayoutTemplate } from 'lucide-react';

const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Aaron Towers',
    jobTitle: 'Finance Graduate',
    email: 'aaron@atowers.com',
    phone: '07777777777',
    address: 'Manchester, UK',
    cityStateZip: 'Manchester, UK', // For classic
    linkedin: 'linkedin.com/in/aaron',
    summary: 'A passionate Finance and Accounting Student with excellent academic and professional experience who enjoys working in a commercial environment...',
    photoUrl: 'https://picsum.photos/200/200'
  },
  education: [
    {
      id: '1',
      school: 'Preston University',
      degree: 'BSc (Hons) Finance and Accounting',
      city: 'Preston',
      country: 'UK',
      startDate: 'Sep 2016',
      endDate: '2021',
      description: 'Modules include: Finance, Micro & Macro Economics, Advanced Financial Law.'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'ABCD Accounting',
      position: 'Finance Assistant',
      city: 'Manchester',
      state: 'UK',
      startDate: 'Dec 2019',
      endDate: 'Present',
      description: 'Reporting to Finance Manager.\nProcessing purchase ledger transactions.\nSupporting with bank reconciliations.'
    }
  ],
  skills: [
    { id: '1', category: 'Technical', items: 'Advanced MS Excel, SAP, Xero' },
    { id: '2', category: 'Professional', items: 'Financial Regulations, Statistics' }
  ],
  activities: []
};

function App() {
  const [template, setTemplate] = useState<TemplateType | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cv-builder-data');
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved resume data");
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cv-builder-data', JSON.stringify(resumeData));
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // 1. Template Selection Screen
  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Choose your Template</h1>
        <p className="text-gray-500 mb-12">Select a design to start building your professional CV</p>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">
          {/* Classic Option */}
          <div 
            onClick={() => setTemplate(TemplateType.CLASSIC)}
            className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 overflow-hidden"
          >
            <div className="h-[400px] bg-gray-100 overflow-hidden relative">
              <div className="scale-[0.4] origin-top-left w-[210mm] h-[297mm] absolute top-0 left-0 bg-white pointer-events-none">
                 <ClassicTemplate data={INITIAL_DATA} />
              </div>
            </div>
            <div className="p-6 text-center border-t">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">Classic Harvard</h3>
              <p className="text-sm text-gray-500 mt-1">Clean, text-focused, ATS friendly.</p>
            </div>
          </div>

          {/* Modern Option */}
          <div 
            onClick={() => setTemplate(TemplateType.MODERN)}
            className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-pink-600 overflow-hidden"
          >
            <div className="h-[400px] bg-gray-100 overflow-hidden relative">
               <div className="scale-[0.4] origin-top-left w-[210mm] h-[297mm] absolute top-0 left-0 bg-white pointer-events-none">
                 <ModernTemplate data={INITIAL_DATA} />
              </div>
            </div>
            <div className="p-6 text-center border-t">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600">Modern Professional</h3>
              <p className="text-sm text-gray-500 mt-1">Sidebar layout, profile photo, distinct colors.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Editor Screen
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      
      {/* Left Sidebar: Editor */}
      <div className="w-[400px] h-full p-4 flex flex-col gap-4 print:hidden z-10">
        <div className="flex items-center justify-between mb-2">
           <button 
            onClick={() => setTemplate(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
           >
             <ArrowLeft size={18} /> Templates
           </button>
           <h1 className="font-bold text-gray-700">CV Builder</h1>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleSave}
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-medium transition-all"
          >
            {showSavedMsg ? 'Saved!' : <><Save size={18} /> Save</>}
          </button>
          
          <button 
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30"
          >
            <Printer size={18} /> Export PDF
          </button>
        </div>
      </div>

      {/* Right Area: Preview */}
      <div className="flex-1 h-full overflow-y-auto bg-gray-200 p-8 flex justify-center items-start print:p-0 print:overflow-visible print:h-auto print:block">
        <div 
          id="resume-preview" 
          className="print:shadow-none shadow-2xl transition-transform origin-top"
          style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }} // Slight scale down for viewing comfort
        >
          {template === TemplateType.CLASSIC ? (
            <ClassicTemplate data={resumeData} />
          ) : (
            <ModernTemplate data={resumeData} />
          )}
        </div>
      </div>

    </div>
  );
}

export default App;