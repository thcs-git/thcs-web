import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

export const ButtonGreen = styled(Button)<ButtonProps>(({ theme }) => ({
  background: "var(--success)",
  "&:hover": { background: "var(--success-hover)" },
}));
