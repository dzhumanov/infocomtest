import { Button, Grid2, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { InputState, Tax } from "../../../types";
import { calculateTotalTax } from "../../../helpers/functions";

interface Props {
  data: InputState;
  taxes: Tax[];
  onClose: () => void;
}

const FinalScreen: React.FC<Props> = ({ data, taxes, onClose }) => {
  return (
    <Grid2
      container
      direction={"column"}
      wrap="nowrap"
      sx={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}
    >
      <Grid2 sx={{ mb: "80px" }}>
        <Typography
          variant="h4"
          fontStyle={"italic"}
          sx={{ textAlign: "center" }}
        >
          Спасибо!
        </Typography>
        <Typography
          variant="h4"
          fontStyle={"italic"}
          sx={{ textAlign: "center" }}
        >
          Налоги успешно оплачены!
        </Typography>
        <CheckCircleIcon
          sx={{ fontSize: "60px", display: "block", mx: "auto" }}
        />
      </Grid2>
      <Grid2 container direction={"column"} spacing={1}>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" fontStyle={"italic"}>
            Имя
          </Typography>
          <Typography variant="body1" fontStyle={"italic"}>
            {data.name}
          </Typography>
        </Grid2>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" fontStyle={"italic"}>
            Фамилия
          </Typography>
          <Typography variant="body1" fontStyle={"italic"}>
            {data.surname}
          </Typography>
        </Grid2>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" fontStyle={"italic"}>
            ИНН
          </Typography>
          <Typography variant="body1" fontStyle={"italic"}>
            {data.inn}
          </Typography>
        </Grid2>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" fontStyle={"italic"}>
            Режим налогооблажения
          </Typography>
          <Typography variant="body1" fontStyle={"italic"}>
            {data.taxMode === "simple"
              ? "Упрощённый"
              : data.taxMode === "general"
              ? "Общеустановленный"
              : ""}
          </Typography>
        </Grid2>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" fontStyle={"italic"}>
            Ваш доход за пол года
          </Typography>
          <Typography variant="body1" fontStyle={"italic"}>
            {data.income} СОМ
          </Typography>
        </Grid2>
        {taxes.map((tax) => (
          <Grid2
            key={tax.name}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="body1" fontStyle={"italic"}>
              {tax.displayName}
            </Typography>
            <Typography variant="body1" fontStyle={"italic"}>
              {((data.income * tax.procent) / 100).toFixed()} СОМ
            </Typography>
          </Grid2>
        ))}
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "60px",
            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="body1"
            fontStyle={"italic"}
            sx={{ maxWidth: "120px" }}
          >
            Итого оплачено за полугодие:
          </Typography>
          <Typography variant="body1" fontStyle={"italic"}>
            {calculateTotalTax(taxes, data.income)} СОМ
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2 sx={{ mt: "auto" }}>
        <Button
          fullWidth
          variant="text"
          sx={{
            color: "black",
            fontStyle: "italic",
            fontSize: "20px",
            textTransform: "none",
          }}
          onClick={onClose}
        >
          Вернуться на главную
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default FinalScreen;
