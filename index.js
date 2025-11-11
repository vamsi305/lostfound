const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const multer = require("multer");
const Item = require("./models/item");
const User = require("./models/user");
const universities = require("./config/universities");
const universityImages = require("./config/universityImages");

// Connect to MongoDB
main().then(() => {
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/universityLostFound');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files (JPEG, JPG, PNG, GIF) are allowed!'));
        }
    }
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session middleware
app.use(session({
    secret: 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/universityLostFound'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

// Make user and university available to all views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.currentUniversity = req.session.university || null;
    next();
});

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// University selection middleware
function hasSelectedUniversity(req, res, next) {
    if (req.session.university) {
        return next();
    }
    res.redirect('/select-university');
}

// Admin middleware
function isAdmin(req, res, next) {
    console.log('isAdmin check - User:', req.session.user?.name, 'isAdmin:', req.session.user?.isAdmin);
    if (req.session.user && req.session.user.isAdmin) {
        return next();
    }
    console.log('Access denied - not admin');
    res.status(403).send('Access denied. Admin privileges required.');
}

// ===== AUTHENTICATION ROUTES =====

// Landing page - redirects to login or university selection
app.get("/", (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    // Redirect admins directly to admin panel
    if (req.session.user.isAdmin) {
        return res.redirect('/admin');
    }
    if (!req.session.university) {
        return res.redirect('/select-university');
    }
    res.redirect('/dashboard');
});

// Register page
app.get("/register", (req, res) => {
    if (req.session.user) {
        return res.redirect('/select-university');
    }
    res.render("register", { error: null });
});

// Register POST
app.post("/register", async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        
        // Validation
        if (password !== confirmPassword) {
            return res.render("register", { error: "Passwords do not match" });
        }
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("register", { error: "Email already registered" });
        }
        
        // Create new user (password will be hashed by the pre-save hook)
        const newUser = new User({
            name,
            email,
            password,
            phone,
            university: "pending" // Will be set after university selection
        });
        
        await newUser.save();
        
        // Set session
        req.session.user = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        };
        
        res.redirect('/select-university');
    } catch (err) {
        console.error(err);
        res.render("register", { error: "Registration failed. Please try again." });
    }
});

// Login page
app.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect('/select-university');
    }
    res.render("login", { error: null });
});

// Login POST
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', email);
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.render("login", { error: "Invalid email or password" });
        }
        console.log('User found:', user.name, 'isAdmin:', user.isAdmin);
        
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render("login", { error: "Invalid email or password" });
        }
        
        // Set session
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            university: user.university,
            isAdmin: user.isAdmin
        };
        
        // Save session before redirect
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.render("login", { error: "Login failed. Please try again." });
            }
            
            console.log('Session saved. User isAdmin:', user.isAdmin);
            
            // Redirect admins to admin panel
            if (user.isAdmin) {
                console.log('Redirecting admin to /admin');
                return res.redirect('/admin');
            }
            
            console.log('Redirecting regular user to /select-university');
            res.redirect('/select-university');
        });
    } catch (err) {
        console.error(err);
        res.render("login", { error: "Login failed. Please try again." });
    }
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});

// University selection page
app.get("/select-university", isAuthenticated, (req, res) => {
    try {
        // Redirect admins to admin panel, they don't need to select university
        if (req.session.user.isAdmin) {
            return res.redirect('/admin');
        }
        
        console.log('GET /select-university - User:', req.session.user?.username);
        console.log('Universities count:', universities.length);
        console.log('University images count:', Object.keys(universityImages).length);
        res.render("select-university", { universities, universityImages });
    } catch (error) {
        console.error('Error in /select-university GET:', error);
        res.status(500).send('Error loading university selection page: ' + error.message);
    }
});

// University selection POST
app.post("/select-university", isAuthenticated, async (req, res) => {
    try {
        const { university } = req.body;
        
        if (!university || !universities.includes(university)) {
            return res.render("select-university", { 
                universities,
                universityImages,
                error: "Please select a valid university" 
            });
        }
        
        // Update user's university if it was "pending"
        await User.findByIdAndUpdate(req.session.user.id, { university });
        
        // Set university in session
        req.session.university = university;
        req.session.user.university = university;
        
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render("select-university", { 
            universities,
            universityImages,
            error: "Failed to select university" 
        });
    }
});

// Change university
app.get("/change-university", isAuthenticated, (req, res) => {
    req.session.university = null;
    res.redirect('/select-university');
});

// ===== MAIN APPLICATION ROUTES =====

// Dashboard - Show recent items from selected university
app.get("/dashboard", isAuthenticated, hasSelectedUniversity, async (req, res) => {
    try {
        const university = req.session.university;
        const lostItems = await Item.find({ 
            status: 'lost', 
            resolved: false,
            university: university
        }).sort({ createdAt: -1 }).limit(6);
        
        const foundItems = await Item.find({ 
            status: 'found', 
            resolved: false,
            university: university
        }).sort({ createdAt: -1 }).limit(6);
        
        res.render("index", { lostItems, foundItems });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading items");
    }
});

// View all lost items
app.get("/lost", isAuthenticated, hasSelectedUniversity, async (req, res) => {
    try {
        const items = await Item.find({ 
            status: 'lost', 
            resolved: false,
            university: req.session.university
        }).sort({ createdAt: -1 });
        res.render("items", { items, type: "Lost" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading items");
    }
});

// View all found items
app.get("/found", isAuthenticated, hasSelectedUniversity, async (req, res) => {
    try {
        const items = await Item.find({ 
            status: 'found', 
            resolved: false,
            university: req.session.university
        }).sort({ createdAt: -1 });
        res.render("items", { items, type: "Found" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading items");
    }
});

// Show form to report lost item
app.get("/report/lost", isAuthenticated, hasSelectedUniversity, (req, res) => {
    res.render("report", { type: "lost" });
});

// Show form to report found item
app.get("/report/found", isAuthenticated, hasSelectedUniversity, (req, res) => {
    res.render("report", { type: "found" });
});

// Submit new item
app.post("/report", isAuthenticated, hasSelectedUniversity, upload.single('image'), async (req, res) => {
    try {
        // Use uploaded file path or external URL or placeholder
        let imageUrl = '/images/placeholder.jpg';
        
        if (req.file) {
            // File was uploaded
            imageUrl = '/uploads/' + req.file.filename;
        } else if (req.body.imageUrl && req.body.imageUrl.trim() !== '') {
            // External URL provided
            imageUrl = req.body.imageUrl;
        }
        
        const newItem = new Item({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            location: req.body.location,
            date: req.body.date,
            status: req.body.status,
            contactName: req.body.contactName,
            contactEmail: req.body.contactEmail,
            contactPhone: req.body.contactPhone,
            imageUrl: imageUrl,
            university: req.session.university,
            userId: req.session.user.id
        });
        
        await newItem.save();
        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        if (err.message && err.message.includes('Only image files')) {
            res.status(400).send("Error: " + err.message);
        } else {
            res.status(500).send("Error saving item");
        }
    }
});

// View single item details
app.get("/item/:id", isAuthenticated, hasSelectedUniversity, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send("Item not found");
        }
        // Check if item belongs to selected university
        if (item.university !== req.session.university) {
            return res.status(403).send("Access denied");
        }
        res.render("details", { item });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading item");
    }
});

// Mark item as resolved
app.post("/item/:id/resolve", isAuthenticated, hasSelectedUniversity, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send("Item not found");
        }
        // Only item owner can resolve
        if (item.userId.toString() !== req.session.user.id) {
            return res.status(403).send("Access denied");
        }
        await Item.findByIdAndUpdate(req.params.id, { resolved: true });
        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating item");
    }
});

// Search items
app.get("/search", isAuthenticated, hasSelectedUniversity, async (req, res) => {
    try {
        const query = req.query.q;
        const category = req.query.category;
        const status = req.query.status;
        
        let searchQuery = { 
            resolved: false,
            university: req.session.university
        };
        
        if (query) {
            searchQuery.$text = { $search: query };
        }
        if (category && category !== 'All') {
            searchQuery.category = category;
        }
        if (status && status !== 'all') {
            searchQuery.status = status;
        }
        
        const items = await Item.find(searchQuery).sort({ createdAt: -1 });
        res.render("search", { items, query: query || '', category: category || 'All', status: status || 'all' });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error searching items");
    }
});

// My items page
app.get("/my-items", isAuthenticated, hasSelectedUniversity, async (req, res) => {
    try {
        const items = await Item.find({ 
            userId: req.session.user.id,
            university: req.session.university
        }).sort({ createdAt: -1 });
        res.render("my-items", { items });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading items");
    }
});

// Delete item (only owner can delete)
app.delete("/item/:id", isAuthenticated, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        if (item.userId.toString() !== req.session.user.id) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        await Item.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

// ===== ADMIN ROUTES =====

// Test route
app.get("/test-admin", (req, res) => {
    res.send("Admin routes section is working! Session: " + JSON.stringify(req.session.user));
});

// Admin Dashboard
app.get("/admin", isAuthenticated, isAdmin, async (req, res) => {
    try {
        console.log('Admin dashboard accessed by:', req.session.user?.name, 'isAdmin:', req.session.user?.isAdmin);
        const totalUsers = await User.countDocuments();
        const totalItems = await Item.countDocuments();
        const lostItems = await Item.countDocuments({ type: 'lost' });
        const foundItems = await Item.countDocuments({ type: 'found' });
        
        const recentItems = await Item.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'name email');
        
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(10);
        
        const itemsByUniversity = await Item.aggregate([
            { $group: { _id: '$university', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        
        res.render("admin/dashboard", {
            totalUsers,
            totalItems,
            lostItems,
            foundItems,
            recentItems,
            recentUsers,
            itemsByUniversity
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading admin dashboard");
    }
});

// Admin - All Users
app.get("/admin/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.render("admin/users", { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading users");
    }
});

// Admin - Delete User
app.delete("/admin/user/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
        // Don't allow deleting yourself
        if (req.params.id === req.session.user.id) {
            return res.status(400).json({ success: false, message: "Cannot delete your own account" });
        }
        
        // Delete user and their items
        await User.findByIdAndDelete(req.params.id);
        await Item.deleteMany({ userId: req.params.id });
        
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error deleting user" });
    }
});

// Admin - All Items
app.get("/admin/items", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const items = await Item.find()
            .sort({ createdAt: -1 })
            .populate('userId', 'name email');
        res.render("admin/items", { items });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading items");
    }
});

// Admin - Delete Item
app.delete("/admin/item/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error deleting item" });
    }
});

// Admin - Toggle User Admin Status
app.post("/admin/user/:id/toggle-admin", isAuthenticated, isAdmin, async (req, res) => {
    try {
        // Don't allow removing your own admin status
        if (req.params.id === req.session.user.id) {
            return res.status(400).json({ success: false, message: "Cannot modify your own admin status" });
        }
        
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        user.isAdmin = !user.isAdmin;
        await user.save();
        
        res.json({ success: true, isAdmin: user.isAdmin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error updating user" });
    }
});

app.listen(8080, () => console.log("Server is running on http://localhost:8080"));

