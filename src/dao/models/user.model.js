import { model, Schema } from "mongoose";

const userCollection = 'users';

const userSchema = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    rol: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        require: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        default: null, 
        ref: 'carts'
    }
})

export const UserModel = model(userCollection, userSchema)