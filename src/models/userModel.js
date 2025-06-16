import { mongoose } from "mongoose"

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin', 'superadmin']
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    branch: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User;