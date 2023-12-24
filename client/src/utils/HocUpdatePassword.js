import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';


export default function HocUpdatePassword (Component) { 
      // using usesearcparams to get the search params
      
      
      return function UpadatePassword(params){
      const Params = useSearchParams();

      const AuthToken = Cookies.get('authToken')
    
      // using paams.get to get the reset query on the search params
      const reset = Params.get("reset");
         if(!reset ||  reset  == "true"){
          
          AuthToken ?redirect('/') : redirect("/login")
         }

         return <Component {...params} />
    }
}