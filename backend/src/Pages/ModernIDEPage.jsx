import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  User,
  Send,
  Bot,
  Rocket,
  Settings,
  LogOut,
  Moon,
  Sun,
  Code,
  Play,
  Bug,
  MessageSquare,
  Sparkles,
  Clock,
  Bolt,
  Loader2,
  Eye,
  FileText,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import CodeEditor from "../components/CodeEditor";
import ThemeSelector from "../Components/ThemeSelector";
import { useTheme } from "../Context/themeContext";
import { useAuth } from "../Context/authContext";
import { logoutUser } from "../API/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserProfile } from "../API/user";

const ModernIDEPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your AI coding assistant. Describe the app you want to build and I'll help you create it step by step!",
      timestamp: new Date(),
    },
  ]);
  // const [userAvatar, setUserAvatar] = useState(null);
  const { theme } = useTheme();
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [previewMode, setPreviewMode] = useState("live"); // 'live' or 'error'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState("chat");
  const [rightPanelView, setRightPanelView] = useState("preview"); // 'preview' or 'code'
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const res = await getUserProfile();
      setCurrentUser(res?.data?.user);
    };
    getData();
    console.log("fetching user data on the main page ", currentUser);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const newMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI response with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        content: `Great idea! I'll help you build that "${inputMessage}". Let me generate a modern, responsive application with the latest tech stack. Here's what I'm creating for you...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 2500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const renderMessage = (message) => {
    const isUser = message.type === "user";
    return (
      <div
        key={message.id}
        className={`flex ${
          isUser ? "justify-end" : "justify-start"
        } mb-6 animate-fadeIn`}
      >
        <div
          className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${
            isUser ? "flex-row-reverse" : "flex-row"
          } items-end gap-3`}
        >
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
              isUser
                ? "bg-gradient-to-r from-primary to-primary-content"
                : "bg-gradient-to-r from-secondary to-accent"
            }`}
          >
            {isUser ? (
              <img
                src={currentUser?.avatar}
                alt="user avatar"
                className="w-full rounded-full text-base-100"
              />
            ) : (
              <Bot className="w-5 h-5 text-base-100" />
            )}
          </div>

          {/* Message bubble */}
          <div className="flex flex-col">
            <div
              className={`px-4 py-3 rounded-2xl shadow-md ${
                isUser
                  ? "bg-gradient-to-r from-primary to-primary-content text-base-100 rounded-br-md"
                  : "bg-base-100 text-base-content border border-base-200 rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>

            {/* Timestamp */}
            <div
              className={`text-xs text-base-content mt-1 flex items-center gap-1 ${
                isUser ? "justify-end mr-3" : "justify-start ml-3"
              }`}
            >
              <Clock className="w-3 h-3" />
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTypingIndicator = () => (
    <div className="flex justify-start mb-6 animate-fadeIn">
      <div className="flex items-end gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center shadow-lg">
          <Bot className="w-5 h-5 text-base-100" />
        </div>
        <div className="bg-base-100 border border-base-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-md">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-sm text-base-300">AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-base-100">
      {/* Top Bar */}
      <div className="bg-base-100 border-b border-base-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-base-200 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-base-content" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Bolt className="w-5 h-5 text-base-100" />
              </div>
              <span className="text-lg font-bold text-base-content">
                PromptStack
              </span>
              <div className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                AI IDE
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeSelector />
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 ring-2 ring-base-100"
              >
                <img
                  src={currentUser?.avatar}
                  alt="user avatar"
                  className="w-full rounded-full"
                />
              </button>

              {/* Profile dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-xl shadow-lg border border-base-200 py-2 z-50">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-base-content hover:bg-base-200 flex items-center gap-2 transition-colors"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-base-content hover:bg-base-200 flex items-center gap-2 transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        {!sidebarCollapsed && (
          <div className="hidden md:block">
            <Sidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              isCollapsed={false}
              setIsCollapsed={() => {}}
            />
          </div>
        )}

        {/* Mobile sidebar overlay */}
        {!sidebarCollapsed && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarCollapsed(true)}
            ></div>
            <div className="relative">
              <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                isCollapsed={false}
                setIsCollapsed={() => setSidebarCollapsed(true)}
              />
            </div>
          </div>
        )}

        {/* Two-Panel Layout */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Left Panel - AI Chat */}
          <div className="flex-1 flex flex-col bg-base-100 lg:min-w-0">
            {/* Chat Header */}
            <div className="bg-base-100 px-6 py-4 border-b border-base-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-base-content flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-base-100" />
                    </div>
                    AI Assistant
                  </h2>
                  <p className="text-sm text-base-content/55 mt-1">
                    Describe your app and I'll generate the code
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-success/20 text-success text-xs font-medium rounded-full flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    Online
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(renderMessage)}
              {isTyping && renderTypingIndicator()}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-base-100 p-6 border-t border-base-200 shadow-sm">
              <div className="flex gap-3">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe the app you want to build... (e.g., 'Create a modern task management app with user authentication')"
                  className="p-2 flex-1 resize-none rounded-xl border border-base-200 bg-base-100 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  rows="3"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-secondary to-accent hover:from-secondary-focus hover:to-accent-focus disabled:bg-neutral text-base-100 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Helper text */}
              <div className="mt-3 flex items-center justify-between text-xs text-base-content/60">
                <div className="flex items-center gap-4">
                  <span>Press Enter to send</span>
                  <span>•</span>
                  <span>{inputMessage.length}/500 characters</span>
                </div>
                {isLoading && (
                  <div className="flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>AI is processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Live Preview / Code Editor */}
          <div className="w-full lg:w-1/2 lg:max-w-2xl flex flex-col bg-base-100 border-t lg:border-t-0 lg:border-l border-base-200">
            {/* Panel Header */}
            <div className="px-6 py-4 border-b border-base-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-base-content flex items-center gap-2">
                    {rightPanelView === "preview" ? (
                      <Rocket className="w-5 h-5 text-primary" />
                    ) : (
                      <Code className="w-5 h-5 text-secondary" />
                    )}
                    {rightPanelView === "preview"
                      ? "Live Preview"
                      : "Code Editor"}
                  </h2>

                  {/* View Toggle */}
                  <div className="flex items-center bg-base-200 rounded-lg p-1">
                    <button
                      onClick={() => setRightPanelView("preview")}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        rightPanelView === "preview"
                          ? "bg-base-100 text-base-content shadow-sm"
                          : "text-base-300 hover:text-base-content"
                      }`}
                    >
                      <Eye className="w-3 h-3 mr-1 inline" />
                      Preview
                    </button>
                    <button
                      onClick={() => setRightPanelView("code")}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        rightPanelView === "code"
                          ? "bg-base-200 text-base-content shadow-sm"
                          : "text-base-300 hover:text-base-content"
                      }`}
                    >
                      <FileText className="w-3 h-3 mr-1 inline" />
                      Code
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {rightPanelView === "preview" && (
                    <button
                      onClick={() =>
                        setPreviewMode(
                          previewMode === "live" ? "error" : "live"
                        )
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        previewMode === "live"
                          ? "bg-success/20 text-success"
                          : "bg-error/20 text-error"
                      }`}
                    >
                      {previewMode === "live" ? (
                        <div className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          Live
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Bug className="w-3 h-3" />
                          Error
                        </div>
                      )}
                    </button>
                  )}
                  <button className="p-1 hover:bg-base-200 rounded transition-colors">
                    <Settings className="w-4 h-4 text-base-content" />
                  </button>
                </div>
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {rightPanelView === "preview" ? (
                // Preview Content
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                      <Rocket className="w-10 h-10 text-base-100" />
                    </div>
                    <h3 className="text-xl font-bold text-base-content mb-3">
                      Live Preview
                    </h3>
                    <p className="p-2 text-sm flex-1 resize-none rounded-xl border border-base-200 bg-base-100 text-base-content/70 placeholder-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                      Your generated code will appear here. Start a conversation
                      with the AI assistant to see your app come to life!
                    </p>

                    {previewMode === "error" && (
                      <div className="mt-6 p-4 bg-error/10 border border-error/50 rounded-lg">
                        <div className="flex items-center gap-2 text-error">
                          <Bug className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Build Error Mode
                          </span>
                        </div>
                        <p className="text-xs text-error mt-1">
                          This is where build errors would be displayed
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Code Editor Content
                <div className="flex-1 overflow-hidden">
                  <CodeEditor />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ModernIDEPage;
