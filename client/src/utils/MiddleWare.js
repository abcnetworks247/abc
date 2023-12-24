
// import { NextResponse } from "next/server";
// import { token } from "./Session";
// import { UseUserContext } from "../../contexts/UserContext";

// const ProctedRoute = ['/pricing'];
// const { Authtoken } = UseUserContext();

// // export default async function MiddleWare(req, res, next) {

// //     if (ProctedRoute.includes(req.nextUrl.pathname)) {
// //         if (!Session.token) {
// //             return NextResponse.redirect(new URL("/", req.url));
// //         }
// //     }
// //     return next();
// // }

// export default async function MiddleWare(req) {
//     if(Authtoken && ProctedRoute.includes(req.nextURL.pathname)) {
//         const absoluteURL = new URL('/', req.nextURL.origin);
//         return NextResponse.redirect(absoluteURL.toString());
//     }
    
// }