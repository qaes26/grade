import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className={`bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Card;
