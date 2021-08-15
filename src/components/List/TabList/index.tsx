import React from 'react';
import {TableCell, TableRow} from "@material-ui/core";
import {ItemTable, ListItemStatus, ListLink} from "../../../pages/customer/list/styles";
import {formatDate} from "../../../helpers/date";
import Table from "../../Table";
import ButtonEdit from "../../Button/ButtonEdit";
import ButtonView from "../../Button/ButtonView";


interface IComponent {
  cells: ICells[];
  customerState: any;
  rows: [];
  rowsItems: [string];
}

interface ICells {
  name: string;
  align: 'right' | 'left' | 'center';
  width?: string;
}

interface Irows {
  _id: string;
  permissions: string;
  active: boolean;
  created_at: string;
  name: string;
  link?: string;
  key?: string;
}

const TabList = (props: IComponent) => {
  const {cells, customerState, rows, rowsItems} = props;
  console.log(rowsItems)

  return (
    <Table
      tableCells={cells}>
      {/*{rows?.map((row: any, index: number) => (*/}
      {/*  <>*/}
      {/*    {rowsItems.map((item:string, index:number) => (*/}
      {/*      <>*/}
      {/*        <TableCell align="center">*/}
      {/*          <ListItemStatus active={row[item]}>*/}
      {/*            {row[item] ? 'Ativo' : 'Inativo'}*/}
      {/*          </ListItemStatus>*/}
      {/*        </TableCell>*/}
      {/*      </>*/}
      {/*    ))}*/}
      {/*  </>*/}
      {/*))}*/}
      {customerState.data.usertypes?.map(({_id, active, created_at, name, permissions}: Irows, index: number) => (
        <TableRow key={`${name}_${index}`}>
          <TableCell align="left">
            <ItemTable>
              <ListLink key={permissions} to={`/permission/${permissions}/view/`}>
                {name}
              </ListLink>
            </ItemTable>
          </TableCell>
          <TableCell align="center"><ListItemStatus
            active={active}>{active ? 'Ativo' : 'Inativo'}</ListItemStatus></TableCell>
          <TableCell align="center">{formatDate(created_at, 'DD/MM/YYYY')}</TableCell>
          <TableCell align="center">
            <ButtonView canEdit={true} setCanEdit={() => false}>
            </ButtonView>
          </TableCell>
          <TableCell align="center">
            <ButtonEdit canEdit={true} setCanEdit={() => false}>
            </ButtonEdit>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export default React.memo(TabList);
