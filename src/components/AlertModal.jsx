import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pt: 3,
  pb: 1.7,
};

export default function AlertModal({
  open,
  setOpen,
  title = "Alert modal title",
  message = "Alert modal message",
  action,
  actionButtonMessage = "Accept",
  cancelButtonMessage = "Cancel",
  isDangerousAction,
}) {
  const handleClose = () => setOpen(false);
  const handleAction = () => {
    handleClose();
    action();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {message}
            </Typography>

            {action && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button onClick={handleClose}>{cancelButtonMessage}</Button>
                <Button
                  color={isDangerousAction ? "error" : "primary"}
                  sx={{ ml: 2 }}
                  onClick={handleAction}
                >
                  {actionButtonMessage}
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
