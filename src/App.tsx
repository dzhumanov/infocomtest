import { Button, Container } from "@mui/material";
import { useState } from "react";
import Modal from "./features/Modal/Modal";

const App = () => {
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const onOpen = () => {
    setOpenBackdrop(true);
  };

  const onClose = () => {
    setOpenBackdrop(false);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="contained" sx={{ display: "block" }} onClick={onOpen}>
        Налоговый вычет
      </Button>

      <Modal open={openBackdrop} onClose={onClose} />
    </Container>
  );
};

export default App;
