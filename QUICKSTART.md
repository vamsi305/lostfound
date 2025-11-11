# 🎓 University Lost & Found - Quick Start Guide

## 🚀 Server Status

✅ **Server is RUNNING on http://localhost:8080**

## 📝 Sample Login Credentials

Use these credentials to test the application:

### Harvard University Account
- **Email**: john@harvard.edu
- **Password**: password123
- **University**: Harvard University
- **Items**: 4 lost/found items

### Stanford University Account
- **Email**: jane@stanford.edu
- **Password**: password123
- **University**: Stanford University
- **Items**: 4 lost/found items

## 🔄 Authentication Flow

### Step 1: Register or Login
1. Open http://localhost:8080 in your browser
2. You'll be redirected to the login page
3. Options:
   - **Login** with sample credentials above
   - **Register** a new account (Click "Register here" link)

### Step 2: Select University
After logging in, you'll be directed to select your university:
1. Choose from 20+ available universities
2. Your university badge will appear in the navigation
3. You'll only see items from your selected university

### Step 3: Access Dashboard
Once you've selected a university:
- View recent lost and found items from your campus
- Search for specific items
- Report lost or found items
- Manage your reported items

## 🎯 Key Features

### 🔐 Authentication System
- ✅ Secure user registration with password encryption
- ✅ Session-based login (stays logged in for 24 hours)
- ✅ Protected routes (must be logged in to access)
- ✅ User profile information in navigation

### 🎓 University System
- ✅ Multi-university support (20+ universities)
- ✅ University-specific item filtering
- ✅ Easy university switching
- ✅ Campus isolation (only see items from your university)

### 📱 Lost & Found Features
- ✅ Report lost items
- ✅ Report found items
- ✅ Search with advanced filters
- ✅ View item details with contact info
- ✅ Mark items as resolved
- ✅ Delete your own items
- ✅ "My Items" page to manage your reports

## 📍 Available Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Require Login)
- `/select-university` - Choose your university
- `/dashboard` - Home page with recent items
- `/lost` - All lost items from your university
- `/found` - All found items from your university
- `/my-items` - Your reported items
- `/report/lost` - Report a lost item
- `/report/found` - Report a found item
- `/item/:id` - View item details
- `/search` - Search for items
- `/change-university` - Switch to different university
- `/logout` - Logout

## 🎨 User Interface

### Navigation Bar
- University badge showing current campus
- User name display
- Quick access to all features
- Logout button

### Dashboard
- Recent lost items (max 6)
- Recent found items (max 6)
- Search bar with filters
- Quick action buttons

### My Items Page
- View all your reported items
- See resolved/active status
- Delete items you've created
- Mark items as resolved

## 🔧 Testing Scenarios

### Scenario 1: Report a Lost Item
1. Login with john@harvard.edu / password123
2. Select Harvard University
3. Click "Report Lost Item"
4. Fill in details (phone, laptop, etc.)
5. Submit
6. View in "My Items" or "Lost Items"

### Scenario 2: Search for an Item
1. Login and select university
2. Use search bar on dashboard
3. Filter by category (Electronics, Books, etc.)
4. Filter by status (Lost/Found)
5. Click "View Details" to see contact info

### Scenario 3: University Isolation
1. Login as john@harvard.edu (Harvard)
2. Note the items displayed
3. Logout
4. Login as jane@stanford.edu (Stanford)
5. Note different items displayed
6. Each university only sees their own items

### Scenario 4: Item Ownership
1. Login and report an item
2. Go to "My Items"
3. Try to mark as resolved (✅ allowed - you own it)
4. Try to delete (✅ allowed - you own it)
5. View someone else's item details
6. Try to resolve/delete (❌ not allowed - not your item)

## 🏫 Available Universities

1. Harvard University
2. Stanford University
3. Massachusetts Institute of Technology (MIT)
4. University of California, Berkeley
5. Yale University
6. Princeton University
7. Columbia University
8. University of Chicago
9. University of Pennsylvania
10. Cornell University
11. University of Michigan
12. Johns Hopkins University
13. Northwestern University
14. Duke University
15. University of California, Los Angeles (UCLA)
16. New York University
17. University of Texas at Austin
18. University of Washington
19. Carnegie Mellon University
20. Boston University

## 💡 Tips

- **Change University**: Click "Change University" in navigation
- **Stay Logged In**: Sessions last 24 hours
- **Contact Info**: Auto-filled from your profile
- **Item Status**: Green badge = Found, Red badge = Lost
- **Search**: Use keywords like "phone", "blue backpack", "library"
- **Filters**: Combine text search with category and status filters

## 🐛 Troubleshooting

**Can't login?**
- Check credentials are correct
- Ensure MongoDB is running

**No items showing?**
- Make sure you've selected a university
- Check you're viewing the correct status (Lost/Found)
- Run `node seed.js` to add sample data

**Session expired?**
- Sessions last 24 hours
- Just login again

**Can't delete item?**
- Only item owners can delete
- Make sure you're logged in as the item creator

## 📞 Sample Data Details

The seed data includes:
- **Harvard Items**: Blue Backpack, MacBook Charger, Calculus Textbook, AirPods Pro
- **Stanford Items**: iPhone 13, Student ID, Keys, North Face Jacket

All items have realistic descriptions, locations, and contact information.

## 🎉 You're All Set!

Open **http://localhost:8080** and start exploring!

Try logging in with both sample accounts to see how university isolation works.
