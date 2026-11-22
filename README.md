# To-Do App

A responsive, animated to-do app with accounts, a strict XP system and a global leaderboard. Complete real tasks, earn XP, climb the ranks.

**[Live demo](https://to-do-react-app-cyan.vercel.app)**

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [How XP Works](#how-xp-works)
- [Ranks](#ranks)
- [Data Model](#data-model)
- [Project Structure](#project-structure)
- [Possible Improvements](#possible-improvements)
- [Author](#author)

## Features

- **Tasks:** add (with an optional time label), complete, un-complete, delete, and clear all completed tasks
- **Filters:** All, To Do and Done, with an animated tab indicator
- **Accounts:** sign up and log in with email and password (Firebase Authentication)
- **Real-time sync:** tasks and XP update instantly across devices (Cloud Firestore)
- **XP system:** every completed task is scored by a strict, anti-farming algorithm, in English and Romanian
- **Ranks and leaderboard:** a global ranking that shows only display names, never emails
- **Profile:** see your total XP and rank, and change your display name
- **Dark mode:** follows your system setting, can be toggled, and is applied before first paint (no white flash)
- **Responsive:** built mobile-first; modals become bottom sheets on phones
- **Animations:** Framer Motion for lists, tabs, modals, toasts and the checkbox; respects the system "reduce motion" setting
- **Accessible:** keyboard navigation, visible focus rings, ARIA labels, Escape closes modals

## Tech Stack

| Technology                                                          | Purpose                                  |
| ------------------------------------------------------------------- | ---------------------------------------- |
| [React 19](https://react.dev)                                       | UI components and state                  |
| [Vite](https://vite.dev)                                            | Dev server and build tool                |
| [Tailwind CSS 4](https://tailwindcss.com)                           | Utility-first styling                    |
| [Framer Motion](https://motion.dev)                                 | Animations and transitions               |
| [Firebase Auth](https://firebase.google.com/docs/auth)              | Authentication                           |
| [Cloud Firestore](https://firebase.google.com/docs/firestore)       | Real-time database                       |
| [Oxlint](https://oxc.rs)                                            | Fast linting                             |
| [Vercel](https://vercel.com)                                        | Hosting and deployment                   |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20.19 or newer
- npm (comes with Node.js)
- A Firebase project with **Authentication (Email/Password)** and **Cloud Firestore** enabled

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

### Using your own Firebase project

The Firebase configuration lives in `src/firebase.js`. To run your own copy, replace the `firebaseConfig` values with the ones from your Firebase console (Project settings, Your apps, Web app).

Firebase web config values are not secrets, but your **Firestore security rules are what protect the data**. At a minimum, make sure that:

- users can only read, create, update and delete their own documents in `todos` (`userId == request.auth.uid`)
- users can only write to their own document in `users`, and everyone signed in can read `users` (needed for the leaderboard)

### Available Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Starts the development server with hot reload    |
| `npm run build`   | Creates an optimized production build in `dist/` |
| `npm run preview` | Previews the production build locally            |
| `npm run lint`    | Runs Oxlint on the project                       |

## How XP Works

XP is calculated in `src/utils/taskXp.js`. The system is intentionally strict: a typical task is worth **2 to 8 XP** and the hard cap is **20 XP** per task. It works for task titles written in **English or Romanian** (diacritics are normalized).

**What earns points**

| Criterion                                                        | Points            |
| ---------------------------------------------------------------- | ----------------- |
| Base                                                             | +2                |
| Detail (each word beyond the first two, up to 12 words)          | +0.5 per word     |
| Clear action verb (e.g. *write*, *build*, *scrie*, *studiază*)   | +2                |
| Substantial work (e.g. *project*, *report*, *exam*, *proiect*)   | +1.5 each, max +6 |
| Duration written in the title (e.g. *2 hours*, *90 min*, *2 ore*) | up to +6          |
| Vague wording (e.g. *stuff*, *test*, *ceva*)                     | score x 0.5       |

**What earns nothing (0 XP)**

- A one-word title
- Text that does not look like a real task (gibberish or heavy repetition)
- The exact same task you already earned XP for
- Completing a task within 2 minutes of creating it
- Any task after your 10th rewarded task of the day

**What reduces XP**

- Completing a task within 10 minutes of creating it: x 0.5
- Daily diminishing returns: tasks 1 to 3 pay in full, 4 to 6 pay x 0.5, 7 to 10 pay x 0.25

XP is awarded **once per task**. Un-checking and re-checking a task never gives XP again. The optional **Time** field is only a label and does not affect XP; to get the duration bonus, write the duration in the title.

## Ranks

| Rank     | XP required |
| -------- | ----------- |
| Unranked | 0           |
| Bronze   | 1           |
| Silver   | 100         |
| Gold     | 300         |
| Diamond  | 700         |
| Master   | 1500        |
| Legend   | 3000        |

## Data Model

**`todos`**

| Field       | Type      | Notes                                           |
| ----------- | --------- | ----------------------------------------------- |
| `userId`    | string    | Owner's uid                                     |
| `text`      | string    | Task title                                      |
| `time`      | string    | Optional label                                  |
| `completed` | boolean   |                                                 |
| `xpAwarded` | boolean   | `true` after the first completion               |
| `xpGiven`   | number    | XP earned for this task (can be 0)              |
| `xpAt`      | timestamp | When the XP was awarded (used for the daily cap) |
| `createdAt` | timestamp | Server timestamp                                |

**`users`** (document id = uid)

| Field  | Type   | Notes                          |
| ------ | ------ | ------------------------------ |
| `name` | string | Public display name            |
| `xp`   | number | Total XP                       |

## Project Structure

```
src/
├── auth/         # LoginForm, SignupForm
├── components/   # UI: TodoForm/List/Item, FilterBar, Modal, XpToast, Leaderboard, Profile...
├── constants/    # Filter constants
├── hooks/        # useTodos (Firestore + XP), useDarkMode, useLocalStorage
├── utils/        # taskXp (XP algorithm), ranks, filterTodos, profile
├── App.jsx       # Root component
├── firebase.js   # Firebase initialization
├── main.jsx      # Entry point
└── index.css     # Tailwind import and global styles
```

## Possible Improvements

- Edit existing tasks
- Drag and drop to reorder
- Real due dates with deadline-based XP
- Server-side XP validation (for example with Cloud Functions) so scores cannot be tampered with from the client

## Author

**r0b-3rt**
GitHub: [@r0b-3rt](https://github.com/r0b-3rt)
