import React from "react";

//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { ItemTable, ListItemStatus } from "../../../pages/customer/list/styles";
import { ListLink } from "./styles";
import { formatDate } from "../../../helpers/date";
// import Table from "../../Table";
import ButtonEdit from "../../Button/ButtonEdit";
import ButtonView from "../../Button/ButtonView";
import { useHistory } from "react-router-dom";
import { ButtonStyle } from "./styles";
import { ButtonsContent } from "../../Button/ButtonTabs/styles";
import { useDispatch } from "react-redux";
import { loadPermissionRequest } from "../../../store/ducks/customers/actions";

interface IComponent {
  customerState: any;
  mode: string;
}

const PermissionList = (props: IComponent) => {
  const { customerState, mode } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const headData: string[] = ["Função", "Status", "Adicionado em", "", ""];

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {headData.map((item: string) => {
              return (
                <TableCell
                  style={{ color: "var(--gray-dark)", fontSize: "12px" }}
                >
                  {item}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {customerState.data.usertypes?.map(
            (
              { _id, active, created_at, name, permissions }: any,
              index: number
            ) => {
              return (
                <TableRow key={`${name}_${index}`}>
                  <TableCell align="left">
                    <ItemTable
                      style={{ color: "var(--black)" }}
                      onClick={() => {
                        history.push(
                          `/client/${customerState.data._id}/permission/${permissions}/view/`
                        );
                      }}
                    >
                      {name}
                    </ItemTable>
                  </TableCell>
                  <TableCell align="left">
                    <ListItemStatus active={active}>
                      {active ? "Ativo" : "Inativo"}
                    </ListItemStatus>
                  </TableCell>
                  <TableCell align="left">
                    {formatDate(created_at, "DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="left">
                    <ButtonView
                      canEdit={true}
                      setCanEdit={() => {
                        history.push(
                          `/client/${customerState.data._id}/permission/${permissions}/view/`
                        );
                      }}
                    ></ButtonView>
                  </TableCell>
                  <TableCell align="left">
                    <ButtonEdit
                      canEdit={true}
                      setCanEdit={() => {
                        history.push(
                          `/client/${customerState.data._id}/permission/${permissions}/edit/`
                        );
                      }}
                    ></ButtonEdit>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default React.memo(PermissionList);
