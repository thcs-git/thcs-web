import React, {ReactNode} from 'react';
import {Button, Grid} from "@material-ui/core";
import {Edit} from "@material-ui/icons";


interface IComponent {
  setCanEdit: any;
  canEdit: boolean;
  children?: ReactNode;
}

const ButtonEdit = (props: IComponent) => {
  const {setCanEdit, canEdit, children} = props;

  return (
    <Grid item md={2} xs={12} style={{paddingTop: "5px"}}>
      <Button style={{ marginLeft: 15, color: '#0899BA' }} onClick={setCanEdit}>
        <Edit style={{ marginRight: 5, width: 18 }} />
        {children}
      </Button>
    </Grid>
  );
}

export default React.memo(ButtonEdit);
