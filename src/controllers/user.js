import {USER} from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import {setUser,getUser} from '../utils/auth.js';
import { response } from 'express';


async function handlerUserSignUp(req,res){
    const {name,email,password} = req.body;
    await USER.create({
        name,
        email,
        password,
    })
    return res.redirect("/");
};
      //handlerUserlogin
async function  handlerUserlogin(req,res){
    const {email,password} = req.body;
   const user= await USER.findOne({email,password})
 
   if (!user) {
    return res.render("login", { alert: "Invalid email or password" });
}
  //  const sessionId=uuidv4();
 const token =setUser(user);
    res.cookie('Uid',token);
    return res.redirect("/");
}


export {handlerUserSignUp,
    handlerUserlogin};