# OSMR - Student Music Portal

> **Project Status: ~75% Complete**  
> The core frontend layout, form processing, dashboard grid, and multi-format audio/zip uploading engine are fully built and working! Remaining work includes shifting from local memory storage to a permanent database system and polishing user profile custom views.

---

## Prerequisites
Before running this project locally, you must have **Node.js** installed on your computer:
* Download and install it from the official site: [https://nodejs.org](https://nodejs.org)

---

## How to Run Locally

### 1. Clone and Navigate
Download or clone this repository to your computer, then open your terminal (or Command Prompt) inside the project's root directory.

### 2. Install Dependencies
Run the following command to securely download and rebuild your local `node_modules` structure containing Express and Multer:
```bash
npm install
```

### 3. Start the Server
Boot up the backend environment locally by running:
```bash
node server.js
```
*(Note: If your main server script uses a different name like `app.js` or `index.js`, make sure to swap that name into the command above!)*

### 4. Launch the Platform
Once the terminal logs confirm that the server is up, open your web browser and go directly to:
```text
http://localhost:3000/Home.html
```

---

## Technical Specifications Built So Far
* **Backend Framework:** Express 5.x asset routing configuration.
* **Upload Engine:** Multer storage system accepting `.mp3`, `.wav`, `.m4a`, and `.zip` file formats up to a **100MB limit**.
* **Automatic Storage Handling:** The application automatically maps and generates a secure local physical `/uploads` folder if it doesn't already exist on deployment.
