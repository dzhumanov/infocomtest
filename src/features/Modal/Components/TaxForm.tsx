import React, { useState } from "react";
import { InputState, Taxes } from "../../../types";
import { Button, Grid2, Typography } from "@mui/material";
import TaxCard from "./TaxCard";

interface Props {
  data: InputState;
}

const TaxForm: React.FC<Props> = ({ data }) => {
  const [taxes, setTaxes] = useState<Taxes>({
    ipn: { name: "ИПН", checked: false, procent: 3 },
    co: { name: "СО", checked: false, procent: 3.5 },
    opv: { name: "ОПВ", checked: false, procent: 10 },
    vosms: { name: "ВОСМС", checked: false, procent: 5 },
  });

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setTaxes((prevState) => ({
      ...prevState,
      [name as keyof Taxes]: { ...prevState[name as keyof Taxes], checked },
    }));
  };

  const calculateTotalTax = () => {
    const totalTax = Object.values(taxes).reduce(
      (acc, tax) => acc + (tax.checked ? tax.procent : 0),
      0
    );
    return (totalTax * data.income) / 100;
  };

  const onFormSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const checkedTaxes = Object.values(taxes).some((tax) => tax.checked);
    if (!checkedTaxes) {
      alert("Выберите хотя бы один налог!");
      return;
    }
  };

  return (
    <Grid2 container direction="column" spacing={2}>
      <Grid2 container justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Ваш доход за полугодие:</Typography>
        <Typography variant="h4">{data.income} СОМ</Typography>
      </Grid2>

      <Grid2 container direction="column" spacing={2}>
        {Object.keys(taxes).map((key) => (
          <TaxCard
            key={key}
            name={key}
            displayName={taxes[key as keyof Taxes].name}
            checked={taxes[key as keyof Taxes].checked}
            income={data.income}
            procent={taxes[key as keyof Taxes].procent}
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
