import React, { useState } from 'react';
import { Send, Loader, Sparkles, Lightbulb, Code, Zap, Target, Layers } from 'lucide-react';

const SimpleChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [_currentStep, _setCurrentStep] = useState('prompt'); // 'prompt', 'generating', 'result'

  // Enhanced sample app ideas with categories
  const samplePrompts = [
    {
      category: "SaaS Applications",
      ideas: [
        "Build a SaaS for gym management with member tracking and billing",
        "Create a project management tool for remote teams",
        "Design a customer support ticketing system with AI",
        "Develop a social media scheduling platform"
      ]
    },
    {
      category: "E-commerce & Marketplace",
      ideas: [
        "Build an online marketplace for handmade crafts",
        "Create a subscription box service platform",
        "Design a local service booking app (like TaskRabbit)",
        "Develop a digital product marketplace"
      ]
    },
    {
      category: "Productivity & Tools",
      ideas: [
        "Create a habit tracking app with analytics",
        "Build a note-taking app with AI organization",
        "Design a time tracking tool for freelancers",
        "Develop a password manager with team sharing"
      ]
    },
    {
      category: "Social & Community",
      ideas: [
        "Build a professional networking platform",
        "Create a local events discovery app",
        "Design a skill-sharing community platform",
        "Develop a book club social network"
      ]
    }
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);
    _setCurrentStep('generating');

    // Enhanced AI response simulation for app building
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: generateAppBuildingResponse(newMessage.text),
        timestamp: new Date(),
        type: 'assistant',
        isResponse: true,
        features: extractAppFeatures(newMessage.text)
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
      _setCurrentStep('result');
    }, 2500);
  };

  const generateAppBuildingResponse = (prompt) => {
    // More intelligent response generation based on the prompt
    const appType = detectAppType(prompt);
    
    return `🚀 Excellent idea! I'll help you build "${prompt}". 

Here's what I'm planning for your ${appType}:

📋 **Core Features I'll Create:**
• User authentication & dashboard
• ${appType === 'SaaS' ? 'Subscription management' : 'Core functionality'}
• Responsive design with modern UI
• Database integration
• API endpoints

🛠️ **Tech Stack:**
• Frontend: React + Tailwind CSS
• Backend: Node.js + Express
• Database: MongoDB/PostgreSQL
• Authentication: JWT

⚡ **Next Steps:**
1. Setting up project structure
2. Creating database models
3. Building authentication system
4. Developing main features
5. Adding responsive UI components

Ready to start coding? I'll begin with the project setup and core components!`;
  };

  const detectAppType = (prompt) => {
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('saas') || lowerPrompt.includes('subscription')) return 'SaaS';
    if (lowerPrompt.includes('marketplace') || lowerPrompt.includes('e-commerce')) return 'Marketplace';
    if (lowerPrompt.includes('social') || lowerPrompt.includes('community')) return 'Social Platform';
    if (lowerPrompt.includes('management') || lowerPrompt.includes('tracking')) return 'Management Tool';
    return 'Web Application';
  };

  const extractAppFeatures = (prompt) => {
    // Extract potential features from the prompt
    const features = [];
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('user') || lowerPrompt.includes('member')) features.push('User Management');
    if (lowerPrompt.includes('payment') || lowerPrompt.includes('billing')) features.push('Payment Processing');
    if (lowerPrompt.includes('chat') || lowerPrompt.includes('message')) features.push('Real-time Chat');
    if (lowerPrompt.includes('notification')) features.push('Notifications');
    if (lowerPrompt.includes('analytics') || lowerPrompt.includes('report')) features.push('Analytics Dashboard');
    
    return features.length > 0 ? features : ['Core Functionality', 'User Interface', 'Data Management'];
  };

  const handleSamplePrompt = (prompt) => {
    setMessage(prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-base-100">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-base-300 px-4 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Sparkles size={20} className="text-primary" />
            </div>
            AI App Builder
          </h3>
          <div className="flex items-center gap-2">
            <div className="badge badge-success badge-sm">
              <Zap size={12} className="mr-1" />
              AI Powered
            </div>
            <div className="badge badge-info badge-sm">
              {messages.length} {messages.length === 1 ? 'idea' : 'ideas'} processed
            </div>
          </div>
        </div>
        <p className="text-sm text-base-content/70 mt-2">
          Describe your app idea and I'll build it for you with modern tech stack
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-base-content/70 mt-8">
            <div className="mb-6">
              <div className="relative mx-auto w-20 h-20 mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-primary/40 rounded-full animate-pulse delay-75"></div>
                <div className="absolute inset-4 bg-primary rounded-full flex items-center justify-center">
                  <Code size={24} className="text-primary-content" />
                </div>
              </div>
              <h4 className="font-bold text-lg text-base-content">Bring Your App Ideas to Life</h4>
              <p className="text-sm mt-2 max-w-md mx-auto">
                Describe any application you want to build. I'll create the complete codebase, 
                database structure, and deployment-ready components.
              </p>
            </div>
            
            {/* Enhanced Quick Suggestions */}
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-center gap-2 text-sm text-base-content/60">
                <Target size={16} />
                <span>Try these popular app categories:</span>
              </div>
              
              {samplePrompts.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-6">
                  <h5 className="text-sm font-semibold text-base-content/80 mb-3 flex items-center gap-2">
                    <Layers size={14} />
                    {category.category}
                  </h5>
                  <div className="grid gap-2">
                    {category.ideas.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleSamplePrompt(prompt)}
                        className="btn btn-outline btn-sm text-left justify-start hover:btn-primary hover:scale-105 transition-all duration-200"
                      >
                        <Lightbulb size={14} />
                        <span className="truncate">{prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
              {/* Message Header */}
              <div className={`flex items-center gap-2 mb-1 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.type === 'user' 
                    ? 'bg-primary text-primary-content' 
                    : 'bg-gradient-to-br from-secondary to-primary text-secondary-content'
                }`}>
                  {msg.type === 'user' ? (
                    <span className="text-xs font-bold">You</span>
                  ) : (
                    <Sparkles size={16} />
                  )}
                </div>
                <span className="text-xs text-base-content/60">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
              
              {/* Message Content */}
              <div
                className={`p-4 rounded-2xl shadow-sm ${
                  msg.type === 'user'
                    ? 'bg-primary text-primary-content rounded-br-md'
                    : 'bg-base-200 text-base-content rounded-bl-md border border-base-300'
                }`}
              >
                {msg.type === 'user' ? (
                  <div>
                    <div className="text-xs opacity-70 mb-1">App Idea:</div>
                    <p className="text-sm font-medium">{msg.text}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {msg.text}
                    </div>
                    
                    {/* Features Preview */}
                    {msg.features && msg.features.length > 0 && (
                      <div className="mt-4 p-3 bg-base-100 rounded-lg border border-base-300">
                        <div className="text-xs font-semibold text-base-content/70 mb-2 flex items-center gap-1">
                          <Code size={12} />
                          Detected Features to Build:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {msg.features.map((feature, index) => (
                            <span
                              key={index}
                              className="badge badge-primary badge-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      <button className="btn btn-primary btn-xs">
                        <Code size={12} />
                        Start Building
                      </button>
                      <button className="btn btn-outline btn-xs">
                        Modify Requirements
                      </button>
                      <button className="btn btn-ghost btn-xs">
                        Ask Questions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary text-secondary-content flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <span className="text-xs text-base-content/60">Just now</span>
              </div>
              <div className="bg-base-200 text-base-content p-4 rounded-2xl rounded-bl-md border border-base-300">
                <div className="flex items-center gap-3">
                  <Loader className="animate-spin text-primary" size={20} />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Analyzing your app idea...</div>
                    <div className="text-xs text-base-content/70">
                      Planning architecture • Selecting tech stack • Generating components
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modern Input Area */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        {/* Floating Quick Actions */}
        {messages.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setMessage("Add user authentication to my app")}
                className="btn btn-sm bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-200 text-blue-700 hover:from-blue-500/20 hover:to-indigo-500/20 hover:border-blue-300 transition-all duration-200 whitespace-nowrap"
              >
                🔐 Add Auth
              </button>
              <button 
                onClick={() => setMessage("Create a dashboard for my app")}
                className="btn btn-sm bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200 text-purple-700 hover:from-purple-500/20 hover:to-pink-500/20 hover:border-purple-300 transition-all duration-200 whitespace-nowrap"
              >
                📊 Dashboard
              </button>
              <button 
                onClick={() => setMessage("Add payment integration")}
                className="btn btn-sm bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200 text-green-700 hover:from-green-500/20 hover:to-emerald-500/20 hover:border-green-300 transition-all duration-200 whitespace-nowrap"
              >
                💳 Payments
              </button>
              <button 
                onClick={() => setMessage("Make it mobile responsive")}
                className="btn btn-sm bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-200 text-orange-700 hover:from-orange-500/20 hover:to-red-500/20 hover:border-orange-300 transition-all duration-200 whitespace-nowrap"
              >
                📱 Mobile
              </button>
              <button 
                onClick={() => setMessage("Add database integration")}
                className="btn btn-sm bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-teal-200 text-teal-700 hover:from-teal-500/20 hover:to-cyan-500/20 hover:border-teal-300 transition-all duration-200 whitespace-nowrap"
              >
                🗄️ Database
              </button>
            </div>
          </div>
        )}
        
        <div className="p-6">
          {/* Main Input Container */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 focus-within:border-blue-500 focus-within:shadow-lg transition-all duration-300 relative overflow-hidden">
            {/* Input Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-pink-50/50 opacity-50"></div>
            
            <div className="relative flex gap-4 p-4">
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={messages.length === 0 
                    ? "✨ Describe your app idea in detail... (e.g., 'Build a SaaS for gym management with member tracking and billing')" 
                    : "💬 Ask for modifications, add features, or request clarifications..."
                  }
                  className="w-full bg-transparent border-0 resize-none text-gray-800 placeholder-gray-500 focus:outline-none min-h-[80px] text-base leading-relaxed"
                  rows="3"
                />
                
                {/* Character Counter & Status */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    {/* AI Status Indicator */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>AI Ready</span>
                    </div>
                    
                    {/* Smart Suggestions Indicator */}
                    {message.length > 10 && (
                      <div className="flex items-center gap-1 text-xs text-blue-600">
                        <Sparkles size={12} />
                        <span>Analyzing...</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Character Counter */}
                    <span className={`text-xs ${message.length > 450 ? 'text-red-500' : message.length > 300 ? 'text-yellow-600' : 'text-gray-400'}`}>
                      {message.length}/500
                    </span>
                    
                    {/* Keyboard Shortcut Hint */}
                    <div className="text-xs text-gray-400 hidden sm:flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-200 rounded">Ctrl</kbd>
                      <span>+</span>
                      <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-200 rounded">Enter</kbd>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Send Button */}
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading || message.length > 500}
                  className="btn btn-primary bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[80px] px-6 disabled:from-gray-300 disabled:to-gray-400"
                >
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader className="animate-spin text-white" size={20} />
                      <span className="text-xs text-white">Building...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Send size={20} className="text-white" />
                      <span className="text-xs text-white font-medium">Generate</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Smart Help Text */}
          <div className="mt-4">
            {messages.length === 0 ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                  <Lightbulb size={16} className="text-yellow-500" />
                  <span className="font-medium">Pro Tips for Better Results</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-500 max-w-2xl mx-auto">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Mention your target users and their needs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Specify core features and functionality</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Include preferred tech stack or platform</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>Describe the app's main purpose clearly</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Code size={12} />
                <span>Continue the conversation to refine your app or add new features</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleChatBox;
