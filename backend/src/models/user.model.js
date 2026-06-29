import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Name is true"],
            trim: true,
            minlength: 3,
            maxlength: 40
        },
        email: {
            type: String,
            require: [true, "Email is true"],
            trim: true,
            unque: true,
            lowercase: true,
            validator: [validator.isEmail, "please enter your email"]
        },
        password: {
            type: String,
            require: true,
            default: "",
            minlength: 5
        },
        avatar: {
            type: String,
            default: "",
        },

    }, {
    timestamps: true
})



const User = mongoose.model("User", userSchema);
export default User;
