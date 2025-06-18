import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Zap, Users, TrendingUp, Plus } from "lucide-react";
import Button from "../ui/Button";

const Header = () => {
  const location = useLocation();
  const connectedUsers = useSelector((state) => state.ui.connectedUsers);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-cyber-pink/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-cyber-pink to-cyber-blue rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-cyber font-bold text-gradient">
              MEMEHUSTLE
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-cyber-pink"
                  : "text-gray-300 hover:text-cyber-pink"
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/create"
              className={`text-sm font-medium transition-colors ${
                isActive("/create")
                  ? "text-cyber-pink"
                  : "text-gray-300 hover:text-cyber-pink"
              }`}
            >
              Create
            </Link>
            <Link
              to="/leaderboard"
              className={`text-sm font-medium transition-colors ${
                isActive("/leaderboard")
                  ? "text-cyber-pink"
                  : "text-gray-300 hover:text-cyber-pink"
              }`}
            >
              Leaderboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1 text-xs text-gray-400">
              <Users className="w-4 h-4" />
              <span>{connectedUsers} online</span>
            </div>

            <Link to="/create">
              <Button
                variant="primary"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
