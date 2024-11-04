import { Router } from 'express';
import { postLogin, postRegistration } from '../controllers/UserController.js';
//import { pool } from '../helper/db.js';
//const { sign } =jwt
const router = Router()


//add account details
router.post('/register', postRegistration)

//login
router.post('/login', postLogin)



// //add account details
// router.post('/register', (req, res, next) => {
//     hash(req.body.password, 10, (error,hashPassword) => {
//         if (error) next(error);

//         try {
//             pool.query('insert into account (email,password) values($1,$2) returning *',
//                 [req.body.email,hashPassword],
//                 (error,result) => {
//                     return  error ?  next(error) : res.status(201).json({id: result.rows[0].id,email : result.rows[0].email})
//                 }
//             )
//         } catch (error) {
//             return next(error)
//         }
//     })
// })



// //login
// router.post('/login',(req,res,next) =>{
//     const invalid_message ='Invalid credentials'
//     try {
//         pool.query('select * from account where email=$1',
//             [req.body.email],
//             (error,result) =>{
//                 if (error) next(error)
//                 if (result.rowCount === 0) return next(new Error(invalid_message))
//                     compare(req.body.password,result.rows[0].password,(error,match) =>{
//                         if (error) return next(error)
//                         if (!match) return next(new Error(invalid_message))
//                             console.log(process.env.JWT_SECRET_KEY);
                            
//                         const token = sign({user :req.body.email}, process.env.JWT_SECRET_KEY, { algorithm: 'HS256'})
//                         const user =result.rows[0]
//                         return res.status(200).json({
//                             'id':user.id,
//                             'email' :user.email,
//                             'token': token
//                         })
//                 })
//             }
//         )
//     } catch (error) {
//         return next(error)
//     }
// })

// //delete details
// router.delete('/delete/:email',(req,res) => {
    
//     const email =req.params.email
//         pool.query('delete from account where email=$1',
//         [email],
//         (error,result) =>{
//         if(error){
//              return res.status(500).json({error: error.message})
//          }
//          return res.status(200).json({email:email})
//      })
// })

export default router;