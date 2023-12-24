import { NextResponse } from "next/server";
import { sessionStatus } from "./sessionStatus";

const ProtectedRoutes = ["/about"];

const Authtoken = false;


export default function middleware(req) {
  if (!sessionStatus && ProtectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
