const mongoose = require('mongoose');
const Item = require('./models/item');
const User = require('./models/user');

// Connect to MongoDB
main().then(() => {
    console.log("Connection successful");
    seedData();
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/universityLostFound');
}

// Sample data
const sampleItems = [
    {
        title: "Blue Backpack",
        description: "A navy blue backpack with a laptop compartment. Has a small tear on the front pocket and a keychain attached.",
        category: "Bags",
        location: "Main Library, 2nd Floor",
        date: new Date('2025-11-08'),
        status: "lost",
        contactName: "Sarah Johnson",
        contactEmail: "sarah.j@university.edu",
        contactPhone: "(555) 123-4567",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    },
    {
        title: "iPhone 13 Pro",
        description: "Black iPhone 13 Pro with a clear case. Has a small crack on the bottom right corner of the screen.",
        category: "Electronics",
        location: "Student Center Cafeteria",
        date: new Date('2025-11-09'),
        status: "found",
        contactName: "Mike Chen",
        contactEmail: "m.chen@university.edu",
        contactPhone: "(555) 234-5678",
        imageUrl: "https://images.unsplash.com/photo-1592286927505-4fb648e3c37f?w=400"
    },
    {
        title: "Student ID Card - John Smith",
        description: "Student ID card belonging to John Smith, ID number ending in 4523. Found near the gym.",
        category: "ID/Cards",
        location: "Recreation Center",
        date: new Date('2025-11-10'),
        status: "found",
        contactName: "Emily Davis",
        contactEmail: "e.davis@university.edu",
        imageUrl: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=400"
    },
    {
        title: "MacBook Pro Charger",
        description: "85W MagSafe 2 Power Adapter for MacBook Pro. Original Apple charger with slightly frayed cable.",
        category: "Electronics",
        location: "Engineering Building, Room 203",
        date: new Date('2025-11-07'),
        status: "lost",
        contactName: "David Park",
        contactEmail: "d.park@university.edu",
        contactPhone: "(555) 345-6789",
        imageUrl: "https://images.unsplash.com/photo-1591290619762-4b1e4d1e4a95?w=400"
    },
    {
        title: "Set of Keys with Blue Lanyard",
        description: "Key set with 4 keys on a blue university lanyard. Has a small flashlight keychain attached.",
        category: "Keys",
        location: "Parking Lot C",
        date: new Date('2025-11-11'),
        status: "found",
        contactName: "Lisa Martinez",
        contactEmail: "l.martinez@university.edu",
        imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400"
    },
    {
        title: "Calculus Textbook",
        description: "Calculus: Early Transcendentals, 8th Edition. Has name 'Alex' written on the inside cover.",
        category: "Books",
        location: "Mathematics Building, Lecture Hall 1",
        date: new Date('2025-11-06'),
        status: "lost",
        contactName: "Alex Thompson",
        contactEmail: "a.thompson@university.edu",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
    },
    {
        title: "Black North Face Jacket",
        description: "Men's black North Face jacket, size medium. Has a small stain on the left sleeve.",
        category: "Clothing",
        location: "Lecture Hall B",
        date: new Date('2025-11-09'),
        status: "found",
        contactName: "Jessica Lee",
        contactEmail: "j.lee@university.edu",
        contactPhone: "(555) 456-7890",
        imageUrl: "https://images.unsplash.com/photo-1544923246-77d2cba4d8e5?w=400"
    },
    {
        title: "AirPods Pro",
        description: "White AirPods Pro with charging case. Case has some scratches on it.",
        category: "Electronics",
        location: "Dining Hall",
        date: new Date('2025-11-10'),
        status: "lost",
        contactName: "Ryan Williams",
        contactEmail: "r.williams@university.edu",
        imageUrl: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400"
    }
];

async function seedData() {
    try {
        // Clear existing data
        await Item.deleteMany({});
        await User.deleteMany({});
        console.log("Cleared existing items and users");

        // Create sample users for different Indian universities
        const user1 = await User.create({
            name: "Rahul Sharma",
            email: "rahul@iitbombay.edu",
            password: "password123",
            university: "IIT Bombay",
            phone: "+91 98765 43210"
        });

        const user2 = await User.create({
            name: "Priya Patel",
            email: "priya@iitdelhi.edu",
            password: "password123",
            university: "IIT Delhi",
            phone: "+91 98765 43211"
        });

        const user3 = await User.create({
            name: "Arjun Kumar",
            email: "arjun@nittrichy.edu",
            password: "password123",
            university: "NIT Trichy",
            phone: "+91 98765 43212"
        });

        const user4 = await User.create({
            name: "Sneha Reddy",
            email: "sneha@iiithyderabad.edu",
            password: "password123",
            university: "IIIT Hyderabad",
            phone: "+91 98765 43213"
        });

        const user5 = await User.create({
            name: "Vikram Singh",
            email: "vikram@vit.edu",
            password: "password123",
            university: "Vellore Institute of Technology (VIT)",
            phone: "+91 98765 43214"
        });

        // Create admin user
        const adminUser = await User.create({
            name: "Admin User",
            email: "admin@university.edu",
            password: "admin123",
            university: "System Admin",
            phone: "+91 99999 99999",
            isAdmin: true
        });

        console.log("Created sample users");
        console.log("\n=== Login Credentials ===");
        console.log("\n🛡️  ADMIN ACCOUNT:");
        console.log("  admin@university.edu / admin123 (System Admin)");
        console.log("\n👤 REGULAR USERS:");
        console.log("  rahul@iitbombay.edu / password123 (IIT Bombay)");
        console.log("  priya@iitdelhi.edu / password123 (IIT Delhi)");
        console.log("  arjun@nittrichy.edu / password123 (NIT Trichy)");
        console.log("  sneha@iiithyderabad.edu / password123 (IIIT Hyderabad)");
        console.log("  vikram@vit.edu / password123 (VIT)");

        // Update sample items with Indian university and userId
        const iitBombayItems = sampleItems.slice(0, 2).map(item => ({
            ...item,
            university: "IIT Bombay",
            userId: user1._id,
            location: item.location.replace("Engineering Building", "Main Building").replace("Student Center", "SAC")
        }));

        const iitDelhiItems = sampleItems.slice(2, 4).map(item => ({
            ...item,
            university: "IIT Delhi",
            userId: user2._id,
            location: item.location.replace("Mathematics Building", "Bharti Building").replace("Recreation Center", "Sports Complex")
        }));

        const nitTrichyItems = sampleItems.slice(4, 6).map(item => ({
            ...item,
            university: "NIT Trichy",
            userId: user3._id,
            location: item.location.replace("Lecture Hall", "Central Library").replace("Parking Lot C", "Orion Hostel")
        }));

        const iiitHydItems = sampleItems.slice(6, 7).map(item => ({
            ...item,
            university: "IIIT Hyderabad",
            userId: user4._id,
            location: item.location.replace("Dining Hall", "Mess 1").replace("Lecture Hall B", "Academic Block")
        }));

        const vitItems = sampleItems.slice(7).map(item => ({
            ...item,
            university: "Vellore Institute of Technology (VIT)",
            userId: user5._id,
            location: item.location.replace("Dining Hall", "Gajendra Circle").replace("Lecture Hall B", "SJT")
        }));

        // Insert sample data
        await Item.insertMany([...iitBombayItems, ...iitDelhiItems, ...nitTrichyItems, ...iiitHydItems, ...vitItems]);
        console.log("Sample data inserted successfully!");
        console.log(`Added ${sampleItems.length} items to the database`);
        console.log(`  - ${iitBombayItems.length} items for IIT Bombay`);
        console.log(`  - ${iitDelhiItems.length} items for IIT Delhi`);
        console.log(`  - ${nitTrichyItems.length} items for NIT Trichy`);
        console.log(`  - ${iiitHydItems.length} items for IIIT Hyderabad`);
        console.log(`  - ${vitItems.length} items for VIT`);
        
        // Close connection
        mongoose.connection.close();
    } catch (err) {
        console.error("Error seeding data:", err);
        mongoose.connection.close();
    }
}
