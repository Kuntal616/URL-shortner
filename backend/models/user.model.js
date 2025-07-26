import mongoose from'mongoose';
// in mongodb one ducument has limited size of 16MB
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;
