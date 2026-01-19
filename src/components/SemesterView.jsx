import React from 'react';
import CourseList from './CourseList';
import Card from './Card';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateGrade } from '../utils/gradeLogic';

const SemesterView = ({ courses, setCourses, semesterAvg }) => {
    const gradeLabel = calculateGrade(semesterAvg).label;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <CourseList courses={courses} setCourses={setCourses} />

            <Card className="border-t-4 border-t-cyan-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-400 font-medium text-sm mb-1">المعدل الفصلي</h3>
                        <div className="text-4xl font-bold text-white flex gap-3 items-baseline">
                            <span className="text-cyan-400">{semesterAvg}</span>
                            <span className="text-lg text-gray-500 font-normal">%</span>
                        </div>
                    </div>

                    <div className="text-left">
                        <div className="bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/20 text-center min-w-[100px]">
                            <Award className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                            <span className="text-cyan-200 font-bold text-sm">{gradeLabel}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default SemesterView;
