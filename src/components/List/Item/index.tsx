import React from "react";

import { ListItem as ListItemComponent, ListItemContent } from "./styles";

const ListItem = (props: any) => {
  return (
    <ListItemComponent variant="outlined">
      <ListItemContent>{props.children}</ListItemContent>
    </ListItemComponent>
  );
};

export default React.memo(ListItem);
