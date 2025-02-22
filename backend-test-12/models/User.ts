import mongoose, {HydratedDocument, Model} from "mongoose";
import bcrypt from "bcrypt";
import {randomUUID} from "node:crypto";
import {UsersFiled} from "../types";

interface UserMethod{
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void
}

type UserModal = Model<UsersFiled, {}, UserMethod>

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema<
    HydratedDocument<UsersFiled>,
    UserModal,
    UserMethod
>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate:[ {
            validator : async function (this: HydratedDocument<UsersFiled>,value: string): Promise<boolean> {
                if(!this.isModified('Email')) return true;
                const user:UsersFiled | null = await User.findOne({email: value});
                return !user;
            },
            message: 'This email is already taken'
        },
            {
                validator: function (value: string): boolean {
                    return value.trim().length > 0;
                },
                message: "Fill in the email",
            },
        ]
    },
    password: {
        type: String,
        validate: [
            {
                validator: async function (value: string): Promise<boolean> {
                    return value === value.trim();
                },
                message: "The password must not contain spaces."
            },
            {
                validator: async function (value: string): Promise<boolean> {
                    return value.trim().length > 0;
                },
                message: "Fill in the password.",
            },
        ],
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    token:{
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    googleId: String,
    avatar: {
        type: String,
        default: null,
    }
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
})

userSchema.methods.checkPassword = function (password:string) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function (){
    this.token = randomUUID();
}

userSchema.set("toJSON", {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
})

const User = mongoose.model("User", userSchema)

export default User