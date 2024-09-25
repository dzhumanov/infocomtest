import React, { useState } from "react";
import { InputState, Tax } from "../../../types";
import { Button, Grid2, Typography } from "@mui/material";
import TaxCard from "./TaxCard";

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

  const calculateTotalTax = () => {
    const totalTax = taxes.reduce(
      (acc, tax) => acc + (tax.checked ? tax.procent : 0),
      0
    );
    return (totalTax * data.income) / 100;
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
    <Grid2 container direction="column" spacing={2}>
      <Grid2 container justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Ваш доход за полугодие:</Typography>
        <Typography variant="h4">{data.income} СОМ</Typography>
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

      <Grid2>
        <Typography>Итого к оплате за полугодие:</Typography>
        <Typography>{calculateTotalTax()} СОМ</Typography>
      </Grid2>

      <Grid2 sx={{ mt: 4 }}>
        <Button
          onClick={onFormSubmit}
          type="submit"
          fullWidth
          variant="contained"
        >
          Оплатить
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default TaxForm;
