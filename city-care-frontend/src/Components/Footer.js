import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <html lang="en">
        <head>
          <title>Footer Design</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="css/style.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
          />
        </head>
        <body>
          <footer className="footer">
            <div className="footer-container">
              <div className="row">
                <div className="footer-col">
                  <h4>company</h4>
                  <ul>
                    <li>
                      <Link to="/About"> About </Link>
                    </li>
                    <li>
                      <Link to="/Contact"> Contact Us </Link>
                    </li>
                    <li>
                      <Link to="/OrganizeCamp"> Organize Camp </Link>
                    </li>
                    <li>
                      <Link to="/Blogs"> Blog </Link>
                    </li>
                    <li>
                      <Link to="/SignIn"> Sign In </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>get help</h4>
                  <ul>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li>
                      <a href="#">shipping</a>
                    </li>
                    <li>
                      <a href="#">returns</a>
                    </li>
                    <li>
                      <a href="#">order status</a>
                    </li>
                    <li>
                      <a href="#">payment options</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>online shop</h4>
                  <ul>
                    <li>
                      <a href="#">watch</a>
                    </li>
                    <li>
                      <a href="#">bag</a>
                    </li>
                    <li>
                      <a href="#">shoes</a>
                    </li>
                    <li>
                      <a href="#">dress</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4>follow us</h4>
                  <div className="social-links">
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </>
  );
};

export default Footer;
