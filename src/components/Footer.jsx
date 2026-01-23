import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 py-6 text-center text-gray-400 border-t border-white/10"
        >
            <p className="text-lg font-medium">
                Prepared by <span className="text-purple-400 font-bold">Qais Jazi</span>
            </p>
            <p className="text-sm mt-1 opacity-70">من إعداد قيس جازي</p>
        </motion.footer>
    );
}
