# Trizen - Product Landing Page with Search Autosuggest

A full-stack MERN application featuring a product landing page with real-time search autosuggest functionality, similar to e-commerce platforms like Amazon/Flipkart.

## 🚀 Features

### Frontend (React + Tailwind CSS)
- **Header with Search Bar**: Real-time autosuggest dropdown showing up to 5 product suggestions
- **Hero Section**: Attractive banner with call-to-action buttons
- **Products Grid**: Displays 10-20 products with:
  - Product images
  - Product names
  - Prices
  - Star ratings (⭐)
  - Hover effects (scale and shadow)
- **Filters Section**: Category-based filtering
- **Responsive Design**: Optimized for Desktop, Tablet, and Mobile devices

### Backend (Node.js + Express + MongoDB)
- **Products API**: `GET /api/products` - Returns all products from MongoDB
- **Search API**: `GET /api/search?q=term` - Returns up to 5 matching products (case-insensitive, partial match)
- **Database Seeding**: Endpoint to populate database with sample products

## 📁 Project Structure

```
Trizen/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ProductsGrid.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Filters.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   Create a `.env` file in the `backend` directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/trizen
   ```
   For MongoDB Atlas, use your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trizen
   ```

4. **Start MongoDB:**
   - If using local MongoDB, ensure MongoDB service is running
   - If using MongoDB Atlas, your connection string is already configured

5. **Seed the database:**
   Start the server and make a POST request to seed the database:
   ```bash
   npm start
   ```
   Then in another terminal or using a tool like Postman:
   ```bash
   curl -X POST http://localhost:5000/api/seed
   ```
   Or visit: `http://localhost:5000/api/seed` in your browser

6. **Start the backend server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (optional):**
   Create a `.env` file in the `frontend` directory if your backend runs on a different URL:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   (This is the default, so you can skip this step if using the default)

4. **Start the development server:**
   ```bash
   npm start
   ```
   The app will open in your browser at `http://localhost:3000`

## 🎯 API Endpoints

### Get All Products
```
GET /api/products
```
Returns: Array of all products

### Search Products
```
GET /api/search?q=search_term
```
Parameters:
- `q` (query string): Search term
- Returns: Array of up to 5 matching products (case-insensitive, partial match)

### Seed Database
```
POST /api/seed
```
Populates the database with 20 sample products

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2-3 columns)
- **Desktop**: > 1024px (4 columns)

## 🎨 Technologies Used

### Frontend
- React 18.2.0
- Tailwind CSS 3.3.6
- Axios 1.6.2

### Backend
- Node.js
- Express 4.18.2
- MongoDB with Mongoose 8.0.3
- CORS 2.8.5

## 🔍 Features in Detail

### Search Autosuggest
- Debounced search (300ms delay)
- Shows up to 5 suggestions
- Click to select suggestion
- Case-insensitive partial matching
- Click outside to close dropdown

### Product Cards
- Hover scale effect (105% scale)
- Shadow enhancement on hover
- Star rating display
- Category badges
- Responsive image loading with fallback

### Filters
- Category dropdown filter
- Dynamic category list from products
- Product count display

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB connection is configured
3. Deploy to platforms like Heroku, Railway, or Render

### Frontend Deployment
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

## 📝 Notes

- Make sure MongoDB is running before starting the backend
- The search API returns a maximum of 5 results for autosuggest
- Product images use Unsplash placeholder URLs
- All prices are in Indian Rupees (₹)

## 👨‍💻 Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## 📄 License

This project is created as part of a MERN Stack Developer Intern assignment.
