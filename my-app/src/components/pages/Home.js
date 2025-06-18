import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Zap, TrendingUp, Users, Sparkles } from "lucide-react";
import MemeGallery from "../components/memes/MemeGallery";
import Button from "../components/ui/Button";
import GlitchText from "../components/common/GlitchText";

const Home = () => {
  const connectedUsers = useSelector((state) => state.ui.connectedUsers);

  const stats = [
    {
      icon: TrendingUp,
      label: "Memes Trading",
      value: "∞",
      color: "text-cyber-pink",
    },
    {
      icon: Users,
      label: "Users Online",
      value: connectedUsers,
      color: "text-cyber-blue",
    },
    {
      icon: Zap,
      label: "AI Generated",
      value: "24/7",
      color: "text-cyber-green",
    },
    {
      icon: Sparkles,
      label: "Vibes Level",
      value: "MAX",
      color: "text-cyber-purple",
    },
  ];

  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 space-y-8"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-cyber font-black"
          >
            <GlitchText
              text="MEMEHUSTLE"
              className="text-gradient"
              autoGlitch={true}
              glitchInterval={4000}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-mono"
          >
            <span className="text-cyber-pink">
              // CYBERPUNK AI MEME MARKETPLACE
            </span>
            <br />
            Where creativity meets chaos in the digital underground
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/create">
            <Button variant="primary" size="lg" className="min-w-[200px]">
              <Sparkles className="w-5 h-5 mr-2" />
              Create Meme
            </Button>
          </Link>

          <Link to="/leaderboard">
            <Button variant="neon" size="lg" className="min-w-[200px]">
              <TrendingUp className="w-5 h-5 mr-2" />
              Leaderboard
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="bg-dark-card border border-dark-border rounded-lg p-4 hover:border-cyber-pink/50 transition-all duration-300"
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="py-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-cyber font-bold text-gradient mb-4">
            FEATURES
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the future of meme trading with AI-powered chaos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🤖",
              title: "AI Captions",
              description:
                "Google Gemini generates viral captions and vibes for your memes",
              color: "border-cyber-pink/50",
            },
            {
              icon: "💰",
              title: "Real-Time Bidding",
              description:
                "Live auction system with WebSocket updates and credit trading",
              color: "border-cyber-blue/50",
            },
            {
              icon: "🚀",
              title: "Viral Leaderboard",
              description:
                "Vote, trend, and climb the cyberpunk meme hierarchy",
              color: "border-cyber-green/50",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className={`bg-dark-card border ${feature.color} rounded-lg p-6 text-center hover:shadow-neon transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <MemeGallery />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="text-center py-16 bg-gradient-to-r from-cyber-pink/10 via-cyber-purple/10 to-cyber-blue/10 rounded-lg border border-cyber-pink/30"
      >
        <h2 className="text-3xl font-cyber font-bold text-gradient mb-4">
          Ready to Enter the Matrix?
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Join the digital revolution where memes are currency and creativity
          rules the underground
        </p>
        <div className="space-x-4">
          <Link to="/create">
            <Button variant="primary" size="lg">
              Start Creating
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </motion.section>
    </div>
  );
};
export default Home;
