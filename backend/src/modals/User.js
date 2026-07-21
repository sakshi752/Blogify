import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // index:true for searching
    },
    usernameChangeCount: {
        type: Number,
        default: 0
    },
    usernameChangeWeekStart: {
        type: Date,
        default: null
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    bio: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    avatar: {
        url: {
            type: String,
            default: ""
        },

        publicId: {
            type: String,
            default: ""
        }
    },
    followersCount: {
        type: Number,
        default: 0
    },
    followingCount: {
        type: Number,
        default: 0
    },
    blogsCount: {
        type: Number,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isDeactivate:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],

    likedBlogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
}, {
    timestamps: true
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// access token are short lived and refreh token are long lived
// Access Token expires
//         ↓
// Frontend sends Refresh Token
//         ↓
// Backend verifies Refresh Token
//         ↓
// Backend generates new Access Token
//         ↓
// User continues using the app

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_SECRET
        }
    )
}

const User = mongoose.model('User', userSchema);

export default User;