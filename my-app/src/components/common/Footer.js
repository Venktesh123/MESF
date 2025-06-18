import React from "react";
import { motion } from "framer-motion";
import { Zap, Heart, Code } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-dark-card border-t border-cyber-pink/30 mt-16"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-cyber-pink to-cyber-blue rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-cyber font-bold text-gradient">
              MEMEHUSTLE
            </span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>Cyberpunk AI Meme Marketplace</span>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-cyber-pink" />
              <span>& chaos</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Code className="w-4 h-4" />
              <span>Hackathon Project</span>
            </div>
            <span>© 2025 MemeHustle</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
