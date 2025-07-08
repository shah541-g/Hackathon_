import React, { useState } from 'react';
import { Send, Sparkles, Code, Zap } from 'lucide-react';

const PromptInput = ({ onSubmit, isLoading = false, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit?.(inputValue);
      setInputValue(''); // Clear input after submit
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Sparkles size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI App Builder
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Describe your app idea and watch it come to life
        </p>
      </div>

      {/* Input Container */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl focus-within:shadow-xl focus-within:border-blue-500 dark:focus-within:border-blue-400">
        
        {/* Input Label */}
        <label htmlFor="app-idea-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          App Idea
        </label>

        {/* Textarea */}
        <textarea
          id="app-idea-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder || "Describe your app idea (e.g., Build SaaS for gym management with member tracking and billing)"}
          className="w-full h-32 px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
          disabled={isLoading}
        />

        {/* Character Counter */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span>{isLoading ? 'Processing...' : 'Ready'}</span>
          </div>
          <span className={`text-xs ${inputValue.length > 450 ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`}>
            {inputValue.length}/500
          </span>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim() || isLoading || inputValue.length > 500}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Building your app...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Generate App</span>
            </>
          )}
        </button>

        {/* Keyboard Hint */}
        <div className="flex items-center justify-center mt-3 text-xs text-gray-400 dark:text-gray-500">
          <span>Press </span>
          <kbd className="mx-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs">Enter</kbd>
          <span> to submit</span>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3">
          Try these examples:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Build a SaaS for gym management",
            "Create a task management app",
            "Design an e-commerce platform",
            "Develop a social media scheduler"
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => setInputValue(example)}
              disabled={isLoading}
              className="text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors duration-200 text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Code size={14} className="inline mr-2 text-blue-500" />
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Features Preview */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} className="text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
            What you'll get:
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-blue-800 dark:text-blue-300">
          <div>✨ Complete React app</div>
          <div>🎨 Modern UI components</div>
          <div>🔧 Ready-to-use code</div>
          <div>📱 Mobile responsive</div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
