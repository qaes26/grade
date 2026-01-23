import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 pt-8"
        >
            <div className="flex items-center justify-center gap-3 mb-2">
                <GraduationCap className="w-10 h-10 text-purple-400" />
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    GPA Calculator Pro
                </h1>
            </div>
            <p className="text-gray-300 text-lg">Effortless Grade Tracking</p>
        </motion.header>
    );
}
