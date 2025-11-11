# University Lost & Found Website 🎓

A full-featured lost and found web application built for university students to report and search for lost or found items on campus.

## Features ✨

### 🔐 Authentication & Security
- **User Registration**: Create an account with email and password
- **Secure Login**: Password encryption using bcrypt
- **Session Management**: Persistent login sessions with MongoDB store
- **University Selection**: Choose your university to access campus-specific items

### 🎓 University-Based System
- **Multi-University Support**: 20+ universities available
- **Campus Isolation**: Only see items from your selected university
- **Easy Switching**: Change universities anytime from the dashboard
- **University Badge**: Always know which campus you're viewing

### 📱 Core Features
- **Report Lost Items**: Students can report items they've lost with detailed descriptions
- **Report Found Items**: Students can report items they've found to help reunite them with owners
- **Search Functionality**: Advanced search with text queries, category filters, and status filters
- **Item Categories**: Electronics, Clothing, Books, ID/Cards, Keys, Bags, Accessories, and Other
- **Contact Information**: Each item includes contact details to facilitate returns
- **Mark as Resolved**: Item owners can mark items as resolved once returned
- **My Items Page**: View and manage all items you've reported
- **Item Ownership**: Only item owners can edit or delete their listings
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Modern UI**: Clean, university-themed interface with easy navigation

## Technology Stack 🛠️

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Express-session with bcryptjs password hashing
- **Session Store**: Connect-mongo for MongoDB session storage
- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: Custom CSS with modern design principles

## Installation 📦

1. **Clone or navigate to the project directory**
   ```bash
   cd c:\Users\vamsi\OneDrive\Desktop\mongoDB
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**
   - Make sure MongoDB is installed and running on `mongodb://127.0.0.1:27017`
   - The application will create a database named `universityLostFound`

4. **Seed the database with sample data** (Optional but recommended)
   ```bash
   node seed.js
   ```
   This will create:
   - 2 sample users (john@harvard.edu and jane@stanford.edu)
   - 8 sample lost/found items across 2 universities
   - Login password for both users: `password123`

5. **Start the server**
   ```bash
   npm start
   ```

6. **Access the application**
   - Open your browser and go to: `http://localhost:8080`
   - You'll be redirected to the login page
   - Register a new account or use sample credentials

## Project Structure 📁

```
mongoDB/
├── models/
│   └── item.js              # MongoDB schema for lost/found items
├── views/
│   ├── partials/
│   │   ├── header.ejs       # Navigation header
│   │   └── footer.ejs       # Footer component
│   ├── index.ejs            # Home page
│   ├── items.ejs            # List of items (lost/found)
│   ├── details.ejs          # Single item details
│   ├── report.ejs           # Report lost/found item form
│   └── search.ejs           # Search results page
├── public/
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   └── images/
│       └── placeholder.jpg  # Placeholder image
├── index.js                 # Main server file
├── package.json             # Project dependencies
└── README.md               # This file
```

## Usage Guide 📖

### Getting Started:
1. **Register**: Create an account with your email and password
2. **Select University**: Choose your university from the dropdown list
3. **Browse Items**: View lost and found items from your campus
4. **Search**: Use the search bar to find specific items
5. **Report Items**: Help reunite students with their belongings

### For Users Who Lost Items:
1. Login and select your university
2. Click "Report Lost Item" on the dashboard
3. Fill in the form with item details (title, description, category, location, date)
4. Your contact information is auto-filled from your profile
5. Submit the report
6. Your item will appear in the "Lost Items" section
7. View your items anytime on the "My Items" page

### For Users Who Found Items:
1. Login and select your university
2. Click "Report Found Item" on the dashboard
3. Fill in the form with item details
4. Your contact information is auto-filled
5. Submit the report
6. The owner can now search and find your listing

### Searching for Items:
1. Use the search bar on the dashboard
2. Filter by category and status (lost/found)
3. Click "View Details" to see full information and contact details
4. Contact the person via email or phone to arrange return

### Managing Your Items:
1. Go to "My Items" in the navigation
2. View all items you've reported
3. Mark items as "Resolved" when returned to owner
4. Delete items you no longer need to track

## API Routes 🛣️

### Authentication Routes
- `GET /` - Landing page (redirects to login or dashboard)
- `GET /register` - Registration page
- `POST /register` - Create new account
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Logout and destroy session
- `GET /select-university` - University selection page
- `POST /select-university` - Set university for session
- `GET /change-university` - Change university

### Application Routes (All require authentication)
- `GET /dashboard` - Home page with recent items from selected university
- `GET /lost` - All lost items from selected university
- `GET /found` - All found items from selected university
- `GET /my-items` - View all items reported by current user
- `GET /report/lost` - Form to report lost item
- `GET /report/found` - Form to report found item
- `POST /report` - Submit new item
- `GET /item/:id` - View single item details
- `POST /item/:id/resolve` - Mark item as resolved (owner only)
- `DELETE /item/:id` - Delete item (owner only)
- `GET /search` - Search items with filters

## Database Schema 💾

Each item in the database contains:
- **title**: Item name
- **description**: Detailed description
- **category**: Item category (Electronics, Clothing, etc.)
- **location**: Where the item was lost/found
- **date**: Date when lost/found
- **status**: "lost" or "found"
- **contactName**: Person's name
- **contactEmail**: Email address
- **contactPhone**: Phone number (optional)
- **imageUrl**: Image URL (optional)
- **resolved**: Boolean indicating if item was returned
- **timestamps**: Created and updated dates

## Customization 🎨

### Change Colors:
Edit the CSS variables in `public/css/style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    /* ... more colors */
}
```

### Add More Categories:
Update the category enum in `models/item.js` and the forms in `views/report.ejs`

### Change Database:
Update the MongoDB connection string in `index.js`

## Future Enhancements 💡

- User authentication and profiles
- Image upload functionality
- Email notifications
- Admin dashboard
- Statistics and analytics
- Chat/messaging system
- Mobile app version

## Troubleshooting 🔧

**MongoDB Connection Error:**
- Ensure MongoDB is installed and running
- Check the connection string in `index.js`

**Port Already in Use:**
- Change the port number in `index.js` (default: 8080)

**Styles Not Loading:**
- Check that the `public` folder is being served correctly
- Clear your browser cache

---

Built with ❤️ for university students
