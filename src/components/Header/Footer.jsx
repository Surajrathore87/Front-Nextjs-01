import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { footerLogo, headerLogo } from "../../constants/imagesContains";
import Link from "next/link";

function Footer() {
  return (
    <>
      <section className="footer">
        <div className="container pt-2 pt-md-4">
          <div className="row text-md-start text-center">
            <div className="col-md-8 logo-section">
              <div>
                <img
                  src={headerLogo}
                  alt="Logo"
                  className=""
                  width={230}
                  height={100}
                />
              </div>
              <div className="text-white fs-16 pe-md-5 mt-md-4 mt-2 font-sfpro">
                <p>
                  Our mission is to bring fast, professional, reliable and
                  affordable services to millions of people around the world,
                  while helping thousands of Service Drivers to earn a living
                  from the comfort of their homes.
                </p>
                <p>
                  Order Taxi service, and enjoy professional service at
                  affordable rates from the comfort of your home, office, hotel
                  etc.
                </p>
              </div>
            </div>

            <div className="col-md-4 mt-md-5 font-proxima text-white">
              <div>
                <h2 className="mb-2 fs-36">Featured Services</h2>
                <ul className="fs-20 list-unstyled">
                  <li className="mb-1">
                    <p
                      className="text-decoration-none text-white "
                      title="Taxi"
                    >
                      Taxi Service
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="mb-2 fs-36">Why choose Merry Taxi:</h5>
                <ul>
                  <li>Prompt and affordable services</li>
                  <li>24/7 services </li>
                  <li>
                    All our Drivers are genuine, honest, professional and
                    thoroughly verified.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 footer-border py-md-4 py-3">
              {/* <div className="d-flex justify-content-center justify-content-md-end">
                <a
                  href="https://www.facebook.com/apporio/"
                  className="me-4"
                  target={"blank"}
                  title="Facebook"
                >
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    className="text-white fs-25"
                  />
                </a>
                <a
                  href="https://twitter.com/ApporioInfolabs"
                  target={"blank"}
                  className="me-4"
                  title="Twitter"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="text-white fs-25"
                  />
                </a>
                <a
                  href="https://www.instagram.com/apporioindia/"
                  target={"blank"}
                  className=""
                  title="Instagram"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-white fs-25"
                  />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
