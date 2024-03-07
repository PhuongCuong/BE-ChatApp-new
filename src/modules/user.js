import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_online: {
        type: String,
        default: '0'
    },
    otp: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    exp_refresh_token: {
        type: Date
    }

},
    { timestamps: true }
)

const User = mongoose.model("User", userShema);

export default User;