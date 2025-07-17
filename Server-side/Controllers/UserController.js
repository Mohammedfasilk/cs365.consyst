const User = require('../Models/userModel')

exports.saveUser = async (req, res) =>{
    try{
        const { email, name, roles } = req.body;
        if( !email || !roles ){
           return res.status(500).json({error:'All fields are required'})
        }

        const UpdateUser = await User.findOneAndUpdate(
            {email},
            {name, roles},
            {upsert:true, new:true}
        );
        res.status(200).json(UpdateUser)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.getUser = async (req,res) => {
    try{
        const user = await User.find();
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.deleteUser = async (req,res) => {
    try{
        const { email } = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({ error: "User not found." });
        }
        const deleted = await User.findOneAndDelete({email})
        res.status(200).json({ message:'User deleted Successfully', deleteUser : deleted})
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.getSingleUser = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};