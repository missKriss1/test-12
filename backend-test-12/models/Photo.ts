import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PhotoSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Fill in the title",
        },
    },
    image:{
        type: String,
        validate: {
            validator: async function (value: string): Promise<boolean> {
                return value.trim().length > 0;
            },
            message: "Fill in the photo",
        },
    }
})

const Photo = mongoose.model("Photo",PhotoSchema )

export default Photo