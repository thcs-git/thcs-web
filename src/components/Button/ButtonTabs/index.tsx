import React from "react";
import { ButtonsContent, ButtonComponent } from "./styles";
import {
  Button,
  ButtonProps,
  ButtonPropsColorOverrides,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/theme";
interface IComponent {
  canEdit: boolean;
  buttons: IButtons[];
}

export interface IButtons extends ButtonProps {
  name: string;
  background:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  onClick?: any;
  show?: boolean;
  component?: JSX.Element;
}

function a11yProps(name: string, index: number) {
  return {
    id: `${name}-${index}`,
  };
}
const ButtonTabs = (props: IComponent) => {
  const { canEdit, buttons } = props;
  return (
    <ThemeProvider theme={theme}>
      <ButtonsContent>
        {buttons.map(
          (
            { name, variant, background, onClick, show, component }: IButtons,
            index: number
          ) => (
            <>
              {(show || canEdit) && (
                <Button
                  variant={variant}
                  color={background}
                  onClick={onClick}
                  key={index}
                  // {...IButtons}
                >
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ cursor: "pointer" }}
                  >
                    {name}
                  </Typography>
                  {component}
                </Button>
              )}
            </>
          )
        )}
      </ButtonsContent>
    </ThemeProvider>
  );
};

export default React.memo(ButtonTabs);
