import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ApiError } from '../helper/ApiError.js'
import { insertUser, selectUserByEmail } from '../models/User.js'
const { sign } = jwt

const postRegistration =async(req, res, next) => {
    try {
        if(!req.body.email || req.body.email.length === 0) return next(new ApiError('Invalid email for user',400))
        if(!req.body.password || req.body.password.length < 8) return next(new ApiError('Invalid password for user',400))
        const hashedPassword = await hash(req.body.password,10)
        const userFromDb = await insertUser(req.body.email,hashedPassword)
        const user =userFromDb.rows[0]
        return res.status(201).json(createUserObject(user.id, user.email))
    } catch (error) {
        return next(error)
    }
}

const createUserObject = (id, email, token=undefined) => {
    return{
        'id':id,
        'email':email,
        ...(token !== undefined) && {'token':token}
    }
}

const postLogin =async(req,res,next) => {
    const invalid_credential_message = 'Invalid Credentials'
    try {
        const userFromDb = await selectUserByEmail(req.body.email)
        if (userFromDb.rowCount===0) return next (new ApiError(invalid_credential_message))
        
        const user = userFromDb.rows[0]
        if( !await compare(req.body.password, user.password)) return next (new ApiError(invalid_credential_message,401))
        
        const token = sign({ user: req.body.email }, process.env.JWT_SECRET_KEY, { algorithm: 'HS256' })
        return res.status(200).json(createUserObject(user.id, user.email, token))
    } catch (error) {
        return next(error)
    }
}

export { postLogin, postRegistration }
