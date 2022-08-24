import React, { useEffect, useState, useCallback, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import debounce from "lodash.debounce";

import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/";
import {
  loadRequest,
  searchRequest,
} from "../../../store/ducks/councils/actions";

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

export default function CouncilList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const councilState = useSelector((state: ApplicationState) => state.councils);

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

  // const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setSearch(event.target.value)
  //   dispatch(searchRequest(event.target.value));
  // }, []);

  // const debounceSearchRequest = debounce(handleChangeInput, 900)
  const handleSearchInput = useCallback((event: any) => {
    dispatch(searchRequest(event));
  }, []);

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(event.target.value);

    if (event.target.value === "") {
      handleSearchInput("");
    }
  };

  const handleKeyEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchInput(search);
    }
  };

  const handleClickSearch = (e: any) => {
    handleSearchInput(search);
  };
  return (
    <>
      <Sidebar>
        {/* {councilState.loading && <Loading />} */}
        <Container>
          <FormTitle>Lista de Conselhos</FormTitle>

          <SearchComponent
            handleButton={() => navigate("/council/create/")}
            buttonTitle="Novo"
            onChangeInput={handleChangeInput}
            value={search}
            onKeyEnter={handleKeyEnter}
            onClickSearch={handleClickSearch}
            inputPlaceholder="Pesquise por nome de conselho"
          />

          <List>
            {councilState.list.data.map((council, index) => (
              <ListLink key={index} to={`/council/${council._id}/edit`}>
                <ListItem variant="outlined">
                  <ListItemContent>
                    <ListItemStatus active={council?.active || false}>
                      {council.active ? "Ativo" : "Inativo"}
                    </ListItemStatus>
                    <div>
                      <ListItemTitle>
                        {council.initials} • {council.federative_unit}
                      </ListItemTitle>
                      <ListItemSubTitle>{council.name}</ListItemSubTitle>
                    </div>
                  </ListItemContent>
                </ListItem>
              </ListLink>
            ))}
          </List>
          <PaginationComponent
            page={councilState.list.page}
            rowsPerPage={councilState.list.limit}
            totalRows={councilState.list.total}
            handleFirstPage={() =>
              dispatch(
                loadRequest({
                  page: "1",
                  limit: councilState.list.limit,
                  total: councilState.list.total,
                  search,
                })
              )
            }
            handleLastPage={() =>
              dispatch(
                loadRequest({
                  page: Math.ceil(
                    +councilState.list.total / +councilState.list.limit
                  ).toString(),
                  limit: councilState.list.limit,
                  total: councilState.list.total,
                  search,
                })
              )
            }
            handleNextPage={() =>
              dispatch(
                loadRequest({
                  page: (+councilState.list.page + 1).toString(),
                  limit: councilState.list.limit,
                  total: councilState.list.total,
                  search,
                })
              )
            }
            handlePreviosPage={() =>
              dispatch(
                loadRequest({
                  page: (+councilState.list.page - 1).toString(),
                  limit: councilState.list.limit,
                  total: councilState.list.total,
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
