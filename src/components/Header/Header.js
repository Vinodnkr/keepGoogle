import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Heading() {
  const navigate = useNavigate();

  const handleClickRefresh = () => {
    window.location.reload();
   }

  const handleClick = () => {
    const userEmail = localStorage.getItem("userEmail");
    //const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];

    // Filter out the user with the specified email
    //const updatedUsers = existingUsers.filter(
    //  (user) => user.email !== userEmail
    //);

    // Update local storage with the filtered user data
    //localStorage.setItem("userData", JSON.stringify(updatedUsers));
    //localStorage.removeItem("userEmail");
    localStorage.setItem("LoginStatus", false);
    navigate("/login");

    // You might also want to update the UI or perform other actions
     alert(`Users Name ${userEmail} LogOut successfully!`);

     
     
  };

  

  return (
    <div>
      <div className="nav-wrapper white blue-text text-darken-2">
        <nav>
          <div className="white blue-text text-darken-2 nav-wrapper ">
            <a
              href="/"
              className="white blue-text text-darken-2 brand-logo logo left"
            >
              <i className="material-icons">description</i>
              <span className="hero-text">Keep</span>
            </a>

            <ul className="white blue-text text-darken-2 right">
              <li>
                <a className="blue-text text-darken-2" href="/category">
                  Folder
                </a>
              </li>
              <li>
                <a className="blue-text text-darken-2" href="" onClick={handleClickRefresh}
                >
                  Refresh
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Vinodnkr/keepGoogle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blue-text text-darken-2"
                >
                  Code
                </a>
              </li>
              <li>
                <Button onClick={handleClick}>LogOut</Button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Heading;
