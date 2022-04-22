import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";

export const ButtonGreen = styled(Button)<ButtonProps>(({ theme }) => ({
  background: "var(--success)",
  "&:hover": { background: "var(--success-hover)" },
}));

export const AutocompleteStyled = styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "var(--secondary)",
    },
  },
}));
