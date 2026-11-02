import React, { useState } from 'react';
import {
  FileText,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Download,
  Share2,
  Sparkles,
  Heading1,
  Heading2,
  Printer
} from 'lucide-react';
import jsPDF from 'jspdf';

export const DocumentsPage: React.FC = () => {
  const [docTitle, setDocTitle] = useState('महाराष्ट्र व्यवसाय प्रस्ताव २०२६ (Business Proposal)');
  const [content, setContent] = useState(
    `# १. परिचय व उद्देश\nमराठी डिझाईन स्टुडिओद्वारे तयार केलेला हा अधिकृत प्रस्ताव आहे. स्थानिक दुकाने व उद्योगांना डिजिटल मार्केटिंगमध्ये स्वावलंबी बनवणे हे आमचे मुख्य उद्दिष्ट आहे.\n\n# २. मुख्य सेवा व फायदे\n• दर्जेदार अस्सल मराठी व इंग्रजी सोशल मीडिया पोस्टर्स.\n• थेट डाऊनलोड व प्रिंटसाठी योग्य हाय-रिझोल्युशन फॉरमॅट.\n• सर्व सण-उत्सव, जाहिरात व व्यवसाय कॅलेंडर सज्ज.\n\n# ३. संपर्क व पुढील वाटचाल\nअधिक माहितीसाठी व वार्षिक योजनेच्या नोंदणीसाठी कृपया आमच्या ग्राहक सेवा केंद्राशी संपर्क साधा.`
  );

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(docTitle, 20, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(content, 170);
    doc.text(splitText, 20, 35);

    doc.save(`${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col select-none">
      {/* Document Top Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="text-base font-black text-slate-900 bg-transparent border-none outline-hidden focus:ring-1 focus:ring-orange-500 rounded-md px-1"
            />
            <span className="text-xs text-slate-400 block px-1">Cloud Document • Autosaved</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export to PDF</span>
          </button>
        </div>
      </header>

      {/* Document Editing Surface */}
      <main className="flex-1 py-10 px-4 flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-200 min-h-[85vh] p-10 md:p-14 flex flex-col space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Official Marathi Design Document</span>
            <span>A4 Size Layout</span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 text-slate-800 text-base leading-relaxed bg-transparent border-none outline-hidden resize-none font-serif select-text"
            placeholder="Type your document content here in Marathi or English..."
          />
        </div>
      </main>
    </div>
  );
};
