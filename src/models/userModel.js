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
        enum: ['user', 'admin', 'employee']
    },
    phone: {
        type: Number
    },
    branch: {
        type: String,
        default:""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User;