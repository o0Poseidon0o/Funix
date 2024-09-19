// duoc xuat dung o routes
const pool = require('../../db')
const qureies = require('./queries')

const getStudents =(req,res)=> {
    pool.query(qureies.getStudents,(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
    // console.log('getting students')
};

const getStudentsById=(req,res)=>{
    const id = parseInt(req.params.id)// ep kieu Int
    pool.query(qureies.getStudentsById,[id],(error,results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addStudent =(req,res)=>{
    const {name,email,age,dob}= req.body;
    //check if email exists
    pool.query(qureies.checkEmailExists,[email],(error,results)=>{
        if(results.rows.length){
            res.send("Email already exists!!!");
        }
        // add student to dabtabase
        pool.query(qureies.addStudent,[name,email,age,dob],(error,results)=>{
            if(error) throw error;
            res.status(200).send("Student Create Successfully!!!");
            
        })
    })

}

const removeStudent=(req,res)=>{
    const id = parseInt(req.params.id);

    pool.query(qureies.getStudentsById,[id],(error,results)=>{
        const noStudentFound = !results.rows.length;
        if (noStudentFound){
            res.send("Students does not exist in the database!!!")
        }
        pool.query(qureies.removeStudent,[id],(error,results)=>{
            if(error) throw error;
            res.status(200).send("Student removed successfully!!!")
        })
    })
}
module.exports={
    getStudents,
    getStudentsById,
    addStudent,
    removeStudent
}

