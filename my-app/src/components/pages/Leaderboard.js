import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Crown, Medal, Award, Zap } from "lucide-react";
import { useGetLeaderboardQuery } from "../store/api/apiSlice";
import Button from "../components/ui/Button";
import GlitchText from "../components/common/GlitchText";

const Leaderboard = () => {
  const [limit, setLimit] = useState(10);
  const [timeframe, setTimeframe] = useState("all");

  const {
    data: leaderboardData,
    isLoading,
    error,
    refetch,
  } = useGetLeaderboardQuery(limit);

  const leaderboard = leaderboardData?.data || [];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-600";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600";
      default:
        return "bg-gradient-to-r from-cyber-pink to-cyber-blue";
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-400 text-lg mb-4">
          Failed to load leaderboard 😞
        </div>
        <Button onClick={() => refetch()} variant="secondary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-cyber font-bold">
          <GlitchText
            text="LEADERBOARD"
            className="text-gradient"
            autoGlitch={true}
            glitchInterval={5000}
          />
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Hall of Fame for the most viral memes in the cyberpunk underground
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-dark-card border border-dark-border rounded-lg p-4"
      >
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Show:</span>
          <div className="flex space-x-2">
            {[10, 25, 50].map((num) => (
              <button
                key={num}
                onClick={() => setLimit(num)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  limit === num
                    ? "bg-cyber-pink text-white"
                    : "bg-dark-bg text-gray-400 hover:text-white"
                }`}
              >
                Top {num}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Timeframe:</span>
          <div className="flex space-x-2">
            {[
              { key: "all", label: "All Time" },
              { key: "month", label: "This Month" },
              { key: "week", label: "This Week" },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setTimeframe(option.key)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  timeframe === option.key
                    ? "bg-cyber-blue text-white"
                    : "bg-dark-bg text-gray-400 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Total Memes",
            value: leaderboard.length,
            icon: Zap,
            color: "text-cyber-pink",
          },
          {
            label: "Total Votes",
            value: leaderboard.reduce(
              (sum, meme) => sum + (meme.upvotes || 0),
              0
            ),
            icon: TrendingUp,
            color: "text-cyber-blue",
          },
          {
            label: "Top Score",
            value: leaderboard[0]?.upvotes || 0,
            icon: Trophy,
            color: "text-cyber-green",
          },
          {
            label: "Average",
            value:
              Math.round(
                leaderboard.reduce(
                  (sum, meme) => sum + (meme.upvotes || 0),
                  0
                ) / leaderboard.length
              ) || 0,
            icon: Award,
            color: "text-cyber-purple",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-dark-card border border-dark-border rounded-lg p-4 text-center hover:border-cyber-pink/50 transition-all"
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className={`text-lg font-bold ${stat.color}`}>
              {formatNumber(stat.value)}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        {isLoading ? (
          [...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-dark-card border border-dark-border rounded-lg p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg loading-shimmer" />
                <div className="w-20 h-20 bg-gray-800 rounded-lg loading-shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded loading-shimmer w-3/4" />
                  <div className="h-3 bg-gray-800 rounded loading-shimmer w-1/2" />
                </div>
                <div className="text-right space-y-2">
                  <div className="h-4 bg-gray-800 rounded loading-shimmer w-16" />
                  <div className="h-3 bg-gray-800 rounded loading-shimmer w-12" />
                </div>
              </div>
            </div>
          ))
        ) : leaderboard.length > 0 ? (
          leaderboard.map((meme, index) => {
            const rank = index + 1;
            return (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className={`bg-dark-card border rounded-lg p-4 hover:shadow-neon transition-all duration-300 ${
                  rank <= 3
                    ? "border-cyber-pink/50"
                    : "border-dark-border hover:border-cyber-pink/30"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${getRankBadge(
                      rank
                    )} flex items-center justify-center flex-shrink-0`}
                  >
                    {getRankIcon(rank)}
                  </div>

                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={
                        meme.image_url ||
                        `https://picsum.photos/80/80?random=${meme.id}`
                      }
                      alt={meme.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg truncate">
                      {meme.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      by {meme.owner_id}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {meme.tags?.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-cyber-pink/20 text-cyber-pink text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-cyber-green" />
                      <span className="text-lg font-bold text-cyber-green">
                        {formatNumber(meme.upvotes || 0)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {meme.downvotes || 0} down
                    </p>
                    {meme.vibe && (
                      <p className="text-xs text-cyber-purple">{meme.vibe}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-16 space-y-4">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto" />
            <h3 className="text-xl font-bold text-gray-300">
              No memes in leaderboard yet
            </h3>
            <p className="text-gray-400">
              Be the first to create viral content!
            </p>
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/create")}
            >
              Create First Meme
            </Button>
          </div>
        )}
      </motion.div>

      {leaderboard.length >= limit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button
            variant="outline"
            onClick={() => setLimit(limit + 25)}
            disabled={isLoading}
          >
            Load More Legends
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard;
