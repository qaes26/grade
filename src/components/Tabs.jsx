import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex bg-slate-800 p-1 rounded-xl mb-8 border border-slate-700">
            <button
                onClick={() => setActiveTab('semester')}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm md:text-base transition-all ${activeTab === 'semester'
                        ? 'bg-cyan-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
            >
                حساب المعدل الفصلي
            </button>
            <button
                onClick={() => setActiveTab('cumulative')}
                className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm md:text-base transition-all ${activeTab === 'cumulative'
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
            >
                حساب المعدل التراكمي
            </button>
        </div>
    );
};

export default Tabs;
