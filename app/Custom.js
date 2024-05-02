"use client";
import { React, useState } from "react";
import "tailwindcss/tailwind.css";
import Button from "@mui/material/Button";
import CustomButton from "./prop_components/CustomButton";
import CustomModal from "./prop_components/CustomModal";

export const Custom = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex flex-col justify-center h-64 w-full bg-gradient-to-r from-slate-500 to-cyan-900">
      <div className="flex flex-col items-center">
        <div className="text-2xl p-4 bg-gradient-to-r from-slate-50 to-slate-50 bg-clip-text text-transparent">
          Want to analyze your own?
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={handleOpen}
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": {
                borderColor: "black",
                color: "black",
              },
            }}
          >
            Custom Cash Flow
          </Button>
          {open ? (
            <CustomModal
              openModal={handleOpen}
              closeModal={handleClose}
              currentState={open}
            ></CustomModal>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
