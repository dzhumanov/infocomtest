import { Backdrop, Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ModalForm from "./Components/ModalForm";
import { InputState, Tax } from "../../types";
import TaxForm from "./Components/TaxForm";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FinalScreen from "./Components/FinalScreen";

interface Props {
  open: boolean;
  onClose: () => void;
}

const initialState: InputState = {
  name: "",
  surname: "",
  inn: "",
  taxMode: "simple",
  income: 0,
};

const Modal: React.FC<Props> = ({ open, onClose }) => {
  const [data, setData] = useState<InputState>({
    name: "",
    surname: "",
    inn: "",
    taxMode: "simple",
    income: 0,
  });

  const [taxes, setTaxes] = useState<Tax[]>([]);

  const [taxModalOpen, setTaxModalOpen] = useState<boolean>(false);
  const [finalScreenOpen, setFinalScreenOpen] = useState<boolean>(false);

  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);
  const [modalTranslateY, setModalTranslateY] = useState(100);

  useEffect(() => {
    if (open) {
      setModalTranslateY(0);
    } else {
      setModalTranslateY(600);
    }
  }, [open]);

  const setUserData = (data: InputState) => {
    setData(data);
    setTaxModalOpen(true);
  };

  const setTaxesData = (data: Tax[]) => {
    setTaxes(data);
    setTaxModalOpen(false);
    setFinalScreenOpen(true);
  };

  const handleClose = () => {
    onClose();
    setTaxModalOpen(false);
    setFinalScreenOpen(false);
    setData(initialState);
    setTaxes([]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    setTouchEndY(currentY);

    if (touchStartY !== null) {
      const moveY = currentY - touchStartY;

      if (moveY >= 0) {
        setModalTranslateY(moveY);
      }
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY !== null && touchEndY !== null) {
      const touchDifference = touchEndY - touchStartY;

      if (touchDifference > 200) {
        handleClose();
      } else {
        setModalTranslateY(0);
      }
    }

    setTouchStartY(null);
    setTouchEndY(null);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Backdrop open={open} onClick={handleClose}>
      <Grid2
        container
        spacing={0}
        direction={"column"}
        wrap="nowrap"
        onClick={handleModalClick}
        sx={{
          height: taxModalOpen ? "100vh" : "90vh",
          width: "100%",
          position: "absolute",
          bottom: 0,
          background: "white",
          p: 2,
          pt: 0,
          overflowY: "auto",
          transform: `translateY(${modalTranslateY}px)`,
          transition: "transform 0.3s ease-out",
          ...(!taxModalOpen && {
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }),
        }}
      >
        {!taxModalOpen && (
          <Box
            sx={{
              display: "block",
              width: "100%",
              py: 2,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Box
              sx={{
                display: "block",
                mx: "auto",
                width: "20%",
                height: "10px",
                bgcolor: "lightgray",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            ></Box>
          </Box>
        )}
        <Grid2
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          {taxModalOpen && (
            <ArrowBackIosIcon
              sx={{ cursor: "pointer", fontSize: "50px" }}
              onClick={handleClose}
            />
          )}
          {!finalScreenOpen && (
            <Typography variant={"h6"}>Заплатить налоги за ИП</Typography>
          )}
          {!taxModalOpen && (
            <CloseIcon
              sx={{ cursor: "pointer", fontSize: "50px" }}
              onClick={handleClose}
            />
          )}
        </Grid2>
        {!taxModalOpen && !finalScreenOpen && (
          <Grid2 sx={{ mb: 4 }}>
            <Typography variant="body1">
              Теперь ИП на упрощенке обязан уплачивать за себя ИПН и социальный
              налог. В связи с этими изменениями ИП должен платить за себя:
            </Typography>
          </Grid2>
        )}
        {taxModalOpen ? (
          <TaxForm data={data} setTaxesData={setTaxesData} />
        ) : finalScreenOpen ? (
          <FinalScreen data={data} taxes={taxes} onClose={handleClose} />
        ) : (
          <ModalForm onSubmit={setUserData} />
        )}
      </Grid2>
    </Backdrop>
  );
};

export default Modal;
