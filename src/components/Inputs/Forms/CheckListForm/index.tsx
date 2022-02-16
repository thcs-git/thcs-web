import React from "react";
import _ from "lodash";
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { FormGroupSection, WrapperHeaderForm } from "./styles";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { height } from "@mui/system";

import { InputFiled as TextField } from "../IntegrationForm/styles";

interface Iprops {
  state: any;
  setState: any;
  rows: any;
  mode?: string;
  checkList?: string;
  autoCompleteSetting?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  formLabel: {
    color: "var(--black)",
    "&.Mui-disabled": {
      color: "var(--gray-dark)",
    },
    "&.Mui-focused": {
      color: "var(--primary)",
    },
    // '&.Mui-disabled:hover': { background:theme.palette.secondary.main },
  },
}));

const CustomCheckbox = withStyles({
  root: {
    color: "var(--gray)",
    "&$checked": {
      color: "var(--action)",
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const CheckListForm = (props: Iprops) => {
  const { state, setState, rows, mode, checkList, autoCompleteSetting } = props;
  const {
    handleProfessionList,
    selectProfession,
    handleSelectProfession,
    userState,
  } = autoCompleteSetting;
  const classes = useStyles();

  // const mode = _.split(window.location.pathname, '/').slice(-2)[0]
  console.log(checkList, "check list");
  function handleChecked(name: string, crud: string) {
    return _.indexOf(state.rights, `${name}.${crud}`) > -1;
  }

  function handleBackgroundColorCheckBox(index: number): string {
    if (checkList === "app") {
      if (index === 0) return "rgba(243, 243, 243, 0.35)";
      if (index === 1) return "rgba(243, 243, 243, 0.66)";
      if (index === 2) return "rgba(243, 243, 243, 0.66)";
      if (index === 3) return "rgba(243, 243, 243, 0.78)";
      if (index === 4) return "rgba(243, 243, 243, 1)";
      if (index === 5) return "#EFEFEF";
    } else {
      if (index === 0) return "rgba(243, 243, 243, 0.35)";
      if (index === 1) return "rgba(243, 243, 243, 0.45)";
      if (index === 2) return "rgba(243, 243, 243, 0.65)";
    }
    return "#F3F3F3";
  }

  return (
    <>
      <FormGroupSection>
        {/* {mode === "create" && (
          <Autocomplete
            id="combo-box-profession"
            // disabled={mode === "view"}
            options={handleProfessionList()}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Função" variant="outlined" />
            )}
            // getOptionSelected={(option, value) =>
            //   option._id == userState.data.professions[0]._id
            // }
            // defaultValue={selectProfession()}
            value={selectProfession()}
            onChange={(event, value) => {
              if (value) {
                handleSelectProfession(value);
              }
            }}
            size="small"
            fullWidth
          />
        )} */}
        {checkList == "portal" ? (
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Box style={{ width: "190px" }}></Box>
            <WrapperHeaderForm>
              <Box>Visualizar</Box>
              <Box>Criar/Editar</Box>
              <Box>Gerar</Box>
            </WrapperHeaderForm>
          </Box>
        ) : (
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Box style={{ width: "190px" }}></Box>
            <WrapperHeaderForm style={{ padding: "12.3px" }}>
              <Box>Checagem</Box>
              <Box>Aferiçãor</Box>
              <Box>Evolução</Box>
              <Box>Recetuários</Box>
              <Box>Atestados</Box>
              <Box>Exames</Box>
            </WrapperHeaderForm>
          </Box>
        )}

        {rows.map(({ legend, name, rights }: any, index: number) => (
          <FormControl
            component="fieldset"
            style={{
              marginBottom: "4px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormLabel className={classes.formLabel} style={{ width: "200px" }}>
              {legend}
            </FormLabel>
            <FormGroup
              aria-label="position"
              row
              style={{
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              {rights.map(({ crud, label }: any, index: number) => (
                <FormControlLabel
                  style={{
                    display: "flex",
                    margin: "0 2px",
                  }}
                  value={crud}
                  control={
                    <CustomCheckbox
                      style={{
                        width: "70px",
                        height: "35px",
                        backgroundColor: handleBackgroundColorCheckBox(index),
                        borderRadius: "0",
                      }}
                      checked={handleChecked(name, crud)}
                      icon={<CheckCircleOutlineOutlinedIcon />}
                      checkedIcon={<CheckCircleOutlineOutlinedIcon />}
                    />
                  }
                  label={""}
                  labelPlacement="end"
                  disabled={mode === "view"}
                  onChange={(event, value) => {
                    const rights = [...state.rights];
                    const right = `${name}.${crud}`;

                    if (value) {
                      setState((prevState: any) => ({
                        ...prevState,
                        rights: [...prevState.rights, right],
                      }));
                    } else {
                      _.pull(rights, right);
                      setState((prevState: any) => ({
                        ...prevState,
                        rights: rights,
                      }));
                    }
                  }}
                />
              ))}
            </FormGroup>
          </FormControl>
        ))}
      </FormGroupSection>
    </>
  );
};

export default React.memo(CheckListForm);
