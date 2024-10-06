import { getUser } from "../utils/auth.js";

async function restrictTOLoggedinUserOnly(req, res, next) {
    try {
        const userUid = req.cookies?.Uid;  // Get user ID from cookies
        if (!userUid) return res.redirect('/login');  // If no UID, redirect to login

        const user = await getUser(userUid);  // Await if getUser is async
        if (!user) return res.redirect('/login');  // If user not found, redirect to login

        req.user = user;  // Attach user to request object
        next();  // Proceed to next middleware or route handler
    } catch (error) {
        console.error('Error retrieving user:', error);
        return res.redirect('/login');
    }
}

// async function checkAuth(req, res, next) {
//     try {
//         const userUid = req.cookies?.Uid;  // Get user ID from cookies
//         const user = await getUser(userUid);  // Await if getUser is async
//         console.log('User:',user);
//         req.user = user;  // Attach user (or undefined) to request object
//         console.log('User:', req.user);
//         next();  // Proceed to next middleware or route handler
//     } catch (error) {
//         console.error('Error in checkAuth:', error);
//         next();  // Proceed to next middleware or route handler, even in case of error
//     }
// }

export { restrictTOLoggedinUserOnly};
