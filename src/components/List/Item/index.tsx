import React, { Props } from 'react';

import {
  ListItem as ListItemComponent,
  ListItemContent
} from './styles';

const ListItem = (props: Props<any>) => {
  return (
    <ListItemComponent variant="outlined">
      <ListItemContent>
        {props.children}
      </ListItemContent>
    </ListItemComponent>
  );
}

export default React.memo(ListItem);
