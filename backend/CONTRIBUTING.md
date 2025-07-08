# Contributing to PromptStack Frontend

Thank you for your interest in contributing to PromptStack! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/promptstack-frontend.git
   cd promptstack-frontend/frontend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Guidelines

### Code Style
- Use functional components with React hooks
- Follow the existing code structure and naming conventions
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Keep components small and focused on a single responsibility
- Use TypeScript-style JSDoc comments for complex functions

### Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import { IconName } from 'lucide-react';

const ComponentName = ({ prop1, prop2 }) => {
  // State and hooks
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // Handle click
  };

  // Render
  return (
    <div className="tailwind-classes">
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the established color scheme (blue/purple gradients)
- Ensure dark mode support for all new components
- Use consistent spacing (p-4, gap-3, etc.)
- Add hover states and transitions for interactive elements

## 🧪 Testing

Before submitting a PR:

1. **Test your changes**:
   ```bash
   npm run dev
   ```
2. **Check for linting errors**:
   ```bash
   npm run lint
   ```
3. **Build the project**:
   ```bash
   npm run build
   ```
4. **Test in both light and dark modes**
5. **Test responsive behavior** on different screen sizes

## 📝 Commit Guidelines

Use clear and descriptive commit messages:

- `feat: add dark mode toggle to navigation`
- `fix: resolve sidebar collapse issue on mobile`
- `docs: update README with new installation steps`
- `style: improve responsive design for chat panel`
- `refactor: extract common button component`

## 🔄 Pull Request Process

1. **Update documentation** if needed
2. **Test thoroughly** on different browsers and devices
3. **Create a descriptive PR title** and description
4. **Link any related issues**
5. **Request review** from maintainers

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] Tested on mobile
- [ ] Tested on desktop
- [ ] No console errors

## Screenshots
(If applicable)
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the bug
3. **Expected behavior**
4. **Actual behavior**
5. **Browser and device information**
6. **Screenshots** if helpful

## 💡 Feature Requests

For new features:

1. **Check existing issues** to avoid duplicates
2. **Describe the feature** clearly
3. **Explain the use case** and benefits
4. **Consider implementation** complexity
5. **Provide mockups** if applicable

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)
- [Vite Documentation](https://vitejs.dev/)

## ❓ Questions?

- Open an issue for general questions
- Join our community discussions
- Check existing documentation first

---

Thank you for contributing to PromptStack! 🙏
