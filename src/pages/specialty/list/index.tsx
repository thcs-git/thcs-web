import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

import { ApplicationState } from "../../../store/";
import {
  loadRequest,
  searchRequest,
} from "../../../store/ducks/specialties/actions";

import PaginationComponent from "../../../components/Pagination";
import SearchComponent from "../../../components/List/Search";
import Loading from "../../../components/Loading";
import Sidebar from "../../../components/Sidebar";

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

export default function SpecialtyList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const especialtyState = useSelector(
    (state: ApplicationState) => state.specialties
  );

  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
        {/* {especialtyState.loading && <Loading />} */}
        <Container>
          <FormTitle>Lista de Especialidades</FormTitle>
          <SearchComponent
            handleButton={() => history.push("/specialty/create/")}
            buttonTitle="Novo"
            onChangeInput={debounceSearchRequest}
          />

          <List>
            {especialtyState.list.data.map((specialty, index) => (
              <ListLink key={index} to={`/specialty/${specialty._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={specialty.active}>
                      {specialty.active ? "Ativo" : "Inativo"}
                    </ListItemStatus>
                    <div>
                      <ListItemTitle>{specialty.name}</ListItemTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
          <PaginationComponent
            page={especialtyState.list.page}
            rowsPerPage={especialtyState.list.limit}
            totalRows={especialtyState.list.total}
            handleFirstPage={() =>
              dispatch(
                loadRequest({
                  page: "1",
                  limit: especialtyState.list.limit,
                  total: especialtyState.list.total,
                  search,
                })
              )
            }
            handleLastPage={() =>
              dispatch(
                loadRequest({
                  page: Math.ceil(
                    +especialtyState.list.total / +especialtyState.list.limit
                  ).toString(),
                  limit: especialtyState.list.limit,
                  total: especialtyState.list.total,
                  search,
                })
              )
            }
            handleNextPage={() =>
              dispatch(
                loadRequest({
                  page: (+especialtyState.list.page + 1).toString(),
                  limit: especialtyState.list.limit,
                  total: especialtyState.list.total,
                  search,
                })
              )
            }
            handlePreviosPage={() =>
              dispatch(
                loadRequest({
                  page: (+especialtyState.list.page - 1).toString(),
                  limit: especialtyState.list.limit,
                  total: especialtyState.list.total,
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
