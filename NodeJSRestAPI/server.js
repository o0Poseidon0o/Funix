const express = require("express");
const studentRouters=require('./src/student/routes');


const app =express();
const port = 5000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send ("hello world!")
});

app.use('/api/v1/students',studentRouters)

app.listen(port,()=>console.log(`app listening on port ${port}`));