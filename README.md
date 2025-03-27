# 🎬 MovieSearchApp
A React Native application that allows users to search for movies, view details, and save their favorites using AsyncStorage. The app integrates with the OMDb API to fetch movie details dynamically.

# 📌 Features
✅ Search Movies – Fetches movie data from the OMDb API in real-time
✅ Movie Details – Displays comprehensive movie information
✅ Add to Favorites – Save favorite movies locally using AsyncStorage
✅ Remove from Favorites – Manage your saved movies efficiently
✅ Dark Theme UI – Built with Tailwind CSS for a sleek and modern design

# 🚀 Tech Stack
React Native – Frontend framework

Expo (Managed Workflow) – Simplifies React Native development

AsyncStorage – Local storage for managing favorites

OMDb API – Fetches movie data

Tailwind CSS – UI styling with nativewind

# 🛠️ Installation & Setup
- 1️⃣ Clone the Repository
    - git clone https://github.com/apurvM790/MovieSearchApp.git
    - cd MovieSearchApp
- 2️⃣ Install Dependencies
    - npm install
- 3️⃣ Set Up Environment Variables
    - Create a .env file in the root directory and add your OMDb API key:
    - API_KEY=your_api_key_here
    - BASE_URL="https://www.omdbapi.com/"

- 4️⃣ Start the Application with Expo Go Run on Your Mobile Device:
  - Install Expo Go from the Play Store (Android) or App Store (iOS).
  - Start the development server:
  - expo start
  - Scan the QR code displayed in your terminal or Expo Developer Tools using the Expo Go app.
  - The app will launch on your phone instantly.


# 📌 Approach
- Implemented AsyncStorage for persistent local storage
- Used React Navigation for smooth transitions
- Environment variables managed using dotenv
- Optimized state management within functional components

# 🚧 Challenges & Future Improvements
- 🔹 Handling large datasets efficiently
- 🔹 Implementing a better caching mechanism
- 🔹 Enhancing UI animations for a smoother experience

