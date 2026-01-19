import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Book } from 'lucide-react';
import Card from './Card';
import { calculateGrade } from '../utils/gradeLogic';

const CourseList = ({ courses, setCourses }) => {
    const addCourse = () => {
        setCourses([...courses, { id: Date.now(), name: '', hours: '', mark: '' }]);
    };

    const removeCourse = (id) => {
        if (courses.length > 1) {
            setCourses(courses.filter(course => course.id !== id));
        }
    };

    const updateCourse = (id, field, value) => {
        setCourses(courses.map(course =>
            course.id === id ? { ...course, [field]: value } : course
        ));
    };

    return (
        <Card className="mb-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Book className="w-5 h-5 text-cyan-400" />
                    المواد الدراسية
                </h2>
                <button
                    onClick={addCourse}
                    className="flex items-center gap-1 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-200 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-cyan-500/30"
                >
                    <Plus className="w-4 h-4" /> إضافة مادة
                </button>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-12 gap-2 text-sm text-gray-400 mb-2 px-3 font-medium">
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-11 md:col-span-5 text-right">اسم المادة</div>
                    <div className="col-span-2 md:col-span-2 text-center">الساعات</div>
                    <div className="col-span-2 md:col-span-2 text-center">العلامة</div>
                    <div className="col-span-2 text-center">حذف</div>
                </div>

                <AnimatePresence initial={false}>
                    {courses.map((course, index) => {
                        const grade = calculateGrade(course.mark);
                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="grid grid-cols-12 gap-2 items-center bg-black/40 p-3 rounded-lg border border-slate-800"
                            >
                                <div className="col-span-1 text-center text-gray-500 text-xs font-mono">
                                    {index + 1}
                                </div>

                                <div className="col-span-11 md:col-span-5">
                                    <input
                                        type="text"
                                        placeholder="اسم المادة (اختياري)"
                                        value={course.name}
                                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                        className="w-full bg-transparent text-white placeholder-gray-600 text-sm focus:outline-none"
                                    />
                                </div>

                                <div className="col-span-2 md:col-span-2 hidden md:block">
                                    <input
                                        type="number"
                                        placeholder="2"
                                        value={course.hours}
                                        onChange={(e) => updateCourse(course.id, 'hours', e.target.value)}
                                        className="w-full bg-transparent text-center text-white placeholder-gray-600 text-sm focus:outline-none border-l border-slate-700 border-r"
                                        dir="ltr"
                                    />
                                </div>

                                {/* Mobile View for Hours/Mark combined or stacked logic can be complex, sticking to simple grid for now but ensuring inputs work */}
                                <div className="col-span-3 md:hidden">
                                    <input
                                        type="number"
                                        placeholder="الساعات"
                                        value={course.hours}
                                        onChange={(e) => updateCourse(course.id, 'hours', e.target.value)}
                                        className="w-full bg-transparent text-center text-white placeholder-gray-600 text-xs focus:outline-none border-l border-slate-700 ml-1"
                                        dir="ltr"
                                    />
                                </div>

                                <div className="col-span-3 md:col-span-2 flex items-center justify-center relative">
                                    <input
                                        type="number"
                                        placeholder="90"
                                        value={course.mark}
                                        onChange={(e) => updateCourse(course.id, 'mark', e.target.value)}
                                        className="w-full bg-transparent text-center text-white placeholder-gray-600 text-sm focus:outline-none font-medium"
                                        dir="ltr"
                                    />
                                    {course.mark && (
                                        <span className={`absolute -left-2 top-0 text-[10px] font-bold ${grade.color}`}>
                                            {grade.letter}
                                        </span>
                                    )}
                                </div>

                                <div className="col-span-2 flex justify-center">
                                    <button
                                        onClick={() => removeCourse(course.id)}
                                        className="p-1.5 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </Card>
    );
};

export default CourseList;
