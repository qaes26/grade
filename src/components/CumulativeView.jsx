import React from 'react';
import Card from './Card';
import { Calculator, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateGrade } from '../utils/gradeLogic';

const CumulativeView = ({ cumulativeData, setCumulativeData, calculateResult }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCumulativeData(prev => ({ ...prev, [name]: value }));
    };

    const result = calculateResult();
    const gradeLabel = calculateGrade(result).label;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
        >
            <Card>
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                    <Calculator className="w-5 h-5 text-purple-400" />
                    البيانات السابقة
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">المعدل التراكمي السابق</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="prevAvg"
                                placeholder="مثال: 84.5"
                                value={cumulativeData.prevAvg}
                                onChange={handleChange}
                                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg py-3 px-4 focus:border-purple-500/50 focus:outline-none transition-all"
                                dir="ltr"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">عدد الساعات السابقة المقطوعة</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="prevHours"
                                placeholder="مثال: 60"
                                value={cumulativeData.prevHours}
                                onChange={handleChange}
                                className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg py-3 px-4 focus:border-purple-500/50 focus:outline-none transition-all"
                                dir="ltr"
                            />
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                    <Clock className="w-5 h-5 text-purple-400" />
                    الفصل الحالي
                </h2>
                <div className="text-sm text-gray-500 mb-4 bg-purple-500/5 p-3 rounded-lg border border-purple-500/10">
                    يمكنك كتابة معدل الفصل الحالي يدوياً أو حسابه في تبويب "المعدل الفصلي" أولاً.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">معدل الفصل الحالي</label>
                        <input
                            type="number"
                            name="currentSemesterAvg"
                            placeholder="مثال: 88"
                            value={cumulativeData.currentSemesterAvg}
                            onChange={handleChange}
                            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg py-3 px-4 focus:border-purple-500/50 focus:outline-none transition-all"
                            dir="ltr"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">ساعات الفصل الحالي</label>
                        <input
                            type="number"
                            name="currentSemesterHours"
                            placeholder="مثال: 15"
                            value={cumulativeData.currentSemesterHours}
                            onChange={handleChange}
                            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg py-3 px-4 focus:border-purple-500/50 focus:outline-none transition-all"
                            dir="ltr"
                        />
                    </div>
                </div>
            </Card>

            <Card className="border-t-4 border-t-purple-500 bg-slate-800/50">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-400 font-medium text-sm mb-1">المعدل التراكمي الجديد</h3>
                        <div className="text-4xl font-bold text-white flex gap-3 items-baseline">
                            <span className="text-purple-400">{result}</span>
                            <span className="text-lg text-gray-500 font-normal">%</span>
                        </div>
                    </div>

                    <div className="text-left">
                        <div className="bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20 text-center min-w-[100px]">
                            <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                            <span className="text-purple-200 font-bold text-sm">{gradeLabel}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default CumulativeView;
