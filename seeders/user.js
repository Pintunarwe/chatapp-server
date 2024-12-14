// // import { faker } from "@faker-js/faker";
// // import { User } from "../models/user.js";

// // const createUser=async(numUsers)=>{
// //     try {
// //     const usersPromise=[];
// //     for(let i=0;i<numUsers;i++){
// //         const tempUser=User.create({
// //             name:faker.person.fullName(),
// //             username:faker.internet.username(),
// //             bio:faker.lorem.sentence(10),
// //             password:"password",
// //             avatar:{
// //                 url:faker.image.avatar(),
// //                 public_id:faker.system.fileName(),
// //             }
// //         });
// //         usersPromise.push(tempUser);
// //         console.log("user Created",numUsers);
// //         process.exit(1);


// //     }
// //     await Promise.all(usersPromise);


// //     } catch (error) {
// //         console.error(error);
// //         process.exit(1);
// //     }
// // };
// // export {createUser}

// import { faker } from "@faker-js/faker";
// import { User } from "../models/user.js";

// const createUser = async (numUsers) => {
//     try {
//         const usersPromise = [];
//         for (let i = 0; i < numUsers; i++) {
//             const tempUser = User.create({
//                 name: faker.person.fullName(),
//                 username: faker.internet.username(),
//                 bio: faker.lorem.sentence(10),
//                 password: "password",
//                 avatar: {
//                     url: faker.image.avatar(),
//                     public_id: faker.system.fileName(),
//                 },
//             });
//             usersPromise.push(tempUser);
//         }

//         await Promise.all(usersPromise);
//         console.log(`Successfully created ${numUsers} users`);
//     } catch (error) {
//         console.error("Error creating users:", error);
//         process.exit(1); // Only exit if there's a failure
//     }
// };



// export {  createUser };



import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }

    await Promise.all(usersPromise);

    console.log("Users created", numUsers);
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { createUser };