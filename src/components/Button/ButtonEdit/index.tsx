import React from 'react';
import {Button, Grid} from "@material-ui/core";
import {Edit} from "@material-ui/icons";


interface IComponent {
  setCanEdit: Function;
  canEdit: boolean;
}

const ButtonEdit = (props: IComponent) => {
  const {setCanEdit, canEdit} = props;

  return (
    <Grid item md={2} xs={12} style={{paddingTop: "5px"}}>
      <Button style={{ marginLeft: 15, color: '#0899BA' }} onClick={() => setCanEdit(!canEdit)}>
        <Edit style={{ marginRight: 5, width: 18 }} />
        Editar
      </Button>
    </Grid>
  );
}

export default React.memo(ButtonEdit);
