// duoc dung o server.js
const {Router} = require('express');
const controller=require('./controller')


const router=Router();


// router.get('/',(req,res)=>{
//     res.send("using api router");
// })

router.get("/",controller.getStudents);
router.post("/",controller.addStudent); //add dữ liệu vào database
router.get("/:id",controller.getStudentsById);
router.delete("/:id",controller.removeStudent)


module.exports=router;
