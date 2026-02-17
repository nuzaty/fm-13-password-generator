# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL:
- Live Site URL:

### Built with

- Semantic HTML5 markup
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Sass (Dart Sass)](https://sass-lang.com/)
- [BEM](https://getbem.com/)
- JS
- [Vite](https://vite.dev/)
- Component-based
- [zxcvbn](https://github.com/dropbox/zxcvbn)

### Run Guide

**1. Install dependencies**

```bash
npm install
```

**2. Run development server**

Start local development (hot reload enabled):

```bash
npm run dev
```

### Build / Preview Guide

**Build for production**

Generate optimized production files:

```bash
npm run build
```

Output folder:

```
dist/
```

**Preview production build**

Run the built version locally:

```bash
npm run preview
```

This serves the `dist/` folder so you can test production behavior before deploying.

**Clean rebuild (if something breaks)**

```bash
rm -rf node_modules dist
npm install
npm run build
```

(Windows PowerShell)

```powershell
Remove-Item -Recurse -Force node_modules, dist
npm install
npm run build
```
