import React from 'react';
import Card from './Card';
import { User, BookOpen, Clock, Calculator } from 'lucide-react';

const StudentForm = ({ studentInfo, setStudentInfo }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentInfo(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Card className="mb-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                <User className="w-5 h-5 text-cyan-400" />
                بيانات الطالب
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                    <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        name="name"
                        placeholder="اسم الطالب"
                        value={studentInfo.name}
                        onChange={handleChange}
                        className="w-full bg-slate-800 text-white placeholder-gray-500 border border-slate-700 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:border-cyan-500/50 transition-all font-sans"
                    />
                </div>
                <div className="relative">
                    <BookOpen className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        name="major"
                        placeholder="التخصص الجامعي"
                        value={studentInfo.major}
                        onChange={handleChange}
                        className="w-full bg-slate-800 text-white placeholder-gray-500 border border-slate-700 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <Calculator className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="number"
                        name="prevCGPA"
                        placeholder="المعدل التراكمي السابق (مثال: 3.4)"
                        value={studentInfo.prevCGPA}
                        onChange={handleChange}
                        className="w-full bg-slate-800 text-white placeholder-gray-500 border border-slate-700 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:border-cyan-500/50 transition-all"
                        dir="ltr"
                    />
                </div>
                <div className="relative">
                    <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="number"
                        name="prevHours"
                        placeholder="عدد الساعات السابقة المقطوعة"
                        value={studentInfo.prevHours}
                        onChange={handleChange}
                        className="w-full bg-slate-800 text-white placeholder-gray-500 border border-slate-700 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:border-cyan-500/50 transition-all"
                        dir="ltr"
                    />
                </div>
            </div>
        </Card>
    );
};

export default StudentForm;
