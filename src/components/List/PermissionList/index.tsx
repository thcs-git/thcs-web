import React from 'react';
import {TableCell, TableRow} from "@material-ui/core";
import {ItemTable, ListItemStatus, ListLink} from "../../../pages/customer/list/styles";
import {formatDate} from "../../../helpers/date";
import Table from "../../Table";
import ButtonEdit from "../../Button/ButtonEdit";
import ButtonView from "../../Button/ButtonView";
import {useHistory} from "react-router-dom";

interface IComponent {
  customerState: any;
  mode: string;
}

const PermissionList = (props: IComponent) => {
  const {customerState, mode} = props;
  const history = useHistory();

  return (
    <Table
      tableCells={
        [
          {name: "Nome da Permissão", align: "left"},
          {name: "Estado", align: "left"},
          {name: "Adicionado em", align: "center"},
          {name: "Vizualizar", align: "center"},
          {name: "Editar", align: "center"},
        ]
      }>
      {customerState.data.usertypes?.map(({_id, active, created_at, name, permissions}: any, index: number) => (
        <TableRow key={`${name}_${index}`}>
          <TableCell align="left">
            <ItemTable>
              <ListLink key={permissions} to={`/client/${customerState.data._id}/permission/${permissions}/view/`}>
                {name}
              </ListLink>
            </ItemTable>
          </TableCell>
          <TableCell align="center"><ListItemStatus
            active={active}>{active ? 'Ativo' : 'Inativo'}</ListItemStatus></TableCell>
          <TableCell align="center">{formatDate(created_at, 'DD/MM/YYYY')}</TableCell>
          <TableCell align="center">
            <ButtonView canEdit={true} setCanEdit={() => history.push(`/client/${customerState.data._id}/permission/${permissions}/view/`)}>
            </ButtonView>
          </TableCell>
          <TableCell align="center">
            <ButtonEdit canEdit={true} setCanEdit={() => history.push(`/client/${customerState.data._id}/permission/${permissions}/edit/`)}>
            </ButtonEdit>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export default React.memo(PermissionList);
