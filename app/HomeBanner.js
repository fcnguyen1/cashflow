import React from "react";
import "tailwindcss/tailwind.css";
import backgroundImage from "./img/bg-pic.jpeg";
import { Albert_Sans, Barlow } from "next/font/google";

const albert_init = Albert_Sans({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-albert",
});

const barlow_init = Barlow({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-barlow",
});

const HomeBanner = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "75vh",
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    color: "white",
  };

  return (
    <div style={backgroundStyle} className="relative">
      <div
        className="absolute"
        style={{
          maxWidth: "550px",
          color: "white",
          zIndex: 10,
          padding: "15px",
          bottom: "50px",
          left: "50px",
        }}
      >
        <h2
          className={`${albert_init.className} text-5xl subpixel-antialiased font-bold`}
        >
          FIRE with Cash Flow
        </h2>
        <p
          className={`${barlow_init.className} text-lg mt-4`}
          style={{ width: "550px" }}
        >
          Streamline your real estate investment analysis with our cashflow
          calculator. Make informed decisions and maximize returns effortlessly.
        </p>
      </div>
    </div>
  );
};

export default HomeBanner;
