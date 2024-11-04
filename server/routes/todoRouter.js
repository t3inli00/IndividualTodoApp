import { Router } from 'express';
import { auth } from '../helper/auth.js';
//import { emptyOrRows } from '../helper/utils.js';
import { deleteTask, getTasks, postTask } from '../controllers/TaskController.js';
const router = Router()

//get details
router.get('/', getTasks) 

//create details
router.post('/create', auth, postTask)

//delete details
router.delete('/delete/:id',auth, deleteTask)


////create details
// router.get('/',(req,res,next) =>{
//     pool.query('select * from task',(error,result) =>{
//        if(error){
//             return next(error)
//         }
//         return res.status(200).json(emptyOrRows(result))
//     })
    
// })

// //create details
// router.post('/create',auth,(req,res) => {
    
//     pool.query('insert into task (description) values ($1) returning *',
//         [req.body.description],
//         (error,result) =>{
//         if(error){
//              return res.status(500).json({error: error.message})
//          }
//          return res.status(200).json({id: result.rows[0].id})
//      })
// })

//delete details
// router.delete('/delete/:id',auth,(req,res) => {
    
//     const id =parseInt(req.params.id)
//     pool.query('delete from task where id=$1',
//         [id],
//         (error,result) =>{
//         if(error){
//              return res.status(500).json({error: error.message})
//          }
//          return res.status(200).json({id:id})
//      })
// })

export default router;