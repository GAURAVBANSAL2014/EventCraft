import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        images: {
            type: [String],
            validate: {
                validator: function (v) {
                    return v.length <= 10;
                },
                message: 'An event can have a maximum of 5 images.',
            },
        },
        category: {
            type: String,
            required: true,
            enum: ['Music', 'Workshop', 'Festival', 'Health', 'Entertainment'],
        },
        location: {
            type: String,
            required: true,
            enum: ['Chandigarh', 'Mohali', 'Panchkula'],
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        organizerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
