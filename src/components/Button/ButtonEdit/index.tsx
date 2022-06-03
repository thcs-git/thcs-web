import React, { ReactNode } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import { ReactComponent as IconEdit } from "../../../assets/img/icon editar.svg";
import EditIcon from "../../Icons/Edit";
import theme from "../../../theme/theme";
interface IComponent {
  setCanEdit: any;
  canEdit: boolean;
  children?: ReactNode;
}

const ButtonEdit = (props: IComponent) => {
  const { setCanEdit, canEdit, children } = props;

  return (
    <Grid item md={2} xs={12} style={{ paddingTop: "5px" }}>
      <Button
        color="secondary"
        onClick={setCanEdit}
        sx={{
          cursor: "pointer",
          border: `2px solid ${theme.palette.secondary.main}`,
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "4px",
          gap: "6px",
          textTransform: "capitalize",
          "& svg, path": { cursor: "pointer" },
        }}
      >
        <EditIcon fill={theme.palette.secondary.main} />
        <Box
          sx={{
            cursor: "pointer",
            fontSize: "10px",
            color: theme.palette.secondary.main,
            fontWeight: "bold",
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            fontSize="0.625rem"
            sx={{ cursor: "pointer" }}
          >
            Editar
          </Typography>
        </Box>
      </Button>

      {/* <Button style={{ marginLeft: 15, color: '#0899BA' }} onClick={setCanEdit}>
        <Edit style={{ marginRight: 5, width: 18 }} />
        {children}
      </Button> */}
    </Grid>
  );
};

export default React.memo(ButtonEdit);
