import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMemeVotes, updateMemeBid } from "../store/slices/memeSlice";
import { addBid } from "../store/slices/bidSlice";
import { addNotification } from "../store/slices/uiSlice";
import { useSocket } from "./useSocket";

export const useRealTime = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    // Listen for real-time updates
    socket.on("vote_updated", (data) => {
      dispatch(updateMemeVotes(data));
      dispatch(
        addNotification({
          type: "info",
          message: `Meme ${data.vote_type === "up" ? "upvoted" : "downvoted"}!`,
        })
      );
    });

    socket.on("bid_placed", (data) => {
      dispatch(
        updateMemeBid({
          meme_id: data.meme_id,
          highest_bid: data.highest_bid,
        })
      );
      dispatch(addBid(data.bid));
      dispatch(
        addNotification({
          type: "success",
          message: `New bid of ${data.bid.credits} credits!`,
        })
      );
    });

    socket.on("meme_created", (data) => {
      dispatch(
        addNotification({
          type: "success",
          message: "New meme added to the gallery!",
        })
      );
    });

    return () => {
      socket.off("vote_updated");
      socket.off("bid_placed");
      socket.off("meme_created");
    };
  }, [socket, dispatch]);

  // Emit functions
  const emitVote = (voteData) => {
    if (socket) {
      socket.emit("vote_cast", voteData);
    }
  };

  const emitBid = (bidData) => {
    if (socket) {
      socket.emit("place_bid", bidData);
    }
  };

  const emitMemeCreated = (memeData) => {
    if (socket) {
      socket.emit("meme_created", memeData);
    }
  };

  return {
    socket,
    emitVote,
    emitBid,
    emitMemeCreated,
  };
};
