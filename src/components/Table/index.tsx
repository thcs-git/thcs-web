import React, {ReactNode, useCallback} from "react";
import {useHistory, Link} from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {Visibility as VisibilityIcon} from "@material-ui/icons";

MenuItem;
import FilterListIcon from "@material-ui/icons/FilterList";
import Checkbox from "@material-ui/core/Checkbox";
import {MoreVert} from "@material-ui/icons";
import {ComplexityStatus} from "../../styles/components/Table";

import Button from "../Button";
import {MenuFilter as Menu, Th} from "./styles";
import {UserInterface, UserState} from "../../store/ducks/users/types";
import {MenuItem, Tooltip} from "@material-ui/core";
import MoreHorizTwoToneIcon from "@material-ui/icons/MoreHorizTwoTone";
import {ListItemStatus} from "../../pages/userclient/list/styles";
import {any} from "cypress/types/bluebird";
import {formatDate} from "../../helpers/date";
import {PatientState} from "../../store/ducks/patients/types";
import {CareState, CareInterface} from "../../store/ducks/cares/types";

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
  patientState?: PatientState;
  careState?: CareState;
  careFilter?: any;
  toggleHistoryModal?: (index: number, patient: any) => void;
  toggleHistoryModal_2?: (index: number, patient: any) => void;
  handleComplexity?: (complexity: any) => any;
  attendanceHistory?: any;
}

const TableComponent = (props: ITableProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {
    userState,
    patientState,
    careState,
    careFilter,
    handleCpf,
    integration,
    handleLinkedAt,
    handleActive,
    toggleHistoryModal,
    toggleHistoryModal_2,
    handleComplexity,
    attendanceHistory,
  } = props;
  const history = useHistory();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleOpenRowMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );

  function handleEmpty(value: any) {
    return value ? value : "-";
  }
  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
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
                  <FilterListIcon/>
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
                      <Checkbox name={field} onChange={props.onChangeFilter}/>
                      {field}
                    </li>
                  ))}
                </Menu>
              </Th>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* table de user e userClient c/ integração */}
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
                {handleCpf && (
                  <TableCell>
                    {handleEmpty(handleCpf(user?.fiscal_number))}
                  </TableCell>
                )}
                {
                  <TableCell>
                    {handleEmpty(user?.profession_external)}
                  </TableCell>
                }

                <TableCell align="left">
                  <div style={{display: "flex"}}>
                    <p style={{marginTop: "0.3rem"}}>
                      {user.main_specialty_external
                        ? user.main_specialty_external
                        : "-"}
                    </p>

                    {user?.specialties_external ? (
                      <Tooltip
                        style={{fontSize: "10pt", marginTop: "0.8rem"}}
                        title={user.specialties_external}
                      >
                        <MoreHorizTwoToneIcon/>
                      </Tooltip>
                    ) : (
                      ""
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}

          {/* table de user e userClient s/ integração */}

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
                <TableCell>
                  {user?.profession_id?.name ? user.profession_id.name : "-"}
                </TableCell>
                <TableCell align="left">
                  <div style={{display: "flex"}}>
                    <p style={{marginTop: "0.3rem"}}>
                      {user.main_specialty_id?.name}
                    </p>
                    {user.specialties.length > 0 ? (
                      <Tooltip
                        style={{fontSize: "10pt", marginTop: "0.8rem"}}
                        title={user.specialties.map(
                          (specialty, index) =>
                            `${specialty.name}${
                              index < user.specialties.length - 1 ? "," : ""
                            }`
                        )}
                      >
                        <MoreHorizTwoToneIcon/>
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
                    <MoreVert style={{color: "#0899BA"}}/>
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
          {/* table de patient c/ integração */}
          {patientState &&
            integration &&
            patientState.list.data.map((patient, index) => (
              <TableRow key={`patient_${index}`}>
                <TableCell align="left">
                  <Link key={index} to={`/patient/${patient?._id}/view`}>
                    {patient._id}
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Link key={index} to={`/patient/${patient?._id}/view`}>
                    {patient.social_status ? patient.social_name : patient.name}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  {formatDate(patient.birthdate, "DD/MM/YYYY")}
                </TableCell>
                <TableCell align="center">
                  {patient.fiscal_number ? patient.fiscal_number : "-"}
                </TableCell>
                <TableCell align="left">{patient.mother_name}</TableCell>
              </TableRow>
            ))}

          {/* table de patient c/ integração */}
          {/* {console.log(integration, patientState?.list.data)} */}
          {patientState &&
            !integration &&
            patientState.list.data.map((patient, index) => (
              <TableRow key={`patient_${index}`}>
                <TableCell align="left">
                  <Link key={index} to={`/patient/${patient?._id}/view/edit`}>
                    {patient.social_name || patient.name}
                  </Link>
                </TableCell>
                <TableCell align="left">{patient.fiscal_number}</TableCell>
                <TableCell align="left">{patient.mother_name}</TableCell>
                <TableCell align="left">
                  {formatDate(patient.created_at, "DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell align="center">
                  {handleOpenRowMenu && (
                    <Button
                      aria-controls={`patient-menu${index}`}
                      id={`btn_patient-menu${index}`}
                      aria-haspopup="true"
                      onClick={handleOpenRowMenu}
                    >
                      <MoreVert style={{color: "#0899BA"}}/>
                    </Button>
                  )}

                  <Menu
                    id={`patient-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_patient-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    <MenuItem
                      onClick={() =>
                        history.push(`/patient/${patient._id}/edit/edit`)
                      }
                    >
                      Editar
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        history.push(`/patient/${patient._id}/view/edit`)
                      }
                    >
                      Visualizar
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        history.push(
                          `/patient/capture/create?patient_id=${patient._id}`
                        )
                      }
                    >
                      Iniciar captação
                    </MenuItem>
                    {toggleHistoryModal && (
                      <MenuItem
                        onClick={() => toggleHistoryModal(index, patient)}
                      >
                        Histórico de captação
                      </MenuItem>
                    )}
                    {toggleHistoryModal_2 && (
                      <MenuItem
                        onClick={() => toggleHistoryModal_2(index, patient)}
                      >
                        Histórico de atendimento
                      </MenuItem>
                    )}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}

          {/* table de care/list c/ integração */}
          {/*{careState &&*/}
          {/*integration &&*/}
          {/*careState?.list?.data ? careState?.list?.data?.map((care: CareInterface, index: number) => (*/}
          {/*  <TableRow key={`care_${index}`}>*/}
          {/*    <TableCell>*/}
          {/*      <Link to={`/care/${care._id}/overview`}>*/}
          {/*        {handleEmpty(care._id)}*/}
          {/*      </Link>*/}
          {/*    </TableCell>*/}
          {/*    <TableCell>*/}
          {/*      <Link to={`/care/${care._id}/overview`}>*/}
          {/*        {care.patient_id?.social_status*/}
          {/*          ? handleEmpty(care.patient_id.social_name)*/}
          {/*          : handleEmpty(care.patient_id.name)}*/}
          {/*      </Link>*/}
          {/*    </TableCell>*/}
          {/*    <TableCell align="center">{handleEmpty(care?.tipo)}</TableCell>*/}
          {/*    <TableCell align="center">*/}
          {/*      {handleEmpty(care.patient_id?.fiscal_number)}*/}
          {/*    </TableCell>*/}
          {/*    <TableCell align="center">*/}
          {/*      {care?.created_at*/}
          {/*        ? formatDate(care?.created_at ?? "", "DD/MM/YYYY HH:mm:ss")*/}
          {/*        : "-"}*/}
          {/*    </TableCell>*/}
          {/*  </TableRow>*/}
          {/*)) : null}*/}

          {/*Historico de Atendimento*/}
          {attendanceHistory &&
            attendanceHistory.data.map((care: any, index: number) => (
              <TableRow key={`patient_${index}`}>
                <TableCell>
                  <p>{care?.created_at ? formatDate(care?.created_at ?? "", "DD/MM/YYYY") : "-"}</p>
                </TableCell>
                <TableCell align="center">
                  <p>{care?._id}</p>
                </TableCell>
                <TableCell>
                  <p>{care?.released_at ? formatDate(care?.released_at ?? "", "DD/MM/YYYY") : "-"}</p>
                </TableCell>
                {/*<TableCell align="center">*/}
                {/*  <p>*/}
                {/*    {typeof care?.care_type_id === "object"*/}
                {/*      ? care?.care_type_id.name*/}
                {/*      : care?.care_type_id}*/}
                {/*  </p>*/}
                {/*</TableCell>*/}
                <TableCell>
                  {care?.tipo}
                </TableCell>
                <TableCell align="center">
                  <p>{care?.company_id}</p>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => history.push(`/care/${care?._id}/overview`)}>
                    <VisibilityIcon style={{color: '#0899BA'}}/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}

          {careFilter &&
            !integration &&
            careFilter.map((care: CareInterface, index: number) => (
              <TableRow key={`care_${index}`}>
                <TableCell>{care?._id}</TableCell>
                <TableCell>
                  <Link to={`/care/${care._id}/overview`}>
                    {care.patient_id?.social_name || care.patient_id?.name}
                  </Link>
                </TableCell>
                {/*<TableCell>*/}
                {/*  {typeof care?.care_type_id === "object"*/}
                {/*    ? care?.care_type_id.name*/}
                {/*    : care?.care_type_id}*/}
                {/*</TableCell>*/}
                <TableCell>
                  {care?.tipo}
                </TableCell>
                <TableCell>{care.patient_id?.fiscal_number}</TableCell>

                {/*<TableCell align="center">*/}
                {/*  {care?.started_at*/}
                {/*    ? formatDate(care?.started_at ?? "", "DD/MM/YYYY HH:mm:ss")*/}
                {/*    : "-"}*/}
                {/*</TableCell>*/}
                <TableCell align="center">
                  {care?.created_at
                    ? formatDate(care?.created_at ?? "", "DD/MM/YYYY HH:mm:ss")
                    : "-"}
                </TableCell>
                <TableCell align="left">
                  <ComplexityStatus
                    status={care?.complexity || care?.capture?.complexity}
                  >
                    <p>
                      {handleComplexity &&
                        handleComplexity(
                          care?.complexity || care?.capture?.complexity
                        )}
                    </p>
                  </ComplexityStatus>
                </TableCell>
                <TableCell>
                  <Button
                    aria-controls={`simple-menu${index}`}
                    id={`btn_simple-menu${index}`}
                    aria-haspopup="true"
                    onClick={handleOpenRowMenu}
                  >
                    <MoreVert style={{color: "#0899BA"}}/>
                  </Button>
                  <Menu
                    id={`simple-menu${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={anchorEl?.id === `btn_simple-menu${index}`}
                    onClose={handleCloseRowMenu}
                  >
                    {toggleHistoryModal && (
                      <MenuItem onClick={() => {
                        toggleHistoryModal(index, care)
                        handleCloseRowMenu()
                      }
                      }>
                        Histórico
                      </MenuItem>
                    )}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}

          {!userState &&
            !patientState &&
            !careState &&
            !careFilter &&
            props.children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(TableComponent);
