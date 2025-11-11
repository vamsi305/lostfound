const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/universityLostFound')
    .then(async () => {
        console.log('Connected to database');
        
        const admin = await User.findOne({ email: 'admin@university.edu' });
        
        if (admin) {
            console.log('\n✅ Admin user found:');
            console.log('Name:', admin.name);
            console.log('Email:', admin.email);
            console.log('isAdmin:', admin.isAdmin);
            console.log('University:', admin.university);
        } else {
            console.log('\n❌ Admin user NOT FOUND');
        }
        
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error:', err);
        mongoose.connection.close();
    });
