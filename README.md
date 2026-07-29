# Simple Flash Cards App

A simple flash card web app for browsing decks and studying with an interactive carousel-style card viewer. Built with vanilla JavaScript, HTML, and CSS.  
I created this app as part of my first project while attending Triple Tens Code Camp to display my skills in creating a functioning web app that can allow a user to study code terminology and other various helpful notes.

## Features

- **Deck dashboard** – view all your flash card decks at a glance, each shown as a color-coded card with its name and card count.
- **Interactive carousel viewer** – click into any deck to page through its cards one at a time.
- **Flip to reveal answers** – tap the flip button to reveal the answer side of the current card, and flip back to the question.
- **Smart navigation controls** – the previous/next buttons automatically disable when you're on the first or last card in a deck, so you can't navigate past the ends.
- **Deck management** – delete decks you no longer need directly from the dashboard.
- **Hash-based routing** – navigate between the home, about, deck carousel, and 404 views using the URL hash, so views are shareable and bookmarkable.
- **Responsive, styled UI** – clean BEM-structured CSS with a card-based layout and custom color themes per deck.

## Technologies Used

- **HTML5** – semantic markup and a `<template>` element for dynamic deck rendering.
- **CSS3** – custom styling using the BEM naming convention, plus normalize.css for consistent cross-browser defaults.
- **JavaScript (ES Modules)** – vanilla JS, no frameworks, organized into modules for decks, colors, carousel logic, and app routing.
- **Google Fonts** – the Inter typeface.

## System Requirements Needed

You don't need much to run or work on this project — no databases, no backend servers, no complicated installs.  
Here's what you need:

- **Viewing The App** - A modern web browser — Chrome, Firefox, Safari, or Edge (any version from the last few years works fine). Once deployed, this app runs entirely in the browser.
- **Editing The Code** - To edit the code on your own computer you will need a code/text editor — **Visual Studio Code** is a free beginner code editor that i personally used on this project.
- **To View Changes** - Any modern web browser (stated above) to preview those changes.
- **Local Web Server** - _Important!_ This project uses a feature called JavaScript "modules," and browsers won't let those load correctly if you just double-click index.html to open it directly. Instead, use one of these easy options:

* Install the Live Server extension in VS Code, then right-click index.html and choose "Open with Live Server."
* If you have Python installed, open a terminal in the project folder and run python3 -m http.server, then visit http://localhost:8000 in your browser.
* If you have Node.js installed, run npx serve in the project folder.
* (Optional) Node.js — only needed if you want to use Prettier to auto-format the code consistently (this project includes a \_prettierignore file for that purpose).

- **Publish/Deploy The App** - No special server or hosting requirements — since this is a "static site" (just HTML, CSS, and JavaScript files, no backend), it can be hosted almost anywhere for free, such as:

* GitHub Pages - easiest option if your code is already on GitHub.
* Netlify or Vercel - drag-and-drop style deployment.
* _Important!_ - Just make sure the assets folder (containing the CSS, JavaScript, and image files) stays in the same place relative to index.html when you upload it, since the app expects that folder structure to work correctly.
