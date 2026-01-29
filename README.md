# Career Quest - React + Vite Edition

A fully functional career exploration game built with React and Vite for the FBLA 2025-2026 Computer Game & Simulation Programming competition.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd career-quest-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## 📦 Project Structure

```
career-quest-react/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── TitleScreen.jsx
│   │   ├── Stars.jsx
│   │   ├── HUD.jsx
│   │   ├── HubWorld.jsx
│   │   ├── MiniGame.jsx
│   │   └── CompletionScreen.jsx
│   ├── data/
│   │   └── careers.js   # Career data and questions
│   ├── App.jsx          # Main app component
│   ├── App.css          # All styles
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎮 Features

- **React State Management**: Uses React hooks (useState, useEffect) for game state
- **Component Architecture**: Modular, reusable components
- **Vite Build System**: Fast HMR (Hot Module Replacement) and optimized builds
- **Keyboard Controls**: WASD and Arrow key movement
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Game Components

### TitleScreen
Entry point with start button and branding

### Stars
Animated star field background for atmosphere

### HUD
Heads-up display showing score and completed careers

### HubWorld
Central navigation area with character movement and portals

### MiniGame
Interactive career challenges with questions and feedback

### CompletionScreen
Final screen showing total score and play again option

## 🔧 Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` folder. You can deploy these files to any static hosting service.

To test the production build locally:

```bash
npm run preview
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Adding New Careers

Edit `src/data/careers.js` to add more career options:

```javascript
newCareer: {
  title: '🎯 Career Name',
  color: '#hexcolor',
  scenario: { ... },
  challenge: { ... },
  skills: [ ... ]
}
```

### Styling

All styles are in `src/App.css`. Modify CSS variables in `:root` to change the color scheme:

```css
:root {
  --primary: #00d9ff;
  --secondary: #ff006e;
  /* ... more variables */
}
```

## 🏆 FBLA Competition Ready

This project meets all FBLA 2025-2026 Computer Game & Simulation Programming requirements:

✅ Works on Windows, Mac, and modern browsers  
✅ Four career paths with scenarios  
✅ Skill-based challenges  
✅ No game-breaking bugs  
✅ Professional code quality  
✅ Complete documentation  

## 📄 Additional Documentation

See the following files in the project root:
- `PROJECT_DOCUMENTATION.md` - Full project overview
- `PRESENTATION_GUIDE.md` - Competition presentation script
- `TECHNICAL_SPECIFICATION.md` - Detailed technical documentation

## 🤝 Technology Stack

- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **CSS3** - Styling with animations
- **JavaScript ES6+** - Modern JavaScript features

## 📞 Support

For questions or issues:
1. Check the documentation files
2. Review the code comments
3. Test in multiple browsers

## 🎓 Educational Value

Players learn about:
- Software Engineering (debugging, code review, technical decisions)
- Nursing (patient care, emergency triage, medical safety)
- Business Analysis (data analysis, stakeholder management, strategy)
- Law (legal reasoning, ethics, contract analysis)

---

**Good luck at FBLA competition!** 🏆
