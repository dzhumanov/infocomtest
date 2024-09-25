import React, { useState } from "react";
import { InputState, Tax } from "../../../types";
import { Box, Button, Grid2, Typography } from "@mui/material";
import TaxCard from "./TaxCard";
import { calculateTotalTax } from "../../../helpers/functions";

interface Props {
  data: InputState;
  setTaxesData: (data: Tax[]) => void;
}

const TaxForm: React.FC<Props> = ({ data, setTaxesData }) => {
  const [taxes, setTaxes] = useState<Tax[]>([
    { name: "ipn", displayName: "ИПН", checked: false, procent: 3 },
    { name: "co", displayName: "СО", checked: false, procent: 3.5 },
    { name: "opv", displayName: "ОПВ", checked: false, procent: 10 },
    { name: "vosms", displayName: "ВОСМС", checked: false, procent: 5 },
  ]);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setTaxes((prevState) =>
      prevState.map((tax) => (tax.name === name ? { ...tax, checked } : tax))
    );
  };

  const onFormSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const checkedTaxes = taxes.filter((tax) => tax.checked);
    if (checkedTaxes.length < 1) {
      alert("Выберите хотя бы один налог!");
      return;
    }
    setTaxesData(checkedTaxes);
  };

  return (
    <Grid2
      container
      direction="column"
      spacing={2}
      wrap="nowrap"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Grid2 container justifyContent="space-between" alignItems="center">
        <Typography
          variant="h5"
          fontStyle={"italic"}
          sx={{ maxWidth: "180px" }}
        >
          Ваш доход за полугодие:
        </Typography>
        <Typography variant="h5" fontStyle={"italic"}>
          {data.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} СОМ
        </Typography>
      </Grid2>

      <Grid2 container direction="column" spacing={2}>
        {taxes.map((tax) => (
          <TaxCard
            key={tax.name}
            name={tax.name}
            displayName={tax.displayName}
            checked={tax.checked}
            income={data.income}
            procent={tax.procent}
            handleCheckBox={handleCheckbox}
          />
        ))}
      </Grid2>

      <Grid2
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flexGrow: 1,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            fontStyle={"italic"}
            sx={{ maxWidth: "200px" }}
          >
            Итого к оплате за полугодие:
          </Typography>
          <Typography variant="h5" fontStyle={"italic"}>
            {calculateTotalTax(taxes, data.income)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            СОМ
          </Typography>
        </Box>
      </Grid2>

      <Grid2 sx={{ mt: 4 }}>
        <Button
          onClick={onFormSubmit}
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "black",
            fontStyle: "italic",
            fontSize: "20px",
            textTransform: "none",
          }}
        >
          Оплатить
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default TaxForm;
