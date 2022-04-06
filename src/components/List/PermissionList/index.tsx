import React, { useEffect, useState } from "react";
// Redux e Redux-saga
import { ApplicationState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";

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
import {
  loadPermissionRequest,
  cleanAction,
} from "../../../store/ducks/customers/actions";

//Componentes
import PermissionForm from "../../Inputs/Forms/PermisionForm";
import ButtonTabs from "../../Button/ButtonTabs";
// utils
import {
  checkViewPermission,
  checkEditPermission,
} from "../../../utils/permissions";
import { toast } from "react-toastify";
import NoPermission from "../../Erros/NoPermission";
interface IComponent {
  customerState: any;
  mode: string;
  propsPermissionForm?: any;
}

const PermissionList = (props: IComponent) => {
  const { customerState, mode, propsPermissionForm } = props;
  const {
    state,
    setState,
    userState,
    params,
    canEditPermission,
    buttonsPermission,
    modePermission,
    setModePermission,
  } = propsPermissionForm;
  const dispatch = useDispatch();
  const history = useHistory();
  const [idPermission, setIdPermission] = useState("");
  const rightsOfLayoutState = useSelector(
    (state: ApplicationState) => state.layout.data.rights
  );
  const headData: string[] = ["Função", "Status", "Adicionado em", "", ""];

  useEffect(() => {
    if (modePermission === "view" || modePermission === "edit") {
      dispatch(loadPermissionRequest(idPermission));
    }
  }, [modePermission]);

  return (
    <>
      {modePermission === "start" ? (
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
                          !checkViewPermission(
                            "permissions",
                            JSON.stringify(rightsOfLayoutState)
                          )
                            ? toast.error(
                                "Você não tem permissão para visualizar permissões."
                              )
                            : setModePermission("view");
                          setIdPermission(permissions);

                          // history.push(
                          //   `/client/${customerState.data._id}/permission/${permissions}/view/`
                          // );
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
                    <TableCell align="left" style={{ color: "var(--black)" }}>
                      {formatDate(created_at, "DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell align="left">
                      <ButtonView
                        canEdit={true}
                        setCanEdit={() => {
                          !checkViewPermission(
                            "permissions",
                            JSON.stringify(rightsOfLayoutState)
                          )
                            ? toast.error(
                                "Você não tem permissão para visualizar permissões."
                              )
                            : setModePermission("view");
                          setIdPermission(permissions);
                        }}
                      ></ButtonView>
                    </TableCell>
                    <TableCell align="left">
                      <ButtonEdit
                        canEdit={true}
                        setCanEdit={() => {
                          !checkEditPermission(
                            "permissions",
                            JSON.stringify(rightsOfLayoutState)
                          )
                            ? toast.error(
                                "Você não tem permissão para editar permissões."
                              )
                            : setModePermission("edit");
                          setIdPermission(permissions);

                          // history.push(
                          //   `/client/${customerState.data._id}/permission/${permissions}/edit/`
                          // );
                        }}
                      ></ButtonEdit>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      ) : modePermission === "view" ? (
        <>
          {checkViewPermission(
            "permissions",
            JSON.stringify(rightsOfLayoutState)
          ) ? (
            <>
              <PermissionForm
                state={state}
                setState={setState}
                customerState={customerState}
                userState={userState}
                params={params}
                modePermission={modePermission}
                idPermission={idPermission}
              />
              <ButtonTabs canEdit={false} buttons={buttonsPermission} />
            </>
          ) : (
            <NoPermission />
          )}
        </>
      ) : modePermission === "edit" || modePermission === "create" ? (
        <>
          {checkEditPermission(
            "permissions",
            JSON.stringify(rightsOfLayoutState)
          ) ? (
            <>
              <PermissionForm
                state={state}
                setState={setState}
                customerState={customerState}
                userState={userState}
                params={params}
                modePermission={modePermission}
                idPermission={idPermission}
              />
              <ButtonTabs canEdit={true} buttons={buttonsPermission} />
            </>
          ) : (
            <NoPermission />
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default React.memo(PermissionList);
