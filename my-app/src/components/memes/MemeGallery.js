import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, RefreshCw } from "lucide-react";
import { useGetMemesQuery } from "../../store/api/apiSlice";
import { setMemes, setFilters } from "../../store/slices/memeSlice";
import MemeCard from "./MemeCard";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { MEME_TAGS } from "../../utils/constants";

const MemeGallery = () => {
  const dispatch = useDispatch();
  const { memes, filters } = useSelector((state) => state.memes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: memesData,
    isLoading,
    error,
    refetch,
  } = useGetMemesQuery({
    tags: selectedTags,
    limit: 50,
  });

  useEffect(() => {
    if (memesData?.data) {
      dispatch(setMemes(memesData.data));
    }
  }, [memesData, dispatch]);

  const filteredMemes = memes.filter(
    (meme) =>
      meme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meme.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
    dispatch(setFilters({ tags: newTags }));
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchTerm("");
    dispatch(setFilters({ tags: [] }));
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4">Failed to load memes 😞</div>
        <Button onClick={() => refetch()} variant="secondary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-cyber font-bold text-gradient"
        >
          MEME GALLERY
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Dive into the neon-soaked digital underground where memes are currency
          and chaos is king
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search memes, tags, or vibes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {selectedTags.length > 0 && (
                <span className="bg-cyber-pink text-white rounded-full px-2 py-1 text-xs">
                  {selectedTags.length}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              onClick={() => refetch()}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-dark-border pt-4"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-gray-400 self-center mr-2">
                  Tags:
                </span>
                {MEME_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      selectedTags.includes(tag)
                        ? "bg-cyber-pink text-white border border-cyber-pink"
                        : "bg-dark-bg text-gray-400 border border-dark-border hover:border-cyber-pink hover:text-cyber-pink"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {(selectedTags.length > 0 || searchTerm) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-400 hover:text-white"
                >
                  Clear all filters
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center space-x-8 text-sm text-gray-400"
      >
        <div>
          <span className="text-cyber-pink font-bold">
            {filteredMemes.length}
          </span>{" "}
          memes
        </div>
        <div>
          <span className="text-cyber-blue font-bold">
            {selectedTags.length}
          </span>{" "}
          filters active
        </div>
        <div>
          <span className="text-cyber-green font-bold">
            {filteredMemes.reduce((sum, meme) => sum + (meme.upvotes || 0), 0)}
          </span>{" "}
          total votes
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-dark-card rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-800 loading-shimmer" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-800 rounded loading-shimmer" />
                <div className="h-3 bg-gray-800 rounded w-2/3 loading-shimmer" />
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-800 rounded w-16 loading-shimmer" />
                  <div className="h-3 bg-gray-800 rounded w-12 loading-shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredMemes.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredMemes.map((meme, index) => (
            <MemeCard key={meme.id} meme={meme} index={index} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 space-y-4"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-300">No memes found</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Try adjusting your filters or search terms. The meme multiverse is
            vast!
          </p>
          <Button onClick={clearFilters} variant="secondary">
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default MemeGallery; // ===== PACKAGE CONFIGURATION
