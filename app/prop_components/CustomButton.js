"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import CustomModal from "./CustomModal";
import { useState } from "react";

const CustomButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    // <div className="flex justify-end mt-8 mb-0 mr-5 pt-100 pr-10">
    <div>
      <Button onClick={handleOpen}>Custom Cashflow</Button>
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
  );
};

export default CustomButton;
