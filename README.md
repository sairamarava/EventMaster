# Event Manager - Premium Event Management Application

A modern, premium-quality event management application built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Premium UI/UX**: Glassmorphism design with smooth animations
- **Event Management**: Create, edit, and delete events
- **Admin Dashboard**: Secure admin access with authentication
- **Responsive Design**: Works seamlessly on all devices
- **Image Upload**: Support for event images
- **Real-time Updates**: Dynamic event status and filtering

## 🛠️ Tech Stack

### Frontend

- React 19 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API calls

### Backend

- Node.js with Express
- MongoDB with Mongoose
- Multer for file uploads
- CORS enabled

## 📦 Installation & Development

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd event-manager
   ```

2. **Install dependencies**

   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   Create `.env` file in the `backend` directory:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```

4. **Run the application**

   ```bash
   # Start backend (from backend directory)
   cd backend && npm run dev

   # Start frontend (from frontend directory)
   cd frontend && npm run dev
   ```

## 🌐 Deployment

This application is configured for deployment on Vercel.

### Deployment Steps

1. **Prepare for deployment**

   ```bash
   # Build the frontend
   npm run build
   ```

2. **Environment Variables**
   Set these environment variables in your deployment platform:

   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   NODE_ENV=production
   ```

3. **Deploy to Vercel**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel --prod
   ```

### Vercel Configuration

The project includes a `vercel.json` file with the following configuration:

- Backend API routes are handled by the Node.js serverless function
- Frontend static files are served from the build directory
- All non-API routes are redirected to the React app

### Important Notes

- The application automatically detects the environment and uses appropriate API endpoints
- In development: `http://localhost:5000/api`
- In production: `/api`
- Make sure your MongoDB Atlas allows connections from all IPs for production deployment

## 🔐 Admin Access

Default admin credentials:

- Username: `admin`
- Password: `password`

## 📁 Project Structure

```
event-manager/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── dist/ (build output)
├── package.json (root)
├── vercel.json
└── README.md
```

## 🎨 Design Features

- **Premium Glassmorphism**: Modern glass-like UI components
- **Dark Theme**: Professional dark color scheme with orange accents
- **Smooth Animations**: Framer Motion powered interactions
- **Space Grotesk Font**: Modern typography
- **Responsive Grid**: Adaptive layout for all screen sizes

## 🚀 Performance

- **Optimized Build**: Vite for fast builds and hot reloading
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Proper image handling and fallbacks
- **API Caching**: Efficient data fetching strategies

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern SaaS applications
- UI/UX patterns from leading design systems
- Community feedback and contributions
