import Employer_Model from "../model/employer.js"
import User_Model from "../model/User.js"

// functin to fetch user from db based on id 
const findUser = async (field, id) => {
    const user = await (User_Model.findOne({ [field]: id }) || Employer_Model.findOne({ [field]: id }))
    console.log(user)
    return user
}

export { findUser } 