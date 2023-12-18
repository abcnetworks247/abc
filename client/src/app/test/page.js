"use client";
import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    case "DECREMENT":
      return { count: state.count - 1 };



    default:
      return state;
  }
};
function page() {

  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
         <p>Count: {state.count}</p>
        <button onClick={()=>{dispatch({type: "INCREMENT"})}}>INCREMENT</button>
        <button onClick={() => { dispatch({ type: "DECREMENT" }) }}>DECREMENT</button>

    </div>
  );
}

export default page;



