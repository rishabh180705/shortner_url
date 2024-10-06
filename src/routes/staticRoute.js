import { Router } from "express";
const router=Router();
import {URL} from '../models/url.js';
import { getUser } from "../utils/auth.js";


router.get('/',(req, res) => {
    return res.render('home');
});
router.get("/analytics", async (req, res) => {

  const userUid = req.cookies?.Uid;  // Get user ID from cookies
     const user =getUser(userUid);  // Await if getUser is async
     if(!user) return res.redirect('/login');
      // console.log('User:',user);
 //console.log('User:', req.user);

 //console.log('User:', req.user);
  const allUrl= await URL.find({createdBy:user._id});
  return res.render('analytics',{
    URLS: allUrl,
  });
})
router.get("/sinup",(req,res)=>{
  return res.render('sinup');
})
router.get("/login",(req,res)=>{
  return res.render('login');
})


export default router;