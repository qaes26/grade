import { motion } from 'framer-motion';

export default function StudentInfo({ name, setName, major, setMajor }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 mb-8 max-w-2xl mx-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Student Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-white placeholder-gray-500"
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Major / Specialization</label>
                    <input
                        type="text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-white placeholder-gray-500"
                        placeholder="Computer Science"
                    />
                </div>
            </div>
            {name && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center text-xl font-medium text-purple-300"
                >
                    Welcome, {name}!
                </motion.div>
            )}
        </motion.div>
    );
}
