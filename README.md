# CV Generator

A React-based CV Generator allowing you to create, edit, and export your CV in multiple templates. It supports local data persistence, JSON export/import, and optional Cloud Sync via Google Sheets.

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Seba2312/Cv_generator_web.git
   cd Cv_generator_web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## User Guide

### 1. Saving & Data Management
The application provides three ways to save your data:

#### A. Automatic Local Storage
- Your changes are automatically saved to your browser's Local Storage as you type.
- If you refresh the page or close/reopen the tab, your data will persist.
- **Note**: This is specific to the browser and device you are using.

#### B. JSON File Export (Backup)
- Go to **"Settings" > "Local Data" > "Save / Export JSON"**.
- This downloads a file named `cv-backup-[DATE].json` containing all your data.
- You can restore this later using **"Load Single JSON"** or the **Folder Loader**.

#### C. Google Sheets Integration (Cloud Sync)
- This allows you to sync your CV data to a private Google Sheet.
- Useful for accessing your CV from different devices or keeping a cloud backup.

### 2. Google Sheets Integration Logic (`mzsheetlink`)
The "Web App URL" in Settings connects your frontend to a Google Apps Script hosted on your account.

#### How the Logic Works:
- **Upload (POST)**: When you click "Upload to Cloud", the app sends your full CV JSON to the Google Script.
  - The script saves the *exact* raw JSON into **Cell A1**. This is the source of truth.
  - The script *also* parses the JSON to update **Columns B-F** with human-readable summaries (Name, Email, Education, Projects, Skills) so you can easily view the current state in the sheet itself.
- **Download (GET)**: When you click "Download from Cloud", the app requests data from the URL. The script reads the raw JSON from **Cell A1** and sends it back to the app, restoring your state.

#### Setting up the Backend:
1. Create a new Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Copy the code from `src/backend/code.gs` in this project into the script editor.
4. **Deploy as a Web App**:
   - Click "Deploy" > "New deployment".
   - Select type **"Web app"**.
   - Set "Who has access" to **"Anyone"** (required for the app to talk to it without complex OAuth).
   - Click "Deploy".
5. Copy the resulting **Web App URL** and paste it into the "Web App URL" field in the application Settings.

### 3. Magic Image Loader
You can simplify loading your profile by organizing your files in a local folder.

#### How to use:
1. Create a folder on your computer.
2. Place your CV JSON file inside it.
3. Place your profile picture in the SAME folder and name it exactly: `mypic.png`, `mypic.jpg`, or `mypic.jpeg`.
4. In the App, go to **"Settings" > "Load from Folder"**.
5. Select the folder you created.
   - The app will list any `.json` files found for quick loading.
   - It will **automatically** detect the `mypic` file and upload it as your profile photo immediately.
