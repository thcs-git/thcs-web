import styled from "styled-components";
import { Switch } from "@mui/material";

export const SwitchComponent = styled(Switch)`
  .Mui-checked {
    color: var(--secondary);
  }

  .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track {
    background: var(--secondary);
  }

  .MuiSwitch-colorSecondary.Mui-checked:hover {
    background: var(--switch-hover);
  }
`;
