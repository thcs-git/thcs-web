import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import React, { useCallback, useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import _ from "lodash";
import LOCALSTORAGE from "../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../helpers/constants/sessionStorage";
import { handleCompanySelected } from "../../helpers/localStorage";
import {
  loadRequestByClient,
  loadUserById,
} from "../../store/ducks/users/actions";
import { CompanyUserLinkInterface } from "../../store/ducks/users/types";
import theme from "../../theme/theme";
import {
  loadRequest,
  loadMessageById,
} from "../../store/ducks/message/actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MessageInterface } from "../../store/ducks/message/types";
import PaginationComponent from "../Pagination";
import Loading from "../Loading";

export default function Message() {
  const dispatch = useDispatch();

  const messageState = useSelector((state: ApplicationState) => state.message);
  const [openModalMessageId, setOpenModalMessageId] = useState(false);
  const [state, setState] = useState<MessageInterface>({
    _id: "",
    subject: "",
    to: {
      name: "",
    },
    from: {
      name: "",
    },
    message: "",
    created_at: "",
    viewed: false,
    active: true,
  });

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  useEffect(() => {
    // console.log(messageState.list.data.length > 0)
  }, [messageState]);

  const handleOpenMessageIdModal = useCallback(
    (index) => {
      dispatch(loadMessageById(messageState.list.data[index]._id));
      setState((prevState) => ({
        ...prevState,
        ...messageState.list.data[index],
      }));
      setOpenModalMessageId(true);
      messageState.list.data[index].viewed = true;
    },
    [messageState.list.data]
  );

  return (
    <>
      <List
        style={{
          width: "100%",
          // maxWidth: '36px',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* {messageState.loading && <Loading/>} */}
        {messageState?.list?.data?.length > 0 ? (
          <>
            {messageState?.list?.data?.map((item, index) => {
              const style = item.viewed
                ? {}
                : {
                    backgroundColor: "var(--gray)",
                  };

              function handleMessage(message: string) {
                return _.truncate(message, {
                  length: 75,
                  separator: " ",
                  omission: " ...",
                });
              }

              return (
                <>
                  <Divider variant="inset" component="li" />
                  <ListItem
                    alignItems="flex-start"
                    style={style}
                    button
                    onClick={() => handleOpenMessageIdModal(index)}
                  >
                    <ListItemAvatar>
                      <Avatar alt={item.from.name} src="/static/" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.subject}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ display: "inline" }}
                            color="textPrimary"
                          >
                            {item.from.name}
                          </Typography>
                          {` — ${handleMessage(item.message)}`}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
            <PaginationComponent
              page={messageState.list.page}
              rowsPerPage={messageState.list.limit}
              rowsPerPageOptions={[]}
              totalRows={messageState.list.total}
              handleFirstPage={() =>
                dispatch(
                  loadRequest({
                    page: "1",
                    limit: messageState.list.limit,
                    total: messageState.list.total,
                  })
                )
              }
              handleLastPage={() =>
                dispatch(
                  loadRequest({
                    page: Math.ceil(
                      +messageState.list.total / +messageState.list.limit
                    ).toString(),
                    limit: messageState.list.limit,
                    total: messageState.list.total,
                  })
                )
              }
              handleNextPage={() =>
                dispatch(
                  loadRequest({
                    page: (+messageState.list.page + 1).toString(),
                    limit: messageState.list.limit,
                    total: messageState.list.total,
                  })
                )
              }
              handlePreviosPage={() =>
                dispatch(
                  loadRequest({
                    page: (+messageState.list.page - 1).toString(),
                    limit: messageState.list.limit,
                    total: messageState.list.total,
                  })
                )
              }
              handleChangeRowsPerPage={(event) =>
                dispatch(
                  loadRequest({
                    limit: event.target.value,
                    page: "1",
                  })
                )
              }
            />
          </>
        ) : (
          <>
            <p>Nenhuma Mensagem</p>
          </>
        )}
      </List>
      <Dialog
        open={openModalMessageId}
        onClose={() => setOpenModalMessageId(false)}
        aria-labelledby="dialog-message-title"
        aria-describedby="dialog-message-description"
      >
        <DialogTitle id="dialog-message-id">{state.from.name}</DialogTitle>
        <DialogContent>
          <h3>{state.subject}</h3>
          <br />
          <p>{state.message}</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModalMessageId(false);
            }}
            color="primary"
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
