<<<<<<< HEAD
# 🚀 PromptStack - AI-Powered IDE Frontend

A modern, responsive frontend for PromptStack AI IDE built with React, Vite, and Tailwind CSS. Features a sleek two-panel layout with AI chat assistance and live code preview.

![PromptStack Screenshot](https://via.placeholder.com/800x400/1e293b/ffffff?text=PromptStack+AI+IDE)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dual-panel layout**: AI chat on the left, live preview on the right
- **Dark/Light mode**: Complete theme switching with system preference detection
- **Responsive design**: Mobile-first approach with adaptive layouts
- **Professional styling**: Clean gradients, smooth animations, and modern components

### 🤖 **AI Integration**
- **Interactive chat interface**: Real-time conversation with AI assistant
- **Typing indicators**: Visual feedback during AI responses
- **Message timestamps**: Track conversation history
- **Smart input**: Multi-line text area with character counter

### 📱 **Responsive Features**
- **Mobile sidebar**: Overlay navigation for small screens
- **Adaptive panels**: Stacked layout on mobile, side-by-side on desktop
- **Touch-friendly**: Optimized for mobile and tablet interactions
- **Collapsible sidebar**: Maximize workspace when needed

### 🛠 **Developer Experience**
- **Live preview panel**: Real-time code execution and error display
- **Workspace navigation**: Organized project structure
- **Profile management**: User avatar with dropdown menu
- **Keyboard shortcuts**: Enhanced productivity features

## 🏗 **Tech Stack**

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^19.1.0 | Frontend framework |
| **Vite** | ^7.0.0 | Build tool and dev server |
| **Tailwind CSS** | ^3.4.17 | Utility-first CSS framework |
| **DaisyUI** | ^4.12.24 | Component library |
| **Lucide React** | ^0.525.0 | Icon library |
| **React Router** | ^7.6.3 | Client-side routing |

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/promptstack-frontend.git
   cd promptstack-frontend/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📂 **Project Structure**

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Sidebar.jsx   # Navigation sidebar
│   │   ├── ChatInterface.jsx
│   │   ├── CodeEditor.jsx
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── LandingPage.jsx
│   │   ├── ModernIDEPage.jsx  # Main IDE interface
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── assets/           # Images, fonts, etc.
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── package.json
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js       # Vite configuration
└── README.md
```

## 🎯 **Key Components**

### **ModernIDEPage**
The main IDE interface featuring:
- Two-panel responsive layout
- AI chat with message bubbles
- Live preview panel with error handling
- Dark mode support
- Mobile-responsive design

### **Sidebar**
Collapsible navigation with:
- Workspace sections (Chat, Code Editor, Deploy, Settings)
- Mobile overlay functionality
- Dark mode styling
- Active state indicators

### **LandingPage**
Marketing page with:
- Hero section with call-to-action
- Feature highlights
- Clean, modern design
- Mobile-responsive layout

## 🌙 **Dark Mode**

PromptStack features a complete dark mode implementation:

- **Theme switching**: Toggle button in the top navigation
- **System detection**: Respects user's system preferences
- **Consistent styling**: All components support both themes
- **Smooth transitions**: Animated theme changes

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: < 768px (stacked layout, overlay sidebar)
- **Tablet**: 768px - 1024px (adaptive panels)
- **Desktop**: > 1024px (full two-panel layout)

### **Mobile Features**
- Overlay sidebar with backdrop
- Stacked panel layout
- Touch-optimized buttons
- Responsive typography

## 🛠 **Development**

### **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### **Code Style**
- ESLint configuration included
- Prettier recommended
- Consistent component structure
- Modern React patterns (hooks, functional components)

## 🎨 **Customization**

### **Colors**
Edit `tailwind.config.js` to customize the color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom colors
        }
      }
    }
  }
}
```

### **Components**
All components are built with Tailwind classes and can be easily customized by modifying the className props.

## 🔧 **Configuration**

### **Tailwind Config**
- Dark mode enabled with class strategy
- DaisyUI components included
- Custom animations and utilities

### **Vite Config**
- React plugin configured
- Fast refresh enabled
- Optimized build settings

## 🚀 **Deployment**

### **Build Process**
```bash
npm run build
```

### **Deployment Options**
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **Traditional hosting**: Upload `dist` folder contents

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **React Team** for the amazing framework
- **Tailwind Labs** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Vite Team** for the lightning-fast build tool

---

**Built with ❤️ by the PromptStack Team**

For questions or support, please open an issue or contact us at [support@promptstack.com](mailto:support@promptstack.com)+ Vite
=======
# React + Vite
>>>>>>> Ahmad

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
