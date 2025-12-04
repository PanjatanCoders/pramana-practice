# 🎯 Pramana Fill

**Smart Test Data Generator for Browser Testing**

Fill forms instantly with realistic test data. No more typing "test@test.com" or "asdf asdf" ever again!

## ✨ Features

### 🚀 Core Features
- **One-Click Form Fill**: Automatically fills entire forms with intelligent field detection
- **Right-Click Context Menu**: Fill individual fields with precise data types
- **Smart Field Detection**: Recognizes field types from labels, placeholders, and names
- **Indian Data Support**: Names, phone numbers, addresses, pincodes in Indian format
- **Visual Feedback**: See which fields were filled with smooth animations

### 📋 Supported Data Types
- Names (First, Last, Full)
- Email addresses
- Phone numbers (Indian format: +91)
- Addresses, Cities, States, Pincodes
- Company names
- Usernames & Passwords
- Dates, Numbers, URLs
- And more!

## 🛠️ Installation

### For Development

1. **Clone or Download** this repository
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. Click **"Load unpacked"**
5. Select the folder containing the extension files
6. **Done!** The extension icon should appear in your toolbar

### File Structure
```
pramana-fill/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup UI
├── popup.css             # Popup styles
├── popup.js              # Popup functionality
├── background.js         # Background service worker
├── content.js            # Content script (injected into pages)
├── dataGenerator.js      # Data generation logic
├── icons/                # Extension icons (16, 32, 48, 128)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## 📖 Usage

### Method 1: Fill Entire Form
1. Click the Pramana Fill extension icon
2. Click **"Fill Entire Form"** button
3. Watch all visible fields get filled automatically!

### Method 2: Right-Click Menu
1. Right-click on any input field
2. Select **Pramana Fill → Auto-detect & Fill**
3. Or choose a specific data type from the submenu

### Method 3: Quick Actions
1. Focus on an input field
2. Click the extension icon
3. Click any quick action button (Name, Email, Phone, etc.)

## 🎨 Creating Icons

You need to create icon files in the `icons/` folder:
- `icon16.png` (16x16 pixels)
- `icon32.png` (32x32 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

**Quick Icon Creation:**
1. Use a tool like Canva, Figma, or Photoshop
2. Design with "PF" letters or a form/fill icon
3. Use your brand colors (purple gradient recommended)
4. Export at each required size

**Temporary Solution:**
You can use placeholder icons initially. Search for "form fill icon" on sites like:
- [Flaticon](https://www.flaticon.com)
- [Icons8](https://icons8.com)
- [Material Icons](https://fonts.google.com/icons)

## 🧪 Testing

### Test Pages
Create a simple HTML form to test:

```html
<!DOCTYPE html>
<html>
<body>
  <form>
    <input type="text" placeholder="First Name" />
    <input type="text" placeholder="Last Name" />
    <input type="email" placeholder="Email" />
    <input type="tel" placeholder="Phone" />
    <input type="text" placeholder="Address" />
    <input type="text" placeholder="City" />
    <input type="text" placeholder="Pincode" />
    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

## 🔧 Customization

### Adding New Data Types

1. **Edit `dataGenerator.js`**: Add new generation functions
2. **Edit `background.js`**: Add to context menu
3. **Edit `content.js`**: Add detection logic and fill logic

### Changing Data Format

Modify the arrays in `dataGenerator.js`:
- `firstNames`: Add more names
- `lastNames`: Add more surnames
- `cities`: Add more cities
- `emailDomains`: Add your preferred test domains

## 🚀 Publishing (Future)

### Chrome Web Store
1. Create developer account ($5 one-time fee)
2. Prepare store listing (screenshots, description)
3. Upload ZIP file
4. Submit for review

### Firefox Add-ons
1. Create developer account (free)
2. Upload signed extension
3. Submit for review

## 🤝 Contributing

Want to improve Pramana Fill? Here's how:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - Feel free to use, modify, and distribute!

## 🐛 Known Issues

- None yet! Report issues as you find them.

## 🎯 Roadmap

- [ ] Custom data templates
- [ ] Team sharing of templates
- [ ] More regional data formats
- [ ] Integration with test management tools
- [ ] Export/import settings
- [ ] Dark mode for popup

## 💡 Tips

- The extension works on local HTML files too!
- All generated data is clearly marked as test data
- Use "Auto-detect" for best results
- Passwords generated are strong but predictable for testing

## 📧 Support

For questions or support, create an issue in the repository.

---

**Made with ❤️ for the Testing Community**

Version 1.0.0