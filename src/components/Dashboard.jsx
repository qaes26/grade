import React from 'react';
import Card from './Card';
import { Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ semesterGPA, cumulativeGPA }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card delay={0.2} className="relative overflow-hidden group border-t-4 border-t-cyan-500">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Award className="w-24 h-24 text-white" />
                </div>
                <h3 className="text-gray-400 font-medium text-sm mb-2">
                    المعدل الفصلي (Semester GPA)
                </h3>
                <div className="flex items-baseline gap-2 flex-row-reverse justify-end">
                    <span className="text-white/30 dir-ltr text-lg">/ 4.00</span>
                    <motion.span
                        key={semesterGPA}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-cyan-400"
                    >
                        {semesterGPA}
                    </motion.span>
                </div>
            </Card>

            <Card delay={0.3} className="relative overflow-hidden group border-t-4 border-t-purple-500">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <TrendingUp className="w-24 h-24 text-white" />
                </div>
                <h3 className="text-gray-400 font-medium text-sm mb-2">
                    المعدل التراكمي (Cumulative GPA)
                </h3>
                <div className="flex items-baseline gap-2 flex-row-reverse justify-end">
                    <span className="text-white/30 dir-ltr text-lg">/ 4.00</span>
                    <motion.span
                        key={cumulativeGPA}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-purple-400"
                    >
                        {cumulativeGPA}
                    </motion.span>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
