import Button from "@mui/material/Button";
import React from "react";
import "tailwindcss/tailwind.css";

export const Footer = () => (
  <footer className="py-4">
    <div className="container mx-auto flex justify-between px-5">
      <div className="text-base">&copy; FlowWise 2024</div>
      <div className="flex space-x-4">
        <div className="text-base">About Me</div>
        <a href="https://github.com/fcnguyen1" target="_blank">
          Github
        </a>
      </div>
    </div>
  </footer>
);
