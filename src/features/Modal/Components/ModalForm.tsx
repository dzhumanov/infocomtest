import { Button, Grid2, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { InputState } from "../../../types";

interface Props {
  onSubmit: (data: InputState) => void;
}

const ModalForm: React.FC<Props> = ({ onSubmit }) => {
  const [state, setState] = useState<InputState>({
    name: "",
    surname: "",
    inn: "",
    taxMode: "simple",
    income: 0,
  });
  const [innError, setInnError] = useState<string>("");
  const [incomeError, setIncomeError] = useState<string>("");

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "inn" && value.length > 12) {
      return;
    }

    if (name === "income" && value.length > 9) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      [name]: name === "income" ? parseFloat(value) : value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (state.inn.length !== 12) {
      setInnError("ИНН должен содержать 12 цифр");
      return;
    } else {
      setInnError("");
    }

    if (state.income <= 0 || state.income > 150000000) {
      setIncomeError("Доход не может быть равен нулю и не больше 150 000 000");
      return;
    } else {
      setIncomeError("");
    }

    onSubmit(state);
  };

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={onFormSubmit}
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Grid2 container spacing={2} sx={{ mb: 2 }}>
          <Grid2 size={6}>
            <Typography
              variant="body1"
              fontStyle={"italic"}
              sx={{ mb: "10px" }}
            >
              Имя
            </Typography>
            <TextField
              fullWidth
              id="name"
              placeholder="Имя"
              value={state.name}
              onChange={inputChangeHandler}
              name="name"
              required
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "8px",
                },
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <Typography
              variant="body1"
              fontStyle={"italic"}
              sx={{ mb: "10px" }}
            >
              Фамилия
            </Typography>
            <TextField
              fullWidth
              id="surname"
              placeholder="Фамилия"
              value={state.surname}
              onChange={inputChangeHandler}
              name="surname"
              required
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "8px",
                },
              }}
            />
          </Grid2>
        </Grid2>
        <Grid2 sx={{ mb: 4 }}>
          <Typography variant="body1" fontStyle={"italic"} sx={{ mb: "10px" }}>
            ИНН
          </Typography>
          <TextField
            fullWidth
            type="number"
            id="inn"
            placeholder="ИНН"
            value={state.inn}
            onChange={inputChangeHandler}
            name="inn"
            required
            error={!!innError}
            helperText={innError}
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "8px",
              },
            }}
          />
        </Grid2>
        <Grid2 sx={{ mb: 4 }}>
          <Typography variant="body1" fontStyle={"italic"} sx={{ mb: "10px" }}>
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
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "8px",
              },
            }}
          >
            <MenuItem value="simple">Упрощённый</MenuItem>
            <MenuItem value="general">Общедоступный</MenuItem>
          </TextField>
        </Grid2>
        <Grid2>
          <Typography variant="body1" fontStyle={"italic"} sx={{ mb: "10px" }}>
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
            error={!!incomeError}
            helperText={incomeError}
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "8px",
              },
            }}
          />
        </Grid2>
        <Grid2 sx={{ mt: "auto" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "black",
              fontStyle: "italic",
              fontSize: "20px",
              textTransform: "none",
            }}
          >
            Рассчитать
          </Button>
        </Grid2>
      </form>
    </>
  );
};

export default ModalForm;
