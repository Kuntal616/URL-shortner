import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

export const findUserById = async (userId) => {
    return await User.findById(userId);
}
export const createUser = async ({name, email, password}) => {
    const user = new User({ name, email, password });
    return await user.save();
}


