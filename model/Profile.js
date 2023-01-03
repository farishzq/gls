//model for Profile.js
import mongoose from 'mongoose';

const UserProfile = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email for this profile.'],
        maxlength: [80, 'Email cannot be more than 80 characters.'],
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this profile.'],
    },
    myKad: {
        type: String,
        required: [true, 'Please specify the mykad number with no dash.'],
        maxlength: [14, 'MyKad cannot be more than 14 characters.'],
    },
    phone: {
        type: String,
    },
    department: {
        type: String,
        required: [true, 'Please provide which department are you in.'],
    },
    role: {
        type: String,
        required: [true, 'Please provide your role.'],
    }
},

{
    collection: 'users-profile'
}

);

export default mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfile)

