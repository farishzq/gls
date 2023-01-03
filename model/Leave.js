//model for Leave.js
import mongoose from 'mongoose';

const UserLeave = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email for this profile.'],
        maxlength: [80, 'Email cannot be more than 80 characters.'],
    },
    startDate: {
        type: Date,
        required: [true, 'Please provide a start date.'],
    },
    endDate: {
        type: Date,
        required: [true, 'Please provide an end date.'],
    },
    phone: {
        type: String,
    },
    leaveType: {
        type: String,
        required: [true, 'Please select your leave type.'],
    },
    remarks: {
        type: String,
        required: [true, 'Please provide any remarks such as reason of leave.'],
    },
    emergencyLeave: {
        type: Boolean,
        required: [true, 'Please select your leave type.'],
    },
    leavestatus: {
        type: String,
        defaultValue: 'Pending',
    }
},

{
    collection: 'users-leave'
}

);

export default mongoose.models.UserLeave || mongoose.model('UserLeave', UserLeave)

