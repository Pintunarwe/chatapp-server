// // import jwt from 'jsonwebtoken';
// // import mongoose from "mongoose";

// // const cookieOptions={
// //     maxAge:15*24*60*60*1000,
// //     sameSite:"none",
// //     httpOnly:true,
// //     secure:true,
// // }

// // const connectDB=(uri)=>{
// // mongoose.connect(uri,{dbName:"Chattu"})
// // .then((data)=>{
// // console.log(`Connected to DB:${data.connection.host}`)
// // })
// // .catch((err)=>{
// //     throw err;
// // })

// // };

// // const sendToken=(res,user,code,message)=>{
// // const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);


// // return res.status(code).cookie("chattu-token",token,cookieOptions).json({
// //     success:true,
// //     message,
// //     // token,
// // })
// // }


// // export { connectDB, sendToken };


// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
// import {v4 as uuid} from 'uuid';
// import {v2 as cloudinary} from 'cloudinary'
// import { getBase64, getSockets } from "../lib/helper.js";

// const cookieOptions = {
//     maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
//     sameSite: "none",
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // Secure cookies in production
// };

// const connectDB = async (uri) => {
//     try {
//         const data = await mongoose.connect(uri, { dbName: "Chattu" });
//         console.log(`Connected to DB: ${data.connection.host}`);
//     } catch (err) {
//         console.error("Database connection error:", err);
//         process.exit(1);
//     }
// };

// const sendToken = (res, user, code, message) => {
//     const token = jwt.sign(
//         { _id: user._id },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_IN || "7d" } // Default expiration of 7 days
//     );

//     return res
//         .status(code)
//         .cookie("chattu-token", token, cookieOptions)
//         .json({
//             success: true,
//             user,
//             message,
//         });
// };


// const emitEvent = (req, event, users, data) => {
//     const  io=req.app.get("io");
//     const usersSocket=getSockets(users);
//     io.to(usersSocket).emit(event,data);
// };

// const uploadFilesToCloudinary = async (files = []) => {

//     const uploadPromises=files.map((file)=>{
//         return new Promise((resolve,reject)=>{
//             cloudinary.uploader.upload(getBase64(file),{
//                 resource_type:"auto",
//                 public_id:uuid()
//             },
//             (error,result)=>{
//                 if(error) return reject(error);
//                 resolve(result);
//             }
//         )
//         })
//     });

//     try {
//         const results=await Promise.all(uploadPromises);

//         const formattedResults=results.map((result)=>({
//             public_id:result.public_id,
//             url: result.secure_url
//         }))
//         return formattedResults;
        
//     } catch (error) {
//         throw new Error("Error uploading files to cloudinary",error)
//     }

// }

// const deleteFilesFromCloudinary = async (public_ids) => {

// }


// export {
//     connectDB,
//     sendToken,
//     cookieOptions,
//     emitEvent,
//     deleteFilesFromCloudinary,
//     uploadFilesToCloudinary
// };


import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64, getSockets } from "../lib/helper.js";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Chattu" })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("chattu-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};

const deletFilesFromCloudinary = async (public_ids) => {
  // Delete files from cloudinary
};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deletFilesFromCloudinary,
  uploadFilesToCloudinary,
};