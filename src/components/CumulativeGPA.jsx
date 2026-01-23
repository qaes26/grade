import { motion } from 'framer-motion';

export default function CumulativeGPA({ prevGPA, setPrevGPA, prevHours, setPrevHours }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 w-full max-w-4xl mx-auto mb-8"
        >
            <h2 className="text-2xl font-bold text-white mb-6">Cumulative GPA Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Previous Cumulative GPA</label>
                    <input
                        type="number"
                        min="0" max="4" step="0.01"
                        value={prevGPA}
                        onChange={(e) => setPrevGPA(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-white placeholder-gray-500"
                        placeholder="e.g., 3.45"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Total Previous Credit Hours</label>
                    <input
                        type="number"
                        min="0"
                        value={prevHours}
                        onChange={(e) => setPrevHours(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-white placeholder-gray-500"
                        placeholder="e.g., 60"
                    />
                </div>
            </div>
        </motion.div>
    );
}
