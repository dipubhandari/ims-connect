import mongoose from "mongoose"

const User_Schema = new mongoose.Schema({
    userType:{type:String,required:true},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    qualification: { type: String, required: true },
    address: { type: String, default: 'England' },
    favouriteIdea: { type: Array },
    createdAt: { type: Date, default: Date.now() },
    status: { type: Boolean, default: false },
})

const User_Model = mongoose.model('User', User_Schema)

export default User_Model