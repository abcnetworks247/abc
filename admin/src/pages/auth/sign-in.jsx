import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Api from "@/utils/Api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";




export function SignIn() {

   // for navigating to the dashboard page after login
  const navigate = useNavigate();
    // initial state for form data 
    const[formData, setFormData] =useState({
      email: "",
      password: "", 
     })
   
     /**
      * 
      * @param {object}e e event object
      * @param {string} e.target - to target the event
      * @param {string} e.value - value of the event i.e input
         */
   
     const HandleInputChange = (e)=>{
       const {name, value} = e.target;
        setFormData({
         ...formData,
         [name]: value
        })
   
   
     }
   
     /**
      * 
      * @param {object} e - event object
      * @param {function} e.preventdefault - for prevent the browser default
      */
   
   
     const HandleSubmit = async (e) => {
       e.preventDefault();
       const id = toast.loading("loging in..", {
        position: toast.POSITION.TOP_LEFT,
      });       try {
     
         // Log the current form data to the console
         console.log("formdata", formData);
   
         // Perform an asynchronous API post request to sign up the user
         console.log("Before API post request");
         const data = await Api.post("admin/auth/signin", formData);
        
         const value = data.data;
   
         // Log the response data to the console
         console.log("all data", data);
   
         // Check the status of the response and log success or failure messages
         if (data.status === 200) {
           console.log("post successful", data.data.message);

           // storing the user token after successful login
           Cookies.set("authToken", value.authToken);
           setTimeout(() => {
             toast.dismiss(id);
           }, 1000);
          toast.update(id, {
             render: `${data.data.message}`,
             type: "success",
             isLoading: false,
           });
           setTimeout(() => {
             navigate('/home');
           }, 3000);
         } else if(data.status === 500) {
           const suberrormsg = toast.update(id, {
             render: `user email or name already exist `,
             type: "error",
             isLoading: false,
           });
           setTimeout(() => {
             toast.dismiss(suberrormsg);
           }, 1000);
   
         }else{
           const suberrormsg = toast.update(id, {
             render: `error while creating account `,
             type: "error",
             isLoading: false,
           });
           setTimeout(() => {
             toast.dismiss(suberrormsg);
           }, 1000);
         }
       } catch (error) {
         // Log any errors that occur during the API request
       
         const suberrormsg = toast.update(id, {
           render: `${error}`,
           type: "error",
           isLoading: false,
         });
         setTimeout(() => {
           toast.dismiss(suberrormsg);
         }, 2000);
   
         console.error(error);
       }
     };
  
    
  return (
    <>
          <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <div className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"  >
        <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" >
        <form className="mb-1 flex flex-col gap-6" onSubmit={HandleSubmit}>

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            required
            name="email"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={HandleInputChange}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            required
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="password"
            onChange={HandleInputChange}
          />
        </form>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth onClick={HandleSubmit}>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
        </Typography>
      </div>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  Subscribe me to newsletter
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Typography variant="small" className="font-medium text-gray-900">
              <Link to="/auth/recovery">
                Forgot Password?
              </Link>
            </Typography>
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </div>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
    </>
  );
}

export default SignIn;
