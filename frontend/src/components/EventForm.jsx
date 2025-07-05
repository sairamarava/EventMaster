import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarPlus, FaImage, FaCheck, FaTimes, FaUpload, FaStar } from 'react-icons/fa';

export default function EventForm({ onEventAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'academic',
    status: 'upcoming',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'academic', label: 'Academic', icon: '📚', color: 'from-blue-500 to-purple-600' },
    { value: 'cultural', label: 'Cultural', icon: '🎭', color: 'from-pink-500 to-rose-600' },
    { value: 'sports', label: 'Sports', icon: '⚽', color: 'from-green-500 to-emerald-600' },
    { value: 'technical', label: 'Technical', icon: '💻', color: 'from-indigo-500 to-blue-600' },
    { value: 'social', label: 'Social', icon: '🤝', color: 'from-orange-500 to-red-600' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Event date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, image: 'Please select a valid image file (.jpg, .jpeg, .png)' });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: 'File size must be less than 5MB' });
        return;
      }

      setSelectedFile(file);
      setErrors({ ...errors, image: '' });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('status', formData.status);
      
      if (selectedFile) {
        formDataToSend.append('image', selectedFile);
      }

      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const newEvent = await response.json();
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          date: '',
          category: 'academic',
          status: 'upcoming',
        });
        setSelectedFile(null);
        setImagePreview(null);
        setErrors({});
        
        // Show success message
        showSuccessMessage();
        
        // Notify parent component
        if (onEventAdded) {
          onEventAdded(newEvent);
        }
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Failed to create event' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSuccessMessage = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2';
    notification.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      Event created successfully! 🎉
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-energetic max-w-4xl mx-auto p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full">
          <FaCalendarPlus className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-3xl font-bold font-display gradient-text">Create Amazing Event</h2>
          <p className="text-gray-600">Design an unforgettable experience for your audience</p>
        </div>
        <FaStar className="text-accent text-2xl animate-pulse ml-auto" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Field */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
            Event Title ✨
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl border-2 focus:border-primary focus:outline-none transition-all duration-300 font-medium ${
              errors.title ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-primary/50'
            }`}
            placeholder="Enter an exciting event title..."
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-500 text-sm font-medium flex items-center gap-1">
              <FaTimes className="text-xs" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
            Event Category 🎯
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                type="button"
                onClick={() => setFormData({ ...formData, category: category.value })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  formData.category === category.value
                    ? `bg-gradient-to-r ${category.color} border-transparent text-white shadow-lg`
                    : 'border-gray-200 hover:border-primary/50 bg-white'
                }`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="font-bold text-sm">{category.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
            Event Description 📝
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className={`w-full px-4 py-3 rounded-2xl border-2 focus:border-primary focus:outline-none transition-all duration-300 font-medium resize-none ${
              errors.description ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-primary/50'
            }`}
            placeholder="Describe your amazing event in detail..."
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="text-red-500 text-sm font-medium flex items-center gap-1">
              <FaTimes className="text-xs" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Date Field */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
            Event Date 📅
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={`w-full px-4 py-3 rounded-2xl border-2 focus:border-primary focus:outline-none transition-all duration-300 font-medium ${
              errors.date ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-primary/50'
            }`}
            disabled={isSubmitting}
          />
          {errors.date && (
            <p className="text-red-500 text-sm font-medium flex items-center gap-1">
              <FaTimes className="text-xs" />
              {errors.date}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
            Event Image 🖼️
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
              disabled={isSubmitting}
            />
            <label
              htmlFor="image-upload"
              className="w-full flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-300 rounded-2xl hover:border-primary/50 transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/10 hover:to-secondary/10"
            >
              <FaUpload className="text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium mb-2">
                {selectedFile ? selectedFile.name : 'Click to upload event image'}
              </p>
              <p className="text-sm text-gray-500">
                Support: JPG, PNG, JPEG (Max 5MB)
              </p>
            </label>
          </div>
          
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-bold text-gray-700 mb-2">Preview:</p>
              <img
                src={imagePreview}
                alt="Event preview"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}
          
          {errors.image && (
            <p className="text-red-500 text-sm font-medium flex items-center gap-1">
              <FaTimes className="text-xs" />
              {errors.image}
            </p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
            <p className="text-red-700 font-medium flex items-center gap-2">
              <FaTimes />
              {errors.submit}
            </p>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-energetic flex-1 flex items-center justify-center gap-2 text-lg py-4"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating Magic...
              </>
            ) : (
              <>
                <FaCheck />
                Create Event 🚀
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setFormData({ title: '', description: '', date: '', category: 'academic', status: 'upcoming' });
              setSelectedFile(null);
              setImagePreview(null);
              setErrors({});
            }}
            className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all duration-300 hover:scale-105"
            disabled={isSubmitting}
          >
            Reset Form
          </button>
        </div>
      </form>
    </motion.div>
  );
}
