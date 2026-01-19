import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6 md:py-8"
        >
            <div className="flex items-center justify-center gap-3 mb-2">
                <img src={logo} alt="GPA Flow Logo" className="w-16 h-16 object-contain" />
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    حاسبة المعدل التراكمي
                </h1>
            </div>
            <p className="text-cyan-200/60 text-sm font-medium">احسب معدلك بسهولة ودقة</p>
        </motion.header>
    );
};

export default Header;
