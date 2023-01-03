//model for Ltypes.js
import mongoose from 'mongoose';

const UserLeaveTypes = new mongoose.Schema({
    email: {
        type: String,
    },
    annualElg: {
        type: Number,
        value: 12,
    },
    annualTkn: {
        type: Number,
        value: 0,
    },
    medicalElg: {
        type: Number,
        value: 18,
    },
    medicalTkn: {
        type: Number,
        value: 0,
    },
    hajjElg: {
        type: Number,
        value: 40,
    },
    hajjtkn: {
        type: Number,
        value: 0,
    },
    matrimonialElg: {
        type: Number,
        value: 90,
    },
    matrimonialTkn: {
        type: Number,
        value: 0,
    },
    paternityElg: {
        type: Number,
        value: 7,
    },
    paternityTkn: {
        type: Number,
        value: 0,
    },
    unrecordedElg: {
        type: Number,
        value: 7,
    },
    unrecordedTkn: {
        type: Number,
        value: 0,
    },
    hospitalizationElg: {
        type: Number,
        value: 60,
    },
    hospitalizationTkn: {
        type: Number,
        value: 0,
    }
},

{
    collection: 'leave-track'
}

);

export default mongoose.models.UserLeaveTypes || mongoose.model('UserLeaveTypes', UserLeaveTypes)

