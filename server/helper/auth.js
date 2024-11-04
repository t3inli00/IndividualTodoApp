import jwt from 'jsonwebtoken';


const authorizationRequired ="Authorization Required"
const invalidCredentials ="Invalid Credentials"

const auth =(req, res, next) =>{
    if(!req.headers.authorization){
        res.statusMessage = authorizationRequired
        res.status(401).json({ message: authorizationRequired })
    }else {
        try{
            //const token = req.headers.authorization
            const token = req.headers.authorization.startsWith('Bearer ')
                ? req.headers.authorization.split(' ')[1]
                : req.headers.authorization;
            // jwt.verify(token.process.env.JWT_SECRET_KEY)
            // next()
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.statusMessage = invalidCredentials;
                    return res.status(403).json({ message: invalidCredentials });
                }
                next();
            });
            
        } catch(err) {           
            res.statusMessage =invalidCredentials
            res.status(403).json({message : invalidCredentials})
        }
    }
}

export { auth };
