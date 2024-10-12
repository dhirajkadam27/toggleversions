const User = require('../models/User');

exports.checkuser = async (req, res) => {
    try{
        const {email} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(200).json({
                success: true,
                message: "User found",
                userid: existingUser._id
            })
        }


        return res.status(200).json({
            success: true,
            message: "User not found",
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.createuser = async (req, res) => {
    try{
        const {name, email} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(200).json({
                success: true,
                message: "User found",
                userid: existingUser._id
            })
        }


        const response = await User.create({name, email});
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            userid: response._id
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.fetchuser = async (req, res) => {
    try{
        const {_id} = req.body;

        const Userinfo = await User.findById({_id});
        if(Userinfo){
            return res.status(200).json({
                success: true,
                message: "found",
                user: Userinfo
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}


exports.updateuser = async (req, res) => {
    try{
        const {_id,name} = req.body;

        const Userinfo = await User.findByIdAndUpdate(_id,{name});
        if(Userinfo){
            return res.status(200).json({
                success: true,
                message: "Updated"
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}