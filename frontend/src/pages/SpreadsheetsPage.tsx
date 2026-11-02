import React, { useState } from 'react';
import {
  Table,
  Plus,
  Trash2,
  BarChart2,
  PieChart,
  LineChart,
  Calculator,
  Download,
  Share2,
  FileSpreadsheet
} from 'lucide-react';

interface RowData {
  id: number;
  month: string;
  sales: number;
  expenses: number;
}

export const SpreadsheetsPage: React.FC = () => {
  const [data, setData] = useState<RowData[]>([
    { id: 1, month: 'जानेवारी (Jan)', sales: 45000, expenses: 18000 },
    { id: 2, month: 'फेब्रुवारी (Feb)', sales: 52000, expenses: 21000 },
    { id: 3, month: 'मार्च (Mar)', sales: 68000, expenses: 24000 },
    { id: 4, month: 'एप्रिल (Apr)', sales: 61000, expenses: 22000 },
    { id: 5, month: 'मे (May)', sales: 74000, expenses: 29000 },
  ]);

  const [activeChartType, setActiveChartType] = useState<'bar' | 'pie' | 'line'>('bar');

  const totalSales = data.reduce((sum, r) => sum + r.sales, 0);
  const totalExpenses = data.reduce((sum, r) => sum + r.expenses, 0);
  const netProfit = totalSales - totalExpenses;
  const avgSales = Math.round(totalSales / (data.length || 1));

  const handleAddRow = () => {
    const newRow: RowData = {
      id: Date.now(),
      month: 'नवीन महिना',
      sales: 50000,
      expenses: 20000,
    };
    setData([...data, newRow]);
  };

  const handleUpdate = (id: number, field: keyof RowData, val: any) => {
    setData(
      data.map((r) =>
        r.id === id ? { ...r, [field]: field === 'month' ? val : Number(val) || 0 } : r
      )
    );
  };

  const handleDelete = (id: number) => {
    if (data.length <= 1) return;
    setData(data.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Marathi Spreadsheets & Dynamic Business Charts
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Calculate revenues, expenses, and generate presentation-ready charts for reports.
              </p>
            </div>
          </div>

          <button
            onClick={handleAddRow}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Data Row</span>
          </button>
        </div>

        {/* Financial KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Sales (एकूण विक्री)</span>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
              ₹{totalSales.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Expenses (एकूण खर्च)</span>
            <div className="text-2xl font-black text-slate-700 mt-1 font-mono">
              ₹{totalExpenses.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Net Profit (निव्वळ नफा)</span>
            <div className="text-2xl font-black text-emerald-600 mt-1 font-mono">
              ₹{netProfit.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase">Average Monthly Sales</span>
            <div className="text-2xl font-black text-orange-600 mt-1 font-mono">
              ₹{avgSales.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900">Monthly Sales Ledger</h2>
            <span className="text-xs text-slate-400 font-bold">{data.length} Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase text-slate-500 tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Month / Period (महिना)</th>
                  <th className="py-3.5 px-6">Sales (विक्री ₹)</th>
                  <th className="py-3.5 px-6">Expenses (खर्च ₹)</th>
                  <th className="py-3.5 px-6">Profit (नफा ₹)</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                {data.map((r) => {
                  const profit = r.sales - r.expenses;
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          value={r.month}
                          onChange={(e) => handleUpdate(r.id, 'month', e.target.value)}
                          className="w-full bg-transparent border-none outline-hidden font-bold text-slate-900"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="number"
                          value={r.sales}
                          onChange={(e) => handleUpdate(r.id, 'sales', e.target.value)}
                          className="w-full bg-transparent border-none outline-hidden font-mono text-slate-900"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="number"
                          value={r.expenses}
                          onChange={(e) => handleUpdate(r.id, 'expenses', e.target.value)}
                          className="w-full bg-transparent border-none outline-hidden font-mono text-slate-700"
                        />
                      </td>
                      <td className="py-3 px-6 font-mono font-bold text-emerald-600">
                        ₹{profit.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-6 text-right">
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Delete Row"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Chart Generator */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Dynamic Visual Chart Preview</h2>
              <p className="text-xs text-slate-500">Render high-resolution data graphics</p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveChartType('bar')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                  activeChartType === 'bar' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Bar Chart</span>
              </button>
              <button
                onClick={() => setActiveChartType('line')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                  activeChartType === 'line' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>Line Graph</span>
              </button>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4 border-b border-slate-200">
            {data.map((r) => {
              const maxVal = Math.max(...data.map((d) => d.sales), 100000);
              const heightPercent = Math.min(100, Math.round((r.sales / maxVal) * 100));

              return (
                <div key={r.id} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono font-bold text-slate-600">
                    ₹{(r.sales / 1000).toFixed(0)}k
                  </span>
                  <div
                    className="w-full max-w-[48px] bg-gradient-to-t from-orange-600 to-amber-500 rounded-t-xl transition-all duration-300 shadow-sm"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[11px] font-bold text-slate-600 truncate max-w-[80px] text-center">
                    {r.month.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
