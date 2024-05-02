"use client";
import React, { useState, useEffect, useRef } from "react";
import { Terms } from "./Terms";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TermsModal = ({ closeModal }) => {
  const terms = Terms;
  const [scroll, setScroll] = useState("paper");

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={true}
        onClose={() => {
          closeModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="scroll-dialog-title">Terminology</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {terms.map((entry, index) => (
              <>
                <Typography variant="body1" gutterBottom>
                  {entry.term}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {entry.description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {entry.description2}
                </Typography>
                <br></br>
              </>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TermsModal;
