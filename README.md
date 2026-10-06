# To-Do App

A clean, responsive to-do list built with **React**, **Tailwind CSS** and **Vite**. Add tasks, mark them as done, and filter your list to focus on what matters.

**[Live demo](https://to-do-react-app-cyan.vercel.app)**

<!-- Add a screenshot or GIF here. Save it as screenshot.png in a /docs or /public folder, then uncomment the line below:
![To-Do App screenshot](./docs/screenshot.png)
-->

## Features

- Add, complete and delete tasks
- Filter tasks by status: **All**, **Active** and **Completed**
- Smooth animations powered by Framer Motion
- Responsive layout that works on mobile and desktop
  <!-- Add or remove lines to match your app, e.g.:
- Tasks persist between sessions using localStorage
- Dark mode
- Task counter showing remaining items
  -->

## Tech Stack

| Technology                                | Purpose                            |
| ----------------------------------------- | ---------------------------------- |
| [React 19](https://react.dev)             | UI components and state management |
| [Vite](https://vite.dev)                  | Dev server and build tool          |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling              |
| [Framer Motion](https://motion.dev)       | Animations and transitions         |
| [Oxlint](https://oxc.rs)                  | Fast linting                       |
| [Vercel](https://vercel.com)              | Hosting and deployment             |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or newer
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/r0b-3rt/to_do_react_app.git

# Go to the project folder
cd to_do_react_app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Starts the development server with hot reload    |
| `npm run build`   | Creates an optimized production build in `dist/` |
| `npm run preview` | Previews the production build locally            |
| `npm run lint`    | Runs Oxlint on the project                       |

## Project Structure

<!-- Replace this with your real structure and keep the comments short. Example: -->

```
src/
├── components/   # Reusable UI components (form, list, item, filters)
├── App.jsx       # Root component
├── main.jsx      # Entry point
└── index.css     # Tailwind import
```

## What I Learned

<!-- Write 3-4 honest bullet points. Recruiters read this section. Examples:
- Managing state with React hooks and passing data through props
- Styling a responsive UI with Tailwind CSS v4
- Adding animations with Framer Motion
- Deploying a Vite app to Vercel
-->

## Possible Improvements

- Edit existing tasks
- Drag and drop to reorder
- Due dates and categories

## Author

**r0b-3rt**
GitHub: [@r0b-3rt](https://github.com/r0b-3rt)
