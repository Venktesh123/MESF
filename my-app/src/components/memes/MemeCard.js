import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  TrendingUp,
  Zap,
  DollarSign,
} from "lucide-react";
import { useVoteMemeMutation } from "../../store/api/apiSlice";
import { useRealTime } from "../../hooks/useRealTime";
import Button from "../ui/Button";
import BiddingPanel from "./BiddingPanel";
import toast from "react-hot-toast";

const MemeCard = ({ meme, index }) => {
  const [showBidding, setShowBidding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [voteMeme] = useVoteMemeMutation();
  const { emitVote } = useRealTime();

  const handleVote = async (type) => {
    try {
      await voteMeme({
        id: meme.id,
        type,
        user_id: "cyberpunk420",
      }).unwrap();

      emitVote({
        meme_id: meme.id,
        vote_type: type,
        user_id: "cyberpunk420",
      });

      toast.success(`${type === "up" ? "Upvoted" : "Downvoted"}! 🚀`);
    } catch (error) {
      toast.error("Failed to vote");
      console.error("Vote error:", error);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-dark-card border border-dark-border rounded-lg overflow-hidden hover:border-cyber-pink/50 hover:shadow-neon transition-all duration-300 meme-card"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-800">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyber-pink border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <img
          src={
            meme.image_url || `https://picsum.photos/400/400?random=${meme.id}`
          }
          alt={meme.title}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = `https://picsum.photos/400/400?random=${meme.id}`;
            setImageLoaded(true);
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {meme.tags?.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-cyber-pink/80 text-white text-xs rounded-full font-medium backdrop-blur-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {meme.highest_bid > 0 && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-cyber-green/80 text-dark-bg text-xs rounded-full font-bold backdrop-blur-sm flex items-center">
            <DollarSign className="w-3 h-3 mr-1" />
            {meme.highest_bid}
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg text-white group-hover:text-cyber-pink transition-colors duration-300 line-clamp-2">
          {meme.title}
        </h3>

        {meme.caption && (
          <p className="text-sm text-gray-400 italic border-l-2 border-cyber-blue/50 pl-3">
            "{meme.caption}"
          </p>
        )}

        {meme.vibe && (
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyber-purple" />
            <span className="text-xs text-cyber-purple font-medium">
              {meme.vibe}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>{formatNumber(meme.upvotes || 0)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{meme.bid_count || 0}</span>
            </div>
          </div>
          <span className="text-xs">by {meme.owner_id || "anonymous"}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("up")}
              className="text-gray-400 hover:text-cyber-green"
            >
              <Heart className="w-4 h-4 mr-1" />
              {meme.upvotes || 0}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("down")}
              className="text-gray-400 hover:text-red-400"
            >
              👎 {meme.downvotes || 0}
            </Button>
          </div>

          <Button
            variant="neon"
            size="sm"
            onClick={() => setShowBidding(true)}
            className="text-xs"
          >
            💰 Bid
          </Button>
        </div>
      </div>

      <BiddingPanel
        meme={meme}
        isOpen={showBidding}
        onClose={() => setShowBidding(false)}
      />
    </motion.div>
  );
};

export default MemeCard;
