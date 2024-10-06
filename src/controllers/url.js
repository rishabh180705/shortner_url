//import { nanoid } from 'nanoid';
//model.id = //nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"
// import { customAlphabet } from 'nanoid'
// const //nanoid = customAlphabet('1234567890abcdef', 8)
import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId({ length: 8 });


import {URL} from '../models/url.js'
async function handlerUrlShortenerGenerator(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'});
    const shortID=uid.rnd(); // p0ZoB1FwH6
    await URL.create({
        ShortId:shortID,
        originalURL:body.url,
        VisitHistory:[],
        createdBy:req.user._id,
    });
    return res.render('home',{
        id:shortID
    })
    //res.json({id:shortID});

}
async function handlerUrlRedirect(req,res){
    const ShortId = req.params.shortid;
   const result= await URL.findOne({ShortId});

  return res.json({totalClicks:result.VisitHistory.length, analytic:result.VisitHistory});

}



export {handlerUrlShortenerGenerator,
    handlerUrlRedirect};