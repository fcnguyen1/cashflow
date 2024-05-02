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

const CashFlowModal = ({ closeModal }) => {
  const [customPrice, setCustomPrice] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const onPriceChange = (e) => {
    setCustomPrice(parseFloat(e.target.value));
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={() => {
          closeModal();
        }}
        // onClose={closeModal()}
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
            {loaded ? (
              <div className="flex justify-between py-1">
                <label htmlFor="Price" className="w-3/5">
                  Price:
                </label>
                <div className="relative" style={{ width: "33%" }}>
                  <div className="absolute inset-y-0 left-0 flex items-center pr-3% pointer-events-none">
                    <span className="text-gray-500 px-2">$ </span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="10000"
                    min="0"
                    className="py-2 px-5 border border-gray-300 rounded-md pr-5 w-full custom-input"
                    value={customPrice <= 0 ? 0 : customPrice.toString()}
                    onChange={onPriceChange}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
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

export default CashFlowModal;
