const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    targetAmount: {
        type: Number,
        required: true,
        trim: true
    },
    contributedAmount: {
        type: Number,
        default: 0,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Middleware to update `updatedAt` before saving a document
GoalSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Goal', GoalSchema);
