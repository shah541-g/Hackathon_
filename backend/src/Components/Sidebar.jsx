import React from "react";
import {
  MessageSquare,
  Settings,
  Menu,
  X,
  Code,
  Rocket,
  CodeXml,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectModal from "./ProjectModal"; // adjust path if needed

const Sidebar = ({
  activeSection,
  setActiveSection,
  isCollapsed,
  setIsCollapsed,
}) => {
  const sidebarItems = [
    { id: "project", label: "Create Project", icon: CodeXml },
    { id: "code", label: "Code Editor", icon: Code },
    { id: "deploy", label: "Deploy", icon: Rocket },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const navigate = useNavigate();

  return (
    <div
      className={`bg-base-100 h-full transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } border-r border-base-200 shadow-sm`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-base-200">
        {!isCollapsed && (
          <h3 className="text-sm font-semibold text-base-content flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            Workspace
          </h3>
        )}
        <button
          className="p-2 hover:bg-base-200 rounded-lg transition-colors"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <Menu className="w-4 h-4 text-base-content" />
          ) : (
            <X className="w-4 h-4 text-base-content" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col p-4 space-y-2">
        {sidebarItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;

          if (item.id === "project") {
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  const modal = document.getElementById("create-project-modal");
                  if (modal) modal.showModal();
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-base-content hover:bg-base-200"
                } ${isCollapsed ? "justify-center px-2" : ""}`}
                title={isCollapsed ? item.label : ""}
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                navigate(`/${item.id}`);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-base-content hover:bg-base-200"
              } ${isCollapsed ? "justify-center px-2" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <IconComponent className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* DaisyUI Modal Component */}
      <ProjectModal />
    </div>
  );
};

export default Sidebar;
