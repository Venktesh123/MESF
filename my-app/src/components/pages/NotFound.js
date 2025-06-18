import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import GlitchText from '../components/common/GlitchText';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 max-w-lg mx-auto"
      >
        {/* 404 Display */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="text-8xl md:text-9xl font-cyber font-black text-gradient mb-4">
            <GlitchText text="404" autoGlitch={true} glitchInterval={2000} />
          </div>
          <div className="absolute inset-0 text-8xl md:text-9xl font-cyber font-black text-cyber-pink/20 animate-pulse">
            404
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-2xl md:text-3xl font-cyber font-bold text-white">
            PAGE NOT FOUND
          </h1>
          <p className="text-gray-400 text-lg">
            Looks like this page got lost in the cyber void. 
            The meme you're looking for doesn't exist in this dimension.
          </p>
        </motion.div>

        {/* Cyberpunk ASCII Art */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-mono text-xs text-cyber-green leading-tight"
        >
          <pre className="text-center">
{`    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    █                     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
    █    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
    █    █ CONNECTION TO MEME DATABASE LOST █                              █
    █    █ ERROR: PAGE_NOT_FOUND            █                              █
    █    █ INITIATING RECOVERY PROTOCOL...  █                              █
    █    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
    █                                                                      █
    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`}
          </pre>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <Button variant="primary" size="lg" className="flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Back to Gallery</span>
            </Button>
          </Link>
          
          <Link to="/create">
            <Button variant="neon" size="lg" className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Create Meme</span>
            # MemeHustle Frontend - Complete Directory Structure & Code

## 📁 Frontend Directory Structure