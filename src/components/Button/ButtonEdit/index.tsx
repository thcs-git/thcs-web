import React, { ReactNode } from "react";
import { Button, Grid } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import { ReactComponent as IconEdit } from "../../../assets/img/icon editar.svg";

interface IComponent {
  setCanEdit: any;
  canEdit: boolean;
  children?: ReactNode;
}

const ButtonEdit = (props: IComponent) => {
  const { setCanEdit, canEdit, children } = props;

  return (
    <Grid item md={2} xs={12} style={{ paddingTop: "5px" }}>
      <button
        onClick={setCanEdit}
        style={{
          cursor: "pointer",
          border: "2px solid var(--secondary)",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "4px",
          gap: "6px",
        }}
      >
        <IconEdit style={{ cursor: "pointer" }} />
        <Box
          style={{
            cursor: "pointer",
            fontSize: "10px",
            color: "var(--secondary)",
            fontWeight: "bold",
          }}
        >
          Editar
        </Box>
      </button>

      {/* <Button style={{ marginLeft: 15, color: '#0899BA' }} onClick={setCanEdit}>
        <Edit style={{ marginRight: 5, width: 18 }} />
        {children}
      </Button> */}
    </Grid>
  );
};

export default React.memo(ButtonEdit);
