import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Typewriter from "typewriter-effect";
import "./Home.css"


const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <div className="banner__text">
          <h1 className="banner__headline"><Typewriter onInit={typewriter => {
            typewriter
              .typeString("ChatME")
              .pause(1000)
              .deleteAll()
              .typeString("Be in touch with your loved Ones")
              .pause(500)
              .deleteAll()
              .start();
          }}
          
            options={{loop:true}}/>
            </h1>
          <h2>A Simple Chat APP</h2>
        </div>
        <div className="banner__login">
          <Link to="/login" >
            <Button variant="contained" color="primary" sx={{height:"50px", width:"100px", marginRight:"10px"}}>
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="contained" color="primary" sx={{height:"50px", width:"100px"}}>
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
