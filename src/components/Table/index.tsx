import React, { ReactNode, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
MenuItem;
import FilterListIcon from "@material-ui/icons/FilterList";
import Checkbox from "@material-ui/core/Checkbox";
import { MoreVert } from "@material-ui/icons";

import Button from "../Button";
import { MenuFilter as Menu, Th } from "./styles";
import { UserInterface, UserState } from "../../store/ducks/users/types";
import { MenuItem, Tooltip } from "@material-ui/core";
import MoreHorizTwoToneIcon from "@material-ui/icons/MoreHorizTwoTone";
import { ListItemStatus } from "../../pages/userclient/list/styles";
import { any } from "cypress/types/bluebird";
import { formatDate } from "../../helpers/date";
interface ICellProps {
  name: string;
  align: "right" | "left" | "center";
  width?: string;
}

interface ITableProps {
  tableCells: ICellProps[];
  hasFilter?: boolean;
  fieldsFilter?: Array<string>;
  onChangeFilter?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  userState?: UserState;
  handleEmpty?: (event: any) => any;
  handleCpf?: (value: string) => string | undefined;
  integration?: string | null;
  users?: UserInterface[];
  handleLinkedAt?: (user: any) => any;
  handleActive?: (user: any) => any;
  handleOpenRowMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleCloseRowMenu?: () => void;
}

const TableComponent = (props: ITableProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {
    userState,
    handleCpf,
    handleEmpty,
    integration,
    handleLinkedAt,
    handleActive,
    handleOpenRowMenu,
    handleCloseRowMenu,
  } = props;
  const history = useHistory();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  console.log(props);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.tableCells.map((cell, index) => (
              <TableCell
                key={`cell_${index}`}
                align={cell.align}
                style={{
                  width: `${cell.width}`,
                  color: "var(--gray-dark)",
                }}
              >
                {cell.name}
              </TableCell>
            ))}

            {props.hasFilter && (
              <Th>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  size="small"
                >
                  <FilterListIcon />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <p>Filtrar resultados por</p>
                  {props.fieldsFilter?.map((field, fieldIndex) => (
                    <li key={`fields_filter_${fieldIndex}`}>
                      <Checkbox name={field} onChange={props.onChangeFilter} />
                      {field}
                    </li>
                  ))}
                </Menu>
              </Th>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {userState &&
            integration &&
            userState?.list.data.map((user, index) => (
              <TableRow key={`user_${index}`}>
                <TableCell align="left">
                  <Link key={index} to={`/userclient/${user._id}/view`}>
                    {user?.name}
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Link key={index} to={`/userclient/${user._id}/view`}>
                    {user?.username}
                  </Link>
                </TableCell>
                {handleEmpty && handleCpf && (
                  <TableCell>
                    {handleEmpty(handleCpf(user?.fiscal_number))}
                  </TableCell>
                )}
                {handleEmpty && (
                  <TableCell>
                    {handleEmpty(user?.profession_id?.name)}
                  </TableCell>
                )}

                <TableCell align="left">
                  <div style={{ display: "flex" }}>
                    <p style={{ marginTop: "0.3rem" }}>
                      {user.main_specialty_id?.name
                        ? user.main_specialty_id?.name
                        : "-"}
                    </p>

                    {user.specialties.length > 0 ? (
                      <Tooltip
                        style={{ fontSize: "10pt", marginTop: "0.8rem" }}
                        title={user.specialties.map(
                          (specialty, index) =>
                            `${specialty.name}${
                              index < user.specialties.length - 1 ? ", " : ""
                            }`
                        )}
                      >
                        <MoreHorizTwoToneIcon />
                      </Tooltip>
                    ) : (
                      ""
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}

          {userState &&
            !integration &&
            userState?.list.data.map((user, index) => (
              <TableRow key={`user_${index}`}>
                {" "}
                <TableCell align="left">
                  <Link key={index} to={`/userclient/${user._id}/view`}>
                    {user?.name}
                  </Link>
                </TableCell>
                {handleCpf && (
                  <TableCell>{handleCpf(user.fiscal_number)}</TableCell>
                )}
                <TableCell>{user?.profession_id?.name}</TableCell>
                <TableCell align="left">
                  <div style={{ display: "flex" }}>
                    <p style={{ marginTop: "0.3rem" }}>
                      {user.main_specialty_id?.name}
                    </p>
                    {user.specialties.length > 0 ? (
                      <Tooltip
                        style={{ fontSize: "10pt", marginTop: "0.8rem" }}
                        title={user.specialties.map(
                          (specialty, index) =>
                            `${specialty.name}${
                              index < user.specialties.length - 1 ? "," : ""
                            }`
                        )}
                      >
                        <MoreHorizTwoToneIcon />
                      </Tooltip>
                    ) : null}
                  </div>
                </TableCell>
                {/*<TableCell>*/}
                {/*  {user?.main_specialty_id?.name}*/}
                {/*</TableCell>*/}
                {/*<TableCell align="center">*/}
                {/*  {user.specialties.length > 0 ? (*/}
                {/*    <ListItem>*/}
                {/*      <Button onClick={() => toggleHistoryModal(index)}>*/}
                {/*        <AddIcon style={{color: '#0899BA', cursor: "pointer"}}/>*/}
                {/*      </Button>*/}
                {/*      /!* <Menu*/}
                {/*        id={`user-speciality${index}`}*/}
                {/*        anchorEl={anchorEl}*/}
                {/*        keepMounted*/}
                {/*        open={anchorEl?.id === `btn_user-speciality${index}`}*/}
                {/*        onClose={handleCloseRowMenu}*/}
                {/*      >*/}
                {/*        <MenuItem style={{ cursor: "default", fontSize: "13pt", fontFamily: "Open Sans Bold" }}><h4>Principal</h4></MenuItem>*/}
                {/*        <MenuItem style={{ cursor: "default", fontSize: "10pt", fontFamily: "Open Sans Regular"}}>{user.main_specialty_id.name}</MenuItem>*/}
                {/*        <MenuItem style={{ cursor: "default", fontSize: "13pt", fontFamily: "Open Sans Bold"}}><h4>Secundária</h4></MenuItem>*/}
                {/*        <MenuItem style={{ cursor: "default", fontSize: "10pt", fontFamily: "Open Sans Regular"}}>{user.specialties.map((specialty, index) => (*/}
                {/*          `${specialty.name}${index < (user.specialties.length - 1) ? ',' : ''}`*/}
                {/*        ))}</MenuItem>*/}
                {/*      </Menu> *!/*/}
                {/*    </ListItem>*/}
                {/*  ) : (null)*/}
                {/*  }*/}
                {/*</TableCell>*/}
                <TableCell>
                  {handleLinkedAt &&
                    formatDate(handleLinkedAt(user), "DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {handleActive && (
                    <ListItemStatus active={handleActive(user)}>
                      {handleActive(user) ? "Ativo" : "Inativo"}
                    </ListItemStatus>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    aria-controls={`user-menu${index}`}
                    id={`btn_user-menu${index}`}
                    aria-haspopup="true"
                    onClick={handleOpenRowMenu}
                  >
                    <MoreVert style={{ color: "#0899BA" }} />
                  </Button>
                  <Menu
                    id={`user-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_user-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    {/*<MenuItem onClick={() => history.push(`/user/${user._id}/edit/edit`)}>Editar</MenuItem>*/}
                    <MenuItem
                      onClick={() =>
                        history.push(`/userclient/${user._id}/view`)
                      }
                    >
                      Visualizar
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}

          {!userState && props.children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(TableComponent);
