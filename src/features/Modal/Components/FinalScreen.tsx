import { Button, Grid2, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { InputState, Tax } from "../../../types";

interface Props {
  data: InputState;
  taxes: Tax[];
  onClose: () => void;
}

const FinalScreen: React.FC<Props> = ({ data, taxes, onClose }) => {
  const calculateTotalTax = () => {
    const totalTax = taxes.reduce(
      (acc, tax) => acc + (tax.checked ? tax.procent : 0),
      0
    );
    return (totalTax * data.income) / 100;
  };
  return (
    <Grid2 container direction={"column"}>
      <Grid2>
        <Typography variant="h5">Спасибо!</Typography>
        <Typography variant="h5">Налоги успешно оплачены!</Typography>
        <CheckCircleIcon />
      </Grid2>
      <Grid2 container direction={"column"}>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">Имя</Typography>
          <Typography variant="body1">{data.name}</Typography>
        </Grid2>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">Фамилия</Typography>
          <Typography variant="body1">{data.surname}</Typography>
        </Grid2>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">ИНН</Typography>
          <Typography variant="body1">{data.inn}</Typography>
        </Grid2>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">Режим налогооблажения</Typography>
          <Typography variant="body1">
            {data.taxMode === "simple"
              ? "Упрощённый"
              : data.taxMode === "general"
              ? "Общеустановленный"
              : ""}
          </Typography>
        </Grid2>
        <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1">Ваш доход за пол года</Typography>
          <Typography variant="body1">{data.income}</Typography>
        </Grid2>
        {taxes.map((tax) => (
          <Grid2
            key={tax.name}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="body1">{tax.displayName}</Typography>
            <Typography variant="body1">
              {((data.income * tax.procent) / 100).toFixed()} СОМ
            </Typography>
          </Grid2>
        ))}
        <Grid2>
          <Typography variant="body1">Итого оплачено за полугодие:</Typography>
          <Typography variant="h5">
            {calculateTotalTax().toFixed()} СОМ
          </Typography>
        </Grid2>
        <Grid2>
            <Button variant="contained" onClick={onClose} sx={{display: "block"}}>На главную</Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default FinalScreen;
