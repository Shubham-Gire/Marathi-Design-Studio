import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Layers,
  Scissors,
  Download,
  Eye,
  CheckCircle2,
  FilePlus2,
  ArrowRight
} from 'lucide-react';
import jsPDF from 'jspdf';

interface PdfDoc {
  id: number;
  name: string;
  pages: number;
  size: string;
}

export const PdfToolsPage: React.FC = () => {
  const [documents, setDocuments] = useState<PdfDoc[]>([
    { id: 1, name: 'लग्नपत्रिका_निमंत्रण_२०२६.pdf', pages: 2, size: '1.4 MB' },
    { id: 2, name: 'महाराष्ट्र_दुकानाचा_कॅटलॉग.pdf', pages: 8, size: '4.8 MB' },
    { id: 3, name: 'गणेशोत्सव_वार्षिक_अहवाल.pdf', pages: 4, size: '2.1 MB' },
  ]);

  const [activeAction, setActiveAction] = useState<'merge' | 'split' | 'reorder'>('merge');

  const handleCreatePdf = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('मराठी डिझाईन स्टुडिओ PDF निर्यात', 20, 25);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Merged PDF document created successfully via Marathi Design Studio PDF Suite.', 20, 40);
    doc.save('Merged_Document_Marathi_Studio.pdf');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-100 text-red-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Marathi PDF Tools Suite
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Merge multiple designs into a single PDF, split catalogs, reorder pages, and compress for print.
              </p>
            </div>
          </div>

          <button
            onClick={handleCreatePdf}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm shadow-red-600/30 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Generate Merged PDF</span>
          </button>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveAction('merge')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeAction === 'merge' ? 'bg-red-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Merge PDFs (एकत्र करा)
          </button>
          <button
            onClick={() => setActiveAction('split')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeAction === 'split' ? 'bg-red-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Split PDF (विभक्त करा)
          </button>
          <button
            onClick={() => setActiveAction('reorder')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeAction === 'reorder' ? 'bg-red-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Reorder Pages
          </button>
        </div>

        {/* Upload Zone */}
        <div className="border-2 border-dashed border-slate-300 rounded-3xl p-10 bg-white flex flex-col items-center justify-center text-center space-y-4 hover:border-red-500 transition-colors cursor-pointer">
          <div className="p-4 rounded-full bg-red-50 text-red-600">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Upload PDF documents or design files</h3>
            <p className="text-xs text-slate-400 mt-1">Select multiple files to merge into a single publication</p>
          </div>
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            Max 50 MB per document
          </span>
        </div>

        {/* Uploaded PDF Document Cards */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-black text-slate-900">Staged Documents in Sequence</h2>
          <div className="space-y-3">
            {documents.map((doc, idx) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-serif">{doc.name}</h4>
                    <span className="text-xs text-slate-400 font-medium">
                      {doc.pages} Pages • {doc.size}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Vector PDF</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
