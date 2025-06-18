import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import MemeForm from "../components/memes/MemeForm";
import Button from "../components/ui/Button";
import GlitchText from "../components/common/GlitchText";

const CreateMeme = () => {
  const navigate = useNavigate();

  const handleMemeCreated = (meme) => {
    setTimeout(() => {
      navigate("/", { state: { newMeme: meme } });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Button>
          <div className="h-6 w-px bg-cyber-pink/30" />
          <div className="flex items-center space-x-2 text-cyber-pink">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-mono">CREATION MODE</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-cyber font-bold">
          <GlitchText
            text="CREATE MEME"
            className="text-gradient"
            glitchOnHover={true}
          />
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Forge your digital masterpiece in the neon-lit depths of the meme
          underground
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-dark-card border border-cyber-blue/30 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-cyber-blue mb-4 flex items-center">
          <span className="mr-2">💡</span>
          Creation Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div className="space-y-2">
            <p>• Use high-quality images (400x400+ recommended)</p>
            <p>• Choose relevant tags for better discovery</p>
            <p>• Catchy titles get more engagement</p>
          </div>
          <div className="space-y-2">
            <p>• Let AI generate captions for viral potential</p>
            <p>• Preview your meme before publishing</p>
            <p>• Join the chaos, break the rules! 🚀</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <MemeForm onSuccess={handleMemeCreated} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-cyber-pink/10 via-cyber-purple/10 to-cyber-green/10 border border-cyber-pink/30 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-cyber-pink mb-4">
          🎯 Pro Tips for Maximum Chaos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">🤖</div>
            <p className="text-gray-300 font-medium mb-1">AI-Powered</p>
            <p className="text-gray-400">
              Use AI captions to amplify your meme's viral potential
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🔥</div>
            <p className="text-gray-300 font-medium mb-1">Trending Tags</p>
            <p className="text-gray-400">
              Include popular tags like crypto, stonks, or doge
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-gray-300 font-medium mb-1">Speed Deploy</p>
            <p className="text-gray-400">
              Ship fast, iterate faster - this is a hackathon!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateMeme;
