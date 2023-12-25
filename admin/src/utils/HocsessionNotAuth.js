import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function HocsessionNotAuth(Component) {
  return function  NotAuth(params) {
    const AuthToken = Cookies.get("adminToken");
    const session = AuthToken;
    if(!session){
      redirect('/auth/signin')
    }
    return <Component {...params} />
    
  }
}
