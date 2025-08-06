# 🏠 Swiftly - Property Rental Platform

Swiftly is a modern web application designed to simplify property renting, listing, and management. Built with **React + JavaScript**, styled using **Tailwind CSS**, and structured for scalable team development.

---

## 📦 Tech Stack

* **React (Vite) + JavaScript**
* **Tailwind CSS**
* **React Router DOM**


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/swiftly.git
cd swiftly
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🌱 Git Branch Workflow

### 🧑‍💻 For Every New Feature / Fix:

1. Pull the latest `main`:

   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a new branch:

   ```bash
   git checkout -b feature/your-branch-name
   ```

3. Make your changes, commit, and push:

   ```bash
   git add .
   git commit -m "feat: add xyz feature"
   git push origin feature/your-branch-name
   ```

4. Create a **Pull Request (PR)** to `main` from GitHub.

### 📝 How to Raise a Pull Request (PR):

1. **Navigate to GitHub Repository**:
   - Go to `https://github.com/amentcapital-dev/swiftly`
   - You'll see a banner suggesting to "Compare & pull request" for your recently pushed branch

2. **Create the Pull Request**:
   - Click **"Compare & pull request"** button
   - Or go to **"Pull requests"** tab → **"New pull request"**

3. **Fill PR Details**:
   ```
   Title: fix: setup Tailwind CSS v4 and resolve JSX className issue
   
   Description:
   ## Changes Made
   - ✅ Added @tailwindcss/vite plugin to vite.config.js
   - ✅ Fixed className attribute in App.jsx (was using 'class')
   - ✅ Added proper Tailwind CSS import in index.css
   - ✅ Resolved encoding issues in CSS file
   
   ## Testing
   - [x] Tailwind CSS classes now work correctly
   - [x] Development server runs without errors
   - [x] Styles are properly applied to components
   ```

4. **Select Reviewers & Labels**:
   - Add team members as reviewers
   - Add appropriate labels (e.g., `bug`, `enhancement`, `documentation`)

5. **Submit the PR**:
   - Click **"Create pull request"**
   - Wait for code review and approval
   - Merge after approval ✅

---

## 📁 Folder Structure

```
src/
├── assets/             # Images and media
├── components/         # Shared UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── pages/              # Route-level pages
├── routes/             # App routing configuration
├── App.jsx
├── main.jsx
```

---

## 🢑 Contributing

* Use clear and descriptive branch names: `feature/...`, `bugfix/...`, `chore/...`
* Follow PR naming and commit message conventions:

  * `feat: ...`, `fix: ...`, `chore: ...`, `refactor: ...`
* Add `.gitkeep` in empty folders if needed
* Keep components reusable and modular

---

## 📬 Contact

For questions, reach out to the project maintainer or your team lead.
