import React from "react";
import Addtodos from "./Addtodos";





function Home() {
  return (
    <>
      <h1 className="text-center">welcome {localStorage.getItem("name")}</h1>
      <Addtodos />
      
      
      
    </>
  );
}

export default Home;
