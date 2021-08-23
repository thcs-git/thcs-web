import React from 'react';
import {TableCell, TableRow} from "@material-ui/core";
import {ItemTable, ListItemStatus} from "../../../pages/customer/list/styles";
import {ListLink} from "./styles"
import {formatDate} from "../../../helpers/date";
import Table from "../../Table";
import ButtonEdit from "../../Button/ButtonEdit";
import ButtonView from "../../Button/ButtonView";
import {useHistory} from "react-router-dom";
import {ButtonStyle} from "./styles";
import {ButtonsContent} from "../../Button/ButtonTabs/styles";
import {useDispatch} from "react-redux";
import {loadPermissionRequest} from "../../../store/ducks/customers/actions";

interface IComponent {
  customerState: any;
  mode: string;
}

const PermissionList = (props: IComponent) => {
  const {customerState, mode} = props;
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <ButtonsContent>
        <ButtonStyle onClick={() => history.push(`/client/${customerState.data._id}/permission/create/`)}>Novo</ButtonStyle>
      </ButtonsContent>
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
                {/*<ListLink key={permissions} to={`/client/${customerState.data._id}/permission/${permissions}/view/`}>*/}
                {/*  {name}*/}
                {/*</ListLink>*/}
                <ListLink onClick={() => {
                  history.push(`/client/${customerState.data._id}/permission/${permissions}/view/`)
                  // dispatch(loadPermissionRequest(permissions))
                }}>
                  {name}
                </ListLink>
              </ItemTable>
            </TableCell>
            <TableCell align="center"><ListItemStatus
              active={active}>{active ? 'Ativo' : 'Inativo'}</ListItemStatus></TableCell>
            <TableCell align="center">{formatDate(created_at, 'DD/MM/YYYY')}</TableCell>
            <TableCell align="center">
              <ButtonView canEdit={true}
                          setCanEdit={() => {
                            history.push(`/client/${customerState.data._id}/permission/${permissions}/view/`)
                            // dispatch(loadPermissionRequest(permissions))
                          }}>
              </ButtonView>
            </TableCell>
            <TableCell align="center">
              <ButtonEdit canEdit={true}
                          setCanEdit={() => {
                            history.push(`/client/${customerState.data._id}/permission/${permissions}/edit/`)
                            // dispatch(loadPermissionRequest(permissions))
                          }}>
              </ButtonEdit>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  );
}

export default React.memo(PermissionList);
