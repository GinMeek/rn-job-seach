# JobPulse - Modern React Native Job Search App

A modern, high-performance cross-platform mobile application built with **React Native** and **Expo SDK 51**. Powered by 100% free open APIs from **Remotive** and **Arbeitnow**, delivering real-time tech and remote jobs worldwide with zero API keys required.

---

## 🌟 Key Features

- **Custom Brand Identity & Logo**:
  - Distinctive **JobPulse** brand emblem combining a tech viewfinder frame and dynamic pulse wave.
  - Deployed across **app icon**, Android **adaptive icon**, high-res **splash screen**, web **favicon**, and in-app navigation headers.
  - Branded **`JobPulseLoader`** with breathing logo pulse animation.
- **Interactive Slide-Out Menu Drawer**:
  - Tap the top-left menu button to slide open the interactive navigation drawer.
  - Quick-jump shortcuts (*Search All, Featured, Latest, Remote Only*).
  - Filter by popular tech stacks (*React, React Native, Python, TypeScript, Design, Engineering*).
  - Real-time data provider status indicators (*Remotive 🟢, Arbeitnow 🟢*).
  - One-tap "Force Refresh Feeds" cache clearer and native app sharing.
- **Persistent "Add to Favorite" & Saved Jobs Screen**:
  - Bookmarked jobs are stored persistently on-device via `@react-native-async-storage/async-storage`.
  - Accessible via the **Saved Jobs** item in the interactive menu drawer with a real-time badge count.
  - Dedicated `/favorites` screen allowing users to browse saved positions, jump directly to job details, or remove them with a single tap.
  - Heart bookmark button in Job Details footer dynamically syncs across the entire application.
- **Interactive Brand Header**:
  - Replaces legacy static avatar with the interactive **JobPulse logo** button.
  - Tapping opens the **About JobPulse** modal showcasing version, open API architecture, and live feature highlights.
- **Free Open APIs (Zero API Keys Required)**:
  - **Remotive API**: Global remote tech, design, marketing, and engineering jobs with verified salary ranges and company logos.
  - **Arbeitnow API**: Live European and international software engineering positions with tags, job types, and hourly updates.
  - Unified adapter service fetching concurrently with in-memory caching and fallback resilience.
- **Modern UI & Relative Datetime Badges**:
  - Live relative timestamps on all job cards: *"Just now"*, *"15m ago"*, *"2h ago"*, *"3d ago"*.
  - Clean company avatars with automatic two-letter initials fallbacks.
  - Badges for **Salary ranges**, **Remote status**, **Employment type** (*Full-time, Contract, Internship*), and **Source** (*Remotive / Arbeitnow*).
- **Modern Stack**: Upgraded to **Expo SDK 51**, React Native 0.74, React 18, and file-based routing via **Expo Router 3.5**.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Expo (SDK 51)](https://expo.dev) + [React Native 0.74](https://reactnative.dev)
- **Navigation**: [Expo Router v3](https://docs.expo.dev/router/introduction/) (File-based routing)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Build & Distribution**: [EAS Build](https://docs.expo.dev/build/introduction/) (Cloud Android APK & AAB builds)
- **Styling**: Native StyleSheet with clean responsive design tokens

```
rn-job-seach/
├── app/                        # Expo Router routes
│   ├── _layout.js              # Root layout & font loading
│   ├── index.js                # Home screen (Featured & Latest jobs + Drawer & Modals)
│   ├── job-details/[id].js     # Detailed job view (About, Qualifications, Responsibilities)
│   └── search/[id].js          # Search results with live filters
├── assets/                     # Branded icons, splash screen, and fonts
│   ├── icon.png                # 1024x1024 squircle app icon
│   ├── adaptive-icon.png       # 1024x1024 Android adaptive foreground
│   ├── splash.png              # 1284x2778 branded splash screen
│   ├── favicon.png             # 48x48 web favicon
│   └── images/logo.png         # 512x512 in-app brand emblem
├── components/                 # UI components
│   ├── common/cards/           # Modern Popular & Nearby/Latest job cards
│   ├── common/drawer/          # Interactive slide-out MenuDrawer
│   ├── common/header/          # Header action buttons
│   ├── common/loader/          # Branded pulsing JobPulseLoader
│   ├── common/modal/           # About JobPulse modal
│   ├── home/                   # Welcome, Featured carousel, Latest positions
│   └── jobdetails/             # Company header, tabs, specifics, footer CTA
├── constants/                  # Color palette, typography, icons, shadows, images
├── hooks/                      # Custom hooks (useFetch, useLocation)
├── services/                   # Unified open API service (jobService.js)
├── utils/                      # Relative datetime, HTML sanitization, avatar initials
├── app.json                    # Expo project configuration
├── eas.json                    # EAS build profiles (APK preview & production)
└── package.json                # Project dependencies
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (tested on Node v20 and v24)
- **npm**: v9 or later
- **Expo Go App**: Download on your physical [Android device (Google Play)](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS device (App Store)](https://apps.apple.com/app/expo-go/id982107779).

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd rn-job-seach
npm install
```

> **Note**: No `.env` or API keys are required! The open APIs are ready to use immediately.

### 3. Running the Development Server

Start the Expo bundler:

```bash
npx expo start
```

Once the terminal displays the QR code:
- **Android**: Open the **Expo Go** app and scan the terminal QR code.
- **iOS**: Open the native **Camera** app, scan the QR code, and tap the prompt to open in Expo Go.
- **Web**: Press `w` in the terminal to view in your web browser.
- **Android Emulator**: Press `a` (requires Android Studio).
- **iOS Simulator**: Press `i` (requires macOS & Xcode).

---

## 📱 How to Build and Download the Standalone Android APK

You can build a standalone `.apk` directly in the cloud using **EAS Build** (Expo Application Services). No Android Studio, Java SDK, or high-end machine required.

### Step 1: Install EAS CLI
Install the official Expo Application Services CLI globally (or use via `npx`):

```bash
npm install -g eas-cli
```

### Step 2: Log In to Expo
Log in with your free Expo account (create one at [expo.dev](https://expo.dev) if you don't have one):

```bash
eas login
```

### Step 3: Link Project to EAS
Link this project to your Expo dashboard:

```bash
eas build:configure
```

Select **Android** when prompted. The project already includes the required [eas.json](file:///home/userland/projects/rn-job-seach/eas.json) configured for APK generation:

```json
{
  "cli": { "version": ">= 0.52.0" },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

### Step 4: Run the APK Cloud Build
Execute the build command targeting Android with the `preview` profile:

```bash
eas build -p android --profile preview
```

### Step 5: Download & Install the APK
1. EAS will build the APK on Expo's cloud build servers.
2. Once complete, the CLI will output:
   - A **QR Code** in your terminal: Scan it directly with your Android phone to download the `.apk` file.
   - A **Download Link**: Open the URL in any web browser to download the installable `.apk` file directly to your computer or phone.
3. On your Android phone, open the downloaded `.apk` file and tap **Install**.

---

### Alternative: Local APK Build (For machines with Android SDK)
If you have Android Studio, JDK 17, and the Android SDK installed locally, you can compile the APK locally:

```bash
# Generate the native android project folder
npx expo prebuild --platform android

# Compile release APK
cd android
./gradlew assembleRelease
```
The resulting APK will be saved at:
`android/app/build/outputs/apk/release/app-release.apk`

---

## 🌐 Deploying the Web Version

The application can also be compiled and deployed as a fast static web app:

### 1. Build Static Web Assets
```bash
npx expo export -p web
```
This generates optimized static files in the `dist/` directory.

### 2. Deploy to Hosting Platforms

#### Deploying to Vercel
```bash
npm install -g vercel
vercel dist --prod
```

#### Deploying to Netlify
```bash
npx netlify-cli deploy --dir=dist --prod
```

#### Deploying to GitHub Pages or Cloudflare Pages
Upload the contents of the `dist/` folder to your Cloudflare Pages project or branch designated for GitHub Pages.

---

## 📡 API Reference & Schema Normalization

The app uses a unified adapter in `services/jobService.js` that maps Remotive and Arbeitnow responses to a clean, standardized contract:

```typescript
interface NormalizedJob {
  job_id: string;                  // e.g. 'remotive-1680495' or 'arbeitnow-slug'
  employer_name: string;           // Company name
  employer_logo: string | null;    // Logo URL or fallback initials
  job_title: string;               // Job title
  job_employment_type: string;     // 'Full-time', 'Part-time', 'Contract', etc.
  job_location: string;            // 'Worldwide (Remote)' or city
  job_apply_link: string;          // Direct URL to application page
  job_description: string;         // Plain text sanitized paragraphs
  job_salary: string | null;       // Formatted salary string (e.g. '$50k - $70k')
  job_posted_at_timestamp: number; // Milliseconds timestamp
  job_posted_at_formatted: string; // Relative time (e.g. '12m ago', '2d ago')
  source: 'Remotive' | 'Arbeitnow';// Source provider
  tags: string[];                  // Associated tech stack tags
  is_remote: boolean;              // Remote role indicator
  job_highlights: {
    Qualifications: string[];      // Parsed requirements
    Responsibilities: string[];    // Parsed duties
  };
}
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
