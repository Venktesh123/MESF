import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  useCreateMemeMutation,
  useGenerateCaptionMutation,
} from "../../store/api/apiSlice";
import { useRealTime } from "../../hooks/useRealTime";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { MEME_TAGS, PLACEHOLDER_IMAGES } from "../../utils/constants";
import toast from "react-hot-toast";

const MemeForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    tags: [],
    owner_id: "cyberpunk420",
  });
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState("");

  const [createMeme, { isLoading: isCreating }] = useCreateMemeMutation();
  const [generateCaption, { isLoading: isGeneratingCaption }] =
    useGenerateCaptionMutation();
  const { emitMemeCreated } = useRealTime();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.image_url.trim()) {
      newErrors.image_url = "Image URL is required";
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "Select at least one tag";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors above");
      return;
    }

    try {
      const result = await createMeme(formData).unwrap();

      emitMemeCreated(result);

      toast.success("Meme created successfully! 🚀");

      setFormData({
        title: "",
        image_url: "",
        tags: [],
        owner_id: "cyberpunk420",
      });
      setPreviewImage("");

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      toast.error("Failed to create meme");
      console.error("Create meme error:", error);
    }
  };

  const handleTagToggle = (tag) => {
    const newTags = formData.tags.includes(tag)
      ? formData.tags.filter((t) => t !== tag)
      : [...formData.tags, tag];

    setFormData({ ...formData, tags: newTags });

    if (newTags.length > 0 && errors.tags) {
      setErrors({ ...errors, tags: null });
    }
  };

  const handleGenerateCaption = async () => {
    if (formData.tags.length === 0) {
      toast.error("Select some tags first to generate a caption");
      return;
    }

    try {
      const result = await generateCaption(formData.tags).unwrap();
      toast.success("AI caption generated! 🤖");
      console.log("Generated caption:", result.data.caption);
    } catch (error) {
      toast.error("Failed to generate caption");
      console.error("Caption generation error:", error);
    }
  };

  const useRandomImage = () => {
    const randomImage =
      PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)];
    setFormData({ ...formData, image_url: randomImage });
    setPreviewImage(randomImage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-cyber font-bold text-gradient mb-2">
            CREATE MEME
          </h2>
          <p className="text-gray-400">
            Drop your creation into the digital underground
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Meme Title"
            placeholder="Enter a catchy title..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            error={errors.title}
            required
          />

          <div className="space-y-2">
            <Input
              label="Image URL"
              placeholder="https://example.com/image.jpg"
              value={formData.image_url}
              onChange={(e) => {
                setFormData({ ...formData, image_url: e.target.value });
                setPreviewImage(e.target.value);
              }}
              error={errors.image_url}
              required
            />
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={useRandomImage}
              >
                🎲 Random Image
              </Button>
            </div>
          </div>

          {previewImage && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Preview
              </label>
              <div className="aspect-square max-w-xs mx-auto border border-dark-border rounded-lg overflow-hidden">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewImage("")}
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Tags <span className="text-cyber-pink">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {MEME_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                    formData.tags.includes(tag)
                      ? "bg-cyber-pink text-white border border-cyber-pink shadow-neon"
                      : "bg-dark-bg text-gray-400 border border-dark-border hover:border-cyber-pink hover:text-cyber-pink"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
            {errors.tags && (
              <p className="text-sm text-red-400">{errors.tags}</p>
            )}
            {formData.tags.length > 0 && (
              <p className="text-sm text-gray-400">
                Selected: {formData.tags.join(", ")}
              </p>
            )}
          </div>

          <div className="bg-dark-bg/50 border border-cyber-blue/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">
                🤖 AI Caption Generator
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGenerateCaption}
                disabled={isGeneratingCaption || formData.tags.length === 0}
                loading={isGeneratingCaption}
              >
                Generate
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              Let Gemini AI create the perfect caption based on your tags
            </p>
          </div>

          <div className="flex space-x-4">
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isCreating}
              loading={isCreating}
            >
              🚀 Launch Meme
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  title: "",
                  image_url: "",
                  tags: [],
                  owner_id: "cyberpunk420",
                });
                setPreviewImage("");
                setErrors({});
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default MemeForm;
