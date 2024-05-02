"use client";
import React, { useEffect } from "react";
import Calculator from "./Calculator";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ closeModal }) => {
  const [customPrice, setCustomPrice] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // const onPriceChange = (e) => {
  //   setCustomPrice(parseFloat(e.target.value));
  // };

  return (
    <div>
      <Modal
        open={true}
        onClose={() => {
          closeModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "black" }}
          >
            Custom Cash Flow
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: "black" }}
          ></Typography>
          <div className="text-black">
            <Calculator
              customPrice={customPrice}
              customLoaded={setLoaded}
            ></Calculator>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

//customPrice={customPrice}
export default CustomModal;
