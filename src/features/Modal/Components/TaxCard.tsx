import { Box, Checkbox, Grid2, Typography } from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  name: string;
  displayName: string;
  checked: boolean;
  income: number;
  procent: number;
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaxCard: React.FC<Props> = ({
  name,
  displayName,
  checked,
  income,
  procent,
  handleCheckBox,
}) => {
  return (
    <Grid2
      sx={{
        minHeight: "70px",
        width: "100%",
        px: 3,
        py: 2,
        boxShadow: "-1px 10px 22px 0px rgba(0, 0, 0, 0.75)",
        borderRadius: "6px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Checkbox
          name={name.toLowerCase()}
          checked={checked}
          onChange={handleCheckBox}
        />
        <Box>
          <Typography variant="h5" fontWeight={"bold"} textAlign={"right"}>
            {displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#9D9D9D" }}>
            ({procent}% от дохода)
          </Typography>
        </Box>
      </Box>
      {checked && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mt: "30px" }}>
            {((income * procent) / 100)
              .toFixed()
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
            СОМ
          </Typography>
          <InfoIcon fontSize="large" />
        </Box>
      )}
    </Grid2>
  );
};

export default TaxCard;
