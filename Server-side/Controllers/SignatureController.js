const Signature =require('../Models/SignatureModel')

exports.saveSignature = async (req, res) => {
  try {
    const data = req.body;

    const filter = { full_name: data.full_name };

    const options = { new: true, upsert: true }; // Create if doesn't exist

    const result = await Signature.findOneAndUpdate(filter, data, options);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save signature' });
  }
};

exports.getSignature = async (req,res) =>{
    try {
        const signatures = await Signature.find({})
        res.status(200).json(signatures)
    }catch(err){
        res.status(500).json({error:'Failed to get Signature'})
    }
}

//  delete

exports.deleteSignature = async (req,res) =>{
  const {full_name} = req.body
    try {
        const signatures = await Signature.findOneAndDelete({full_name:full_name})
        res.status(200).json(signatures)
    }catch(err){
        res.status(500).json({error:'Failed to Delete Signature'})
    }
}