import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'User with this email address already exists'],
    },
    hash: String,
    salt: String,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    posts: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
            title: String,
            summary: String,
            category: String,
            slug: String,
            createdAt: Date,
            updatedAt: Date,
        },
    ],
    role: {
        type: String,
        enum: ['admin', 'editor', 'writer', 'user'],
        default: 'user',
        required: true,
    },
});

export default mongoose.model<IUser>('User', UserSchema);
