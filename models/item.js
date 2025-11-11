const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'ID/Cards', 'Keys', 'Bags', 'Accessories', 'Other']
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['lost', 'found'],
        lowercase: true
    },
    contactName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String
    },
    imageUrl: {
        type: String,
        default: '/images/placeholder.jpg'
    },
    resolved: {
        type: Boolean,
        default: false
    },
    university: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Add text index for search
itemSchema.index({ title: 'text', description: 'text', category: 'text', location: 'text' });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
