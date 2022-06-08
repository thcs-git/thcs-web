import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
} from "react";
import { useHistory } from "react-router-dom";

import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  loadRequest,
  searchRequest,
} from "../../../store/ducks/prescripition/actions";
import { PrescriptionInterface } from "../../../store/ducks/prescripition/types";

import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import PaginationComponent from "../../../components/Pagination";
import Loading from "../../../components/Loading";
import Sidebar from "../../../components/Sidebar";
import SearchComponent from "../../../components/List/Search";
import { FormTitle } from "../../../styles/components/Form";
import Button from "../../../styles/components/Button";
import {
  List,
  ListLink,
  ListItem,
  ListItemContent,
  ListItemStatus,
  ListItemTitle,
  ListItemSubTitle,
  FormSearch,
  ButtonsContent,
} from "./styles";

const token = window.localStorage.getItem("token");

export default function PrescriptionList() {
  const history = useHistory();
  const dispatch = useDispatch();

  const prescriptionState = useSelector(
    (state: ApplicationState) => state.prescription
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearch(event.target.value);
      dispatch(searchRequest(event.target.value));
    },
    []
  );

  const debounceSearchRequest = debounce(handleChangeInput, 900);
  return (
    <>
      <Sidebar>
        {/* {prescriptionState.loading && <Loading />} */}
        <Container>
          <FormTitle>Lista de Prescrições</FormTitle>

          <SearchComponent
            handleButton={() => history.push("/prescription/create/")}
            buttonTitle="Novo"
            onChangeInput={debounceSearchRequest}
          />

          <List>
            {/* {prescriptionState.list.data.map((prescription: PrescriptionInterface, index: number) => (
              <ListLink key={index} to={`/prescription/${prescription._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={prescription.active}>{prescription.active ? 'Ativo' : 'Inativo'}</ListItemStatus>
                    <div>
                      <ListItemTitle>{prescription.name}</ListItemTitle>
                      <ListItemSubTitle>{prescription.fiscal_number}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))} */}
          </List>
          <PaginationComponent
            page={prescriptionState.list.page}
            rowsPerPage={prescriptionState.list.limit}
            totalRows={prescriptionState.list.total}
            handleFirstPage={() =>
              dispatch(
                loadRequest({
                  page: "1",
                  limit: prescriptionState.list.limit,
                  total: prescriptionState.list.total,
                  search,
                })
              )
            }
            handleLastPage={() =>
              dispatch(
                loadRequest({
                  page: Math.ceil(
                    +prescriptionState.list.total /
                      +prescriptionState.list.limit
                  ).toString(),
                  limit: prescriptionState.list.limit,
                  total: prescriptionState.list.total,
                  search,
                })
              )
            }
            handleNextPage={() =>
              dispatch(
                loadRequest({
                  page: (+prescriptionState.list.page + 1).toString(),
                  limit: prescriptionState.list.limit,
                  total: prescriptionState.list.total,
                  search,
                })
              )
            }
            handlePreviosPage={() =>
              dispatch(
                loadRequest({
                  page: (+prescriptionState.list.page - 1).toString(),
                  limit: prescriptionState.list.limit,
                  total: prescriptionState.list.total,
                  search,
                })
              )
            }
            handleChangeRowsPerPage={(event) =>
              dispatch(
                loadRequest({
                  limit: event.target.value,
                  page: "1",
                  search,
                })
              )
            }
          />
        </Container>
      </Sidebar>
    </>
  );
}
