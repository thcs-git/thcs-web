import React, { Props } from 'react';

import {
  ListItem as ListItemComponent,
  ListItemContent
} from './styles';

export default function ListItem(props: Props<any>) {
  return (
    <ListItemComponent variant="outlined">
      <ListItemContent>
        {props.children}
      </ListItemContent>
    </ListItemComponent>
  );
}
