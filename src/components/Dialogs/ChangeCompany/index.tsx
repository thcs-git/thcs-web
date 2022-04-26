import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// redux e sagas
import { useDispatch, useSelector } from "react-redux";
import { loadUserById } from "../../../store/ducks/users/actions";
import { loadRequest as loadRequestLayout } from "../../../store/ducks/layout/actions";
import { loadRequest as loadRequestLogo } from "../../../store/ducks/logo/actions";

// helpers

import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import { handleCompanySelected } from "../../../helpers/localStorage";
import { CompanyUserLinkInterface } from "../../../store/ducks/users/types";
import _ from "lodash";
import { toast } from "react-toastify";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
// styles
import { ButtonGreen, AutocompleteStyled as Autocomplete } from "./styles";
import { ApplicationState } from "../../../store";

interface IChangeCompany {
  open: boolean;
  setOpen: any;
}

export default function DialogChangeCompany(props: IChangeCompany) {
  const { open, setOpen } = props;
  const [companies, setCompanies] = useState<any>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [user, setUser] = useState({
    id: localStorage.getItem(LOCALSTORAGE.USER_ID) || ``,
    name: localStorage.getItem(LOCALSTORAGE.USERNAME),
    companySelected: handleCompanySelected(),
  });
  const [valueChangeCheck, setValueChangeCheck] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = open && companies.length === 0;
  const userState = useSelector((state: ApplicationState) => state.users);
  const [companySelected, setCompanySelected] = useState<any>("");
  const [tochedAutocomplete, setTouchedAutocomplete] = useState(false);
  const currentCompany = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);
  useEffect(() => {
    dispatch(loadUserById(user.id, "sidebar"));
  }, []);

  useEffect(() => {
    const { companies_links: userCompanies } = userState.data;
    userCompanies.forEach(function (item: CompanyUserLinkInterface) {
      if (typeof item.companie_id === "object") {
        Object.assign(item, {
          customer:
            item.companie_id?.customer_id?.name +
            " - " +
            item.companie_id?.name,
        });
      }
    });
    const filter = _.filter(userCompanies, { active: true });
    setCompanies(_.filter(filter, { companie_id: { active: true } }));
  }, [userState]);

  const handleClose = () => {
    setUser((state) => {
      return {
        ...state,
        companySelected: handleCompanySelected(),
      };
    });
    setOpen(false);
  };

  const selectCompany = useCallback(() => {
    const selected = companies.filter(
      (item: any) => item.companie_id._id == user.companySelected
    );
    return selected[0] ? selected[0] : null;
  }, [companies, user]);

  const changeCompanySelected = useCallback((company: any) => {
    setCompanySelected(company);
  }, []);
  const changeCompany = useCallback(
    (company: any) => {
      if (company) {
        localStorage.setItem(
          LOCALSTORAGE.COMPANY_SELECTED,
          company.companie_id._id
        );
        localStorage.setItem(
          LOCALSTORAGE.COMPANY_NAME,
          company.companie_id.name
        );
        localStorage.setItem(
          LOCALSTORAGE.CUSTOMER,
          company.companie_id.customer_id._id
        );
        localStorage.setItem(
          LOCALSTORAGE.CUSTOMER_NAME,
          company.companie_id.customer_id.name
        );

        if (company.companie_id.customer_id.integration) {
          sessionStorage.setItem(
            SESSIONSTORAGE.INTEGRATION,
            company.companie_id.customer_id.integration
          );
          localStorage.setItem(
            LOCALSTORAGE.INTEGRATION_COMPANY_SELECTED,
            company.companie_id.external_id
          );
          localStorage.setItem(
            LOCALSTORAGE.SOLLAR_INTEGRATION_USER_ID,
            company.user_external_id
          );
        } else {
          sessionStorage.removeItem(SESSIONSTORAGE.INTEGRATION);
          localStorage.removeItem(LOCALSTORAGE.INTEGRATION_COMPANY_SELECTED);
          localStorage.removeItem(LOCALSTORAGE.SOLLAR_INTEGRATION_USER_ID);
        }

        setUser((prevState) => ({
          ...prevState,
          companySelected: company.companie_id._id,
        }));
      }
    },
    [user]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Configurações</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <h2>Olá, {user.name}</h2>
          <p style={{ margin: "12px 0" }}>
            Você está trabalhando nesta empresa, mas você pode mudar quando
            quiser
          </p>
        </DialogContentText>
        <Autocomplete
          sx={{
            width: 500,
            "&		.MuiOutlinedInput-notchedOutline .Mui-focused": {
              border: "2px solid black",
            },
          }}
          value={selectCompany()}
          onChange={(event, value: any) => {
            changeCompanySelected(value);
            setUser((state) => {
              return {
                ...state,
                companySelected: value?.companie_id?._id,
              };
            });
          }}
          loading={loading}
          id="controllable-states-demo"
          options={companies}
          getOptionLabel={(option: any) => option.customer}
          noOptionsText={"Nenhuma empresa encontrada"}
          renderInput={(params) => <TextField {...params} label="Empresas" />}
        />
      </DialogContent>
      <DialogActions sx={{ margin: "0 24px 16px" }}>
        <ButtonGreen
          onClick={() => {
            if (user.companySelected) {
              setOpen(false);
              changeCompany(companySelected);
              dispatch(loadRequestLayout());
              dispatch(loadRequestLogo());
              history.push(`/`);
            } else {
              toast.warning("Você deve escolher a empresa.");
            }
            // setUser((state) => {
            //   return {
            //     ...state,
            //     companySelected: companySelected.companie_id._id,
            //   };
            // });
          }}
          variant="contained"
        >
          Mudar Empresa
        </ButtonGreen>
        <Button
          onClick={() => {
            // setUser((state) => {
            //   return {
            //     ...state,
            //     companySelected: handleCompanySelected(),
            //   };
            // });
            handleClose();
          }}
          variant="outlined"
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
