import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

export const GRADE_POINTS = {
    'A': 4.0, 'A-': 3.75,
    'B+': 3.5, 'B': 3.0, 'B-': 2.75,
    'C+': 2.5, 'C': 2.0, 'C-': 1.75,
    'D+': 1.5, 'D': 1.0, 'F': 0.0
};

export default function SemesterGPA({ courses, setCourses }) {
    const addCourse = () => {
        setCourses([...courses, { id: Date.now(), name: '', hours: 3, grade: 'A' }]);
    };

    const removeCourse = (id) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id, field, value) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 w-full max-w-4xl mx-auto mb-8"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Semester Courses</h2>
                <button
                    onClick={addCourse}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg active:scale-95"
                >
                    <Plus size={20} /> Add Course
                </button>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {courses.map((course) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex flex-col md:flex-row gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5"
                        >
                            <div className="flex-1 w-full">
                                <input
                                    type="text"
                                    value={course.name}
                                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                    placeholder="Course Name (e.g., Math)"
                                    className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-white focus:border-purple-500 outline-none transition-colors"
                                />
                            </div>
                            <div className="w-full md:w-32">
                                <input
                                    type="number"
                                    min="0"
                                    value={course.hours}
                                    onChange={(e) => updateCourse(course.id, 'hours', parseFloat(e.target.value) || 0)}
                                    className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-white focus:border-purple-500 outline-none transition-colors text-center"
                                    placeholder="Credits"
                                />
                            </div>
                            <div className="w-full md:w-32">
                                <select
                                    value={course.grade}
                                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                                    className="w-full bg-slate-800 border-b border-white/20 px-2 py-1 text-white focus:border-purple-500 outline-none transition-colors rounded text-center appearance-none cursor-pointer"
                                >
                                    {Object.keys(GRADE_POINTS).map(g => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={() => removeCourse(course.id)}
                                className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-white/5 rounded-full"
                            >
                                <Trash2 size={20} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {courses.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                        No courses added yet. Click "Add Course" to start.
                    </div>
                )}
            </div>
        </motion.div>
    );
}
