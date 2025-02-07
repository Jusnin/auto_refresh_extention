# Auto Refresh Chrome Extension

This is a simple Chrome extension that allows users to automatically refresh the active tab at a specified interval. It also includes a countdown timer in the popup.

## Features
✅ Set a custom refresh interval (minimum 5 seconds)  
✅ Automatically reloads only the selected tab  
✅ Countdown timer displayed in the popup  
✅ Persists auto-refresh settings even after a page reload  
✅ Option to stop auto-refresh anytime  

## Installation

### Download or Clone this repository:
```bash
git clone https://github.com/yourusername/new_auto_refresh.git
```

### Load the Extension in Chrome:
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer Mode** (top right corner)
3. Click **Load Unpacked**
4. Select the project folder

### Use the Extension:
1. Click the extension icon.
2. Enter the refresh interval.
3. Click **Start** to begin auto-refreshing the active tab.

## Files Overview
- **`manifest.json`** → Defines the extension settings and permissions.
- **`popup.html`** → The user interface for setting the refresh interval.
- **`popup.js`** → Handles user interactions and starts/stops auto-refresh.
- **`background.js`** → Manages the refresh timer for the selected tab.

---
Enjoy using the Auto Refresh Chrome Extension! 🚀
