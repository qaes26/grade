import { motion } from 'framer-motion';

export default function ResultsDisplay({ sgpa, cgpa }) {
    const isHigh = parseFloat(sgpa) >= 3.5;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <motion.div
                layout
                className={`glass-card p-6 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${isHigh ? 'border-green-400/30 shadow-[0_0_30px_rgba(74,222,128,0.2)]' : ''}`}
            >
                <h3 className="text-xl text-gray-300 mb-4 font-semibold">Semester GPA</h3>
                <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                        <motion.circle
                            cx="96" cy="96" r="88"
                            stroke="currentColor" strokeWidth="12"
                            fill="transparent"
                            strokeLinecap="round"
                            className={isHigh ? "text-green-400" : "text-purple-500"}
                            strokeDasharray={553}
                            strokeDashoffset={553 - (553 * (parseFloat(sgpa) / 4))}
                            initial={{ strokeDashoffset: 553 }}
                            animate={{ strokeDashoffset: 553 - (553 * (parseFloat(sgpa) / 4)) }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className={`text-5xl font-bold ${isHigh ? 'text-green-400' : 'text-white'}`}>{sgpa}</span>
                        <span className="text-sm text-gray-400 mt-1">/ 4.00</span>
                    </div>
                </div>
                {isHigh && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none"
                    />
                )}
            </motion.div>

            <motion.div
                layout
                className="glass-card p-6 flex flex-col items-center justify-center relative overflow-hidden"
            >
                <h3 className="text-xl text-gray-300 mb-2 font-semibold">Cumulative GPA</h3>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-cyan-300 drop-shadow-lg">
                        {cgpa}
                    </div>
                </div>
                <p className="text-gray-400 mt-4 text-sm font-medium">Overall Performance</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />
            </motion.div>
        </div>
    );
}
