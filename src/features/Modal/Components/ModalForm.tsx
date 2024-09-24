import { Button, Grid2, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { InputState } from "../../../types";

const ModalForm = () => {
  const [state, setState] = useState<InputState>({
    name: "",
    surname: "",
    inn: "",
    taxMode: "simple",
    income: "",
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Grid2 container spacing={2} sx={{ mb: 4 }}>
        <Grid2 size={6}>
          <Typography variant="body1" sx={{ mb: "10px" }}>
            Имя
          </Typography>
          <TextField
            id="name"
            placeholder="Имя"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="body1" sx={{ mb: "10px" }}>
            Фамилия
          </Typography>
          <TextField
            id="surname"
            placeholder="Фамилия"
            value={state.surname}
            onChange={inputChangeHandler}
            name="surname"
            required
          />
        </Grid2>
      </Grid2>
      <Grid2 sx={{ mb: 4 }}>
        <Typography variant="body1" sx={{ mb: "10px" }}>
          ИНН
        </Typography>
        <TextField
          fullWidth
          id="inn"
          placeholder="ИНН"
          value={state.inn}
          onChange={inputChangeHandler}
          name="inn"
          required
        />
      </Grid2>
      <Grid2 sx={{ mb: 4 }}>
        <Typography variant="body1" sx={{ mb: "10px" }}>
          Режим налогооблажения
        </Typography>
        <TextField
          fullWidth
          select
          id="taxMode"
          value={state.taxMode}
          onChange={inputChangeHandler}
          name="taxMode"
          required
        >
          <MenuItem value="simple">Упрощённый</MenuItem>
          <MenuItem value="general">Общедоступный</MenuItem>
        </TextField>
      </Grid2>
      <Grid2>
        <Typography variant="body1" sx={{ mb: "10px" }}>
          Ваш доход за пол года
        </Typography>
        <TextField
          fullWidth
          type="number"
          id="income"
          placeholder="0 сом"
          value={state.income}
          onChange={inputChangeHandler}
          name="income"
          required
        />
      </Grid2>
      <Grid2 sx={{ mt: 4 }}>
        <Button fullWidth variant="contained">
          Рассчитать
        </Button>
      </Grid2>
    </>
  );
};

export default ModalForm;
