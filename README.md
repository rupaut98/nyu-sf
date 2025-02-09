# Swiped-In: Reinventing Hiring with AI and Swipe-Based Matching

Swiped-In transforms job searching and hiring into an **interactive, AI-driven experience**. Inspired by swipe-based apps, we built a seamless matching platform where **job seekers** and **recruiters** connect effortlessly. This project was built for **HackNYU 2025** within an intense 1 day coding sprint. 🚀

## Inspiration
The hiring process is often slow, impersonal, and frustrating. We set out to create a **fast, intuitive, and engaging** way to match candidates with jobs—just like dating apps revolutionized relationships, we’re reimagining hiring.

## What It Does
- **Job Seekers**: Upload resumes, add key details, and swipe through job listings.
- **Recruiters**: Swipe through potential candidates, filtering the best fits.
- **Matching System**: A match occurs when both parties swipe right.
- **AI-Powered Screening**: The recruiter's **AI agent** conducts short, dynamic screening interviews.
- **Additional Features**:
  - Chat management for seamless communication.
  - Application tracking to monitor job progress.
  - Personalized job and candidate recommendations.

## How We Built It
- **Frontend**: React Native for a smooth, cross-platform mobile experience.
- **Backend**: Node.js with Express to handle API requests.
- **Database**: MongoDB Atlas for scalable, real-time data management.
- **AI Integration**: Google Gemini API for recruiter avatars & AI-powered screening interviews.
- **Authentication**: Secure login for job seekers and recruiters.
- **Hosting**: Cloud deployment for scalability.

## Challenges We Faced
- **AI Screening Integration**: Fine-tuning AI interview questions for different job roles.
- **Scalability**: Structuring MongoDB to handle job postings, resumes, matches, AI responses, and chat interactions efficiently.
- **Time Constraints**: Building a **fully functional** job-matching platform in under **18 hours**.

## Accomplishments We’re Proud Of
- **Built a working prototype in just 18 hours!** 🚀
- **Successfully integrated AI-powered recruiter interviews.**
- **Created a smooth, intuitive swipe-based job-matching experience.**
- **Used MongoDB Atlas for fast, scalable data handling.**
- **Secured the domain [swiped.in](http://swiped.in) for future expansion.**

## What We Learned
- **Power of AI in Hiring**: How AI can streamline recruitment and improve hiring efficiency.
- **MongoDB Atlas for Scalability**: Leveraging cloud databases for handling real-time data.
- **User Experience Matters**: Designing an intuitive job-matching system that feels natural.
- **Team Collaboration Under Pressure**: Building a complex project in a tight timeframe.

## What’s Next for Swiped-In
- **Enhancing AI Screening**: More sophisticated AI recruiter agents.
- **Smarter Matching Algorithms**: More personalized job and candidate recommendations.
- **Improved Application Tracking**: Data-driven career insights.
- **Monetization & Scaling**: Premium job postings, recruiter subscriptions.
- **Launch on App Stores**: Bringing Swiped-In to a global audience.

## How to Run the Project
### Prerequisites
- **Node.js** & **npm** installed
- **MongoDB Atlas** account
- **Google Gemini API key**

### Steps to Run Locally
```sh
# Clone the repository
git clone https://github.com/yourusername/swiped-in.git
cd swiped-in

# Install dependencies
npm install

# Set up environment variables (.env file)
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key

# Start the backend
npm run server

# Start the frontend
cd client
npm install
npm start
```

## Technologies Used
- **Frontend**: Next.js
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **AI**: Google Gemini API
- **Hosting**: Cloud-based deployment

---
**HackNYU 2025 Project** | Made with ❤️ by Team Swiped-In 🚀
