const Roles = require('../../models/Roles/modelRoles');


const addRoles=async(req,res)=>{
    const {id_roles,name_role}=req.body;
    try {
        // Kiem tra cos thieu gia tri can thiet
        if(!id_roles|| !name_role){
            return res.status(400).json({message:'All fields are required'})
        }
        // tao phan quyen
        const newRoles=await Roles.create({
            id_roles,
            name_role,
        })
        // Tra ve phan hoi thanh cong
        return res.status(201).json({message:'Roles created successfully',roles:newRoles})
    } catch (error) {
        return res.status(500).json({message:'Error creating roles',error});
    }
}
module.exports={addRoles}