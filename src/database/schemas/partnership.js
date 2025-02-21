const mongoose = require('mongoose');
const { encrypt } = require('../../utils/crypto');

const partnershipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    }, 
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['new', 'on going', 'closed'],
        default: 'new'
    },
    attachment: [String],
    created: {
        at: {
            type: Date,
            default: Date.now
        },
        by: String,
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    start_date: Date,
    end_date: Date
});

partnershipSchema.pre('save', function(next) {
    if (this.isModified('created.by')) {
        this.created.by = encrypt(this.created.by);
    }
    next();
});

module.exports = mongoose.model('Partnership', partnershipSchema);