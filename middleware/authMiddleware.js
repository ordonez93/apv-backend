import jwt from 'jsonwebtoken'
import VeterinarioModel from '../models/VeterinarioModel.js';

const checkAuth = async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){

        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
           
            req.veterinario = await VeterinarioModel.findById(decoded.id).select("-password -token -confirmado")

           return next()

        } catch (error) {
            const e = new Error("Token no válido")
            return res.status(403).json({msg: e.message})
        }
    }

    if(!token){
        const e = new Error("Token inexistente")
        res.status(403).json({msg: e.message})
    }

    next()
};

export default checkAuth;

