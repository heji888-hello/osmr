# OSMR - Oh Student Music Reappraisal

> **Project Status: Version 1.0 Live (Static Production Build)**  
> The core frontend layout, responsive dashboard grid, production tip guides, and a localized browser data pipeline are fully complete. The app handles track indexing and peer critique interactions directly in the user environment.

---

## Live Demonstration
The project is officially deployed and functional on the live web. You can access the interface, test submissions, and leave feedback reviews directly at the production address:
**[https://github.io](https://github.io)**

---

## Architecture & Static Web Workaround
Because this environment is hosted strictly on GitHub Pages (which only supports frontend static assets), the dependency on a traditional backend server (server.js) has been optimized out. 

Instead, the application runs a virtualized database engine directly in the browser client using the Web Storage API (localStorage):
* **Persistent Content Pipeline:** Submitting a track form captures form variables, extracts file target metadata string parameters, and appends the object records cleanly to an item structure inside browser memory.
* **Dynamic Feed Streaming:** The dashboard layout queries the database layer on window loading routines, dynamically updating metrics counters (Active Tracks / Reviews Given) and generating card templates.
* **Peer Critique Engine:** Interactive comment modules read indices directly, pushing data arrays onto specific tracks so critique threads update instantly without page refreshes.

---

## Project Structure & Portability
While the application runs as a frontend static site, the original backend architecture structures have been preserved in the repository root for future deployment expansions:
* package.json & package-lock.json — Pre-configured package configurations tracking Express and Multer frameworks.
* server.js — An optimized backend server ready for deployment to full-stack hosts (Render/Railway), utilizing disk-streaming storage layers and dynamic process.env.PORT environmental fallbacks.

---

## Technical Specifications & Features
* **Layout Design:** Responsive CSS flexbox modules and two-column dashboard architectures.
* **Component Widgets:** Dynamic skeleton placeholders, input validation sanitization layers, custom asset drop-zone styling elements, and mechanical keyboard styling accents using the kbd tag.
* **Developer Details:** Created by Siran, Submitted to Mr. Theophilus Ayepeh.
