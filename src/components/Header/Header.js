import { Link, useMediaQuery, useTheme } from "@mui/material";
import { Folder, Refresh, Code, ExitToApp } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Heading() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickRefresh = () => {
    window.location.reload();
  };

  const handleClick = () => {
    const userEmail = localStorage.getItem("userEmail");
    localStorage.setItem("LoginStatus", false);
    navigate("/");

    alert(`Users Name ${userEmail} LogOut successfully!`);
  };

  return (
    <div>
      <div className="nav-wrapper white blue-text text-darken-2">
        <nav>
          <div className="white blue-text text-darken-2 nav-wrapper ">
            <Link
              href="/home"
              className="white blue-text text-darken-2 brand-logo logo left"
            >
              <i className="material-icons">description</i>
              <span className="hero-text">Vinod Keep</span>
            </Link>

            <ul className="white blue-text text-darken-3 right">
              <li>
                <a className="blue-text text-darken-3" href="/category">
                  {isMobile ? <Folder /> : "Folder"}
                </a>
              </li>
              <li>
                <Link
                  className="blue-text text-darken-2"
                  href=""
                  onClick={handleClickRefresh}
                >
                  {isMobile ? <Refresh /> : "Refresh"}
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Vinodnkr/keepGoogle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blue-text text-darken-2"
                >
                  {isMobile ? <Code /> : "Code"}
                </Link>
              </li>
              <li>
                <Link className="blue-text text-darken-2" onClick={handleClick}>
                  {isMobile ? <ExitToApp /> : "LogOut"}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Heading;
