import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "@/utils/Api";
import { useState } from "react";



export function SignUp() {
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    // Add your code here
    e.preventDefault();

    try {
      // Add your code here
      const response = await axios.post("https://klipto-inc-abcstudio-server.onrender.com/api/v1/admin/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);

    }
    catch (err) {
      console.error(err);
    }
  };

=======
  // initial state for form data 
  const[formData, setFormData] =useState({
   fullname: '',
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


  const HandleSubmit =async (e)=>{
    e.preventDefault()
    console.log(formData);
    try {
      const data = Api.post('', formData)

    } catch (error) {
      
    }

  }
>>>>>>> 6b2c196da4eaaf2ced7b6108142245d5860ac3f2
  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Abcstudo Admin </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
        </div>
<<<<<<< HEAD
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit} >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <br />
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              size="lg"
              placeholder="******"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth onClick={ handleSubmit }>
            Register Now
          </Button>


          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
=======
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={HandleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
>>>>>>> 6b2c196da4eaaf2ced7b6108142245d5860ac3f2
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            name="fullname"
            required
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={HandleInputChange}
          />
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
        </div>
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
      </form>

      </div>
    </section>
  );
}

export default SignUp;

//           