# Whippet Puppy Blog

A beautiful and modern web application for showcasing whippet puppies, built with React, Tailwind CSS, and Firebase.

## Features

- 🐕 Beautiful puppy profiles with image galleries
- 📱 Fully responsive design
- 🖼️ Image upload functionality
- ✨ AI-generated puppy descriptions
- 🔄 Real-time updates
- 🎨 Modern UI with smooth animations
- 📊 Puppy growth tracking

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd whippet-puppy-blog
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a Firebase project and enable:
   - Firebase Authentication
   - Cloud Firestore
   - Storage

4. Create a `.env` file in the root directory and add your Firebase configuration:
\`\`\`env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
\`\`\`

5. Update the Firebase configuration in `src/config/firebase.js` with your environment variables.

## Development

Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Build

Create a production build:
\`\`\`bash
npm run build
\`\`\`

## Deployment

1. Build the project
2. Deploy to Firebase Hosting:
\`\`\`bash
firebase deploy
\`\`\`

## Project Structure

- `/src`
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/services` - Firebase and utility services
  - `/config` - Configuration files
  - `/assets` - Static assets

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 