"use client";

import PopUpFilemanager from "@/components/filemanager/PopUpFilemanager";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { UseFileManager } from "@/context/FileManagerProvidert";
import { useReducer } from "react";

const reducer =(state, action)=> {
   switch (action.type) {
    case "INCREMENT":

    return {count: state.count +1}
      
    case "DECREMENT": 
      return  {count: state.count -1}
      
   
    default:
       state
   }
}
const page = () => {
  const { handleOpen, size } = UseFileManager();

  const [state, dispatch] = useReducer(reducer, {count: 0})

  return (
    <div>
      <h1>{state.count}</h1>
      <Button variant="gradient" onClick={() => handleOpen("lg")}>
        Open
      </Button>
      <Button onClick={()=>{
       dispatch({type: "INCREMENT"}) 
      }}>
        INCREMENT

      </Button>
      <Button onClick={()=>{
       dispatch({type: "DECREMENT"}) 
      }}> 
        Decrement

      </Button>
      <h1>handleOpen

        ccccccccccccccccccccccc
      </h1>
      <PopUpFilemanager handleOpen={handleOpen} size={size} />
    </div>
  );
};

export default page;
