# Online Learning Platform

## Project Overview

This project is a web-based Online Learning Platform that allows users to browse and enroll in courses. The platform features course listings, search functionality, sorting, filtering, and interactive elements to enhance user experience.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Sass](https://sass-lang.com/) (installed via npm)

## Setup Instructions

### 1. Clone the repository

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development environment

#### Start Sass in watch mode:

```bash
npm run sass-dev
```

#### Start a local development server:

Using `http-server`

Run:

```bash
npm run serve
```

Then open http://127.0.0.1:8080

### 4. Build for production

To generate a minified CSS file for production:

```bash
npm run build
```

### \*. Lint setup uses latest Node LTS (v22) & ESLint v9, Stylelint for Sass

```bash
npm run lint:all
```

## Project Structure

```
capstone-project-zapolsky/
│── assets/
│   ├── css/          # Compiled CSS files
│   ├── scss/         # Source Sass files
│   ├── images/       # Project-related images
│── *.html            # HTML files
├── *.js              # JavaScript files
├── courses.json      # Course data file
│── README.md         # Project documentation
│── package.json      # Project dependencies and scripts
```

## Features

- Browse and search for courses
- View course details including instructor, difficulty, and topics
- Responsive design for desktop and mobile
- Sorting and filtering for efficient navigation
- Customer journey up to enrollment

## License

This project is licensed under ISC.
