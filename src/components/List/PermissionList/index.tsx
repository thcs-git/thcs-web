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
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { formatDate } from "../../../helpers/date";
// import Table from "../../Table";
import ButtonEdit from "../../Button/ButtonEdit";
import ButtonView from "../../Button/ButtonView";
import { useHistory } from "react-router-dom";

import {
  loadPermissionRequest,
  cleanAction,
} from "../../../store/ducks/customers/actions";

//Componentes
import PermissionForm from "../../Inputs/Forms/PermisionForm";
import ButtonTabs from "../../Button/ButtonTabs";
// styles
import { ItemTable, ListItemStatus } from "../../../pages/customer/list/styles";
import { ListLink, ButtonStyle } from "./styles";
import { ButtonsContent } from "../../Button/ButtonTabs/styles";
import theme from "../../../theme/theme";
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
  interface ICellProps {
    cellName: string;
    align: "left" | "center" | "inherit" | "right" | "justify" | undefined;
  }
  const headData: ICellProps[] = [
    { cellName: "Função", align: "left" },
    { cellName: "Status", align: "center" },
    { cellName: "Adicionado em", align: "center" },
    { cellName: "", align: "center" },
    { cellName: "", align: "center" },
  ];

  useEffect(() => {
    if (modePermission === "view" || modePermission === "edit") {
      dispatch(loadPermissionRequest(idPermission));
    }
  }, [modePermission]);

  return (
    <>
      <ThemeProvider theme={theme}>
        {modePermission === "start" ? (
          <Table>
            <TableHead>
              <TableRow>
                {headData.map((item: ICellProps) => {
                  return (
                    <TableCell align={item.align}>
                      <Typography variant="body1" color="GrayText">
                        {item.cellName}
                      </Typography>
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
                    <TableRow key={`${name}_${index}`} hover>
                      <TableCell
                        sx={{ cursor: "pointer" }}
                        align="left"
                        onClick={() => {
                          !checkViewPermission(
                            "permission",
                            JSON.stringify(rightsOfLayoutState)
                          )
                            ? toast.error(
                                "Você não tem permissão para visualizar permissões."
                              )
                            : setModePermission("view");
                          setIdPermission(permissions);
                        }}
                      >
                        <Typography variant="body2" sx={{ cursor: "pointer" }}>
                          {name}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          variant="body2"
                          align="center"
                          fontWeight={600}
                          color={
                            active
                              ? theme.palette.success.main
                              : theme.palette.error.main
                          }
                        >
                          {active ? "Ativo" : "Inativo"}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="body2">
                          {formatDate(created_at, "DD/MM/YYYY HH:mm")}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <ButtonView
                          canEdit={true}
                          setCanEdit={() => {
                            !checkViewPermission(
                              "permission",
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
                              "permission",
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
              "permission",
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
              "permission",
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
      </ThemeProvider>
    </>
  );
};

export default React.memo(PermissionList);
