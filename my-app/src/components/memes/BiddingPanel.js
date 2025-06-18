import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, Clock } from "lucide-react";
import {
  usePlaceBidMutation,
  useGetBidsForMemeQuery,
} from "../../store/api/apiSlice";
import { useRealTime } from "../../hooks/useRealTime";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import toast from "react-hot-toast";

const BiddingPanel = ({ meme, isOpen, onClose }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [errors, setErrors] = useState({});

  const [placeBid, { isLoading: isPlacingBid }] = usePlaceBidMutation();
  const { data: bidsData, refetch } = useGetBidsForMemeQuery(meme?.id, {
    skip: !meme?.id || !isOpen,
  });
  const { emitBid } = useRealTime();

  const bids = bidsData?.data || [];
  const highestBid =
    bids.length > 0 ? Math.max(...bids.map((b) => b.credits)) : 0;
  const userCredits = Math.floor(Math.random() * 10000) + 1000;

  useEffect(() => {
    if (isOpen && meme?.id) {
      refetch();
    }
  }, [isOpen, meme?.id, refetch]);

  const validateBid = () => {
    const newErrors = {};
    const amount = parseInt(bidAmount);

    if (!bidAmount.trim()) {
      newErrors.bidAmount = "Bid amount is required";
    } else if (isNaN(amount) || amount <= 0) {
      newErrors.bidAmount = "Bid must be a positive number";
    } else if (amount <= highestBid) {
      newErrors.bidAmount = `Bid must be higher than ${highestBid} credits`;
    } else if (amount > userCredits) {
      newErrors.bidAmount = `You only have ${userCredits} credits`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();

    if (!validateBid()) {
      return;
    }

    const amount = parseInt(bidAmount);

    try {
      const result = await placeBid({
        meme_id: meme.id,
        credits: amount,
        user_id: "cyberpunk420",
      }).unwrap();

      emitBid({
        meme_id: meme.id,
        credits: amount,
        user_id: "cyberpunk420",
      });

      toast.success(`Bid placed successfully! 💰`);
      setBidAmount("");
      refetch();
    } catch (error) {
      toast.error("Failed to place bid");
      console.error("Bid error:", error);
    }
  };

  const suggestedBids = [
    highestBid + 100,
    highestBid + 250,
    highestBid + 500,
    highestBid + 1000,
  ].filter((amount) => amount <= userCredits);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const bidTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - bidTime) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!meme) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`💰 Bid on "${meme.title}"`}
      size="lg"
    >
      <div className="space-y-6">
        <div className="flex items-start space-x-4 p-4 bg-dark-bg/50 rounded-lg border border-cyber-pink/30">
          <img
            src={
              meme.image_url ||
              `https://picsum.photos/100/100?random=${meme.id}`
            }
            alt={meme.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-white">{meme.title}</h3>
            <p className="text-sm text-gray-400 mt-1">Owner: {meme.owner_id}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>{meme.upvotes || 0} votes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{bids.length} bids</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-4 text-center">
            <DollarSign className="w-6 h-6 text-cyber-green mx-auto mb-2" />
            <p className="text-sm text-gray-400">Highest Bid</p>
            <p className="text-xl font-bold text-cyber-green">
              {highestBid > 0 ? `${highestBid} credits` : "No bids yet"}
            </p>
          </div>
          <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4 text-center">
            <Users className="w-6 h-6 text-cyber-blue mx-auto mb-2" />
            <p className="text-sm text-gray-400">Your Credits</p>
            <p className="text-xl font-bold text-cyber-blue">
              {userCredits.toLocaleString()}
            </p>
          </div>
        </div>

        <form onSubmit={handlePlaceBid} className="space-y-4">
          <Input
            label="Your Bid"
            type="number"
            placeholder={`Minimum: ${highestBid + 1} credits`}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            error={errors.bidAmount}
            min={highestBid + 1}
            max={userCredits}
          />

          {suggestedBids.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Quick bid:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedBids.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setBidAmount(amount.toString())}
                    className="px-3 py-1 bg-cyber-pink/20 text-cyber-pink border border-cyber-pink/50 rounded-lg text-sm hover:bg-cyber-pink hover:text-white transition-colors"
                  >
                    {amount} credits
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isPlacingBid}
            loading={isPlacingBid}
          >
            🚀 Place Bid
          </Button>
        </form>

        <div className="space-y-3">
          <h4 className="font-semibold text-white flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Recent Bids</span>
          </h4>

          {bids.length > 0 ? (
            <div className="max-h-48 overflow-y-auto space-y-2">
              {bids.slice(0, 10).map((bid, index) => (
                <motion.div
                  key={bid.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-dark-bg/30 rounded-lg border border-dark-border"
                >
                  <div>
                    <p className="font-medium text-white">{bid.user_id}</p>
                    <p className="text-sm text-gray-400">
                      {formatTimeAgo(bid.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-cyber-green">
                      {bid.credits} credits
                    </p>
                    {index === 0 && (
                      <span className="text-xs text-cyber-pink">
                        Current high
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No bids yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BiddingPanel;
