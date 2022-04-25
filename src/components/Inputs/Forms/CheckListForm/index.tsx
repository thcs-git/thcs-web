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
} from "@mui/material";
import Box from "@mui/material/Box";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { FormGroupSection, WrapperHeaderForm, CheckBoxInvalid } from "./styles";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DashCircleIcon from "../../../Icons/DashCircle";

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
  const { state, setState, rows, mode, checkList } = props;
  const classes = useStyles();
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
  const handleIconPermission = (name: string, crud: string, index: number) => {
    const validPermissions = [
      "client.view",
      "permission.view",
      "permission.edit",
      "integration.view",
      "userclient.view",
      "user.view",
      "patient.view",
      "care.view",
      "qrcode.create",
      "qrcode.view",
      "schedule.view",
      "schedule.edit",
      "company.view",
      "check.create",
      "admeasurement.create",
      "evolution.create",
      "prescription.create",
      "certificate.create",
      "exam.create",
    ];
    if (validPermissions.includes(`${name}.${crud}`) || checkList === "app") {
      return (
        <FormControlLabel
          style={{
            display: "flex",
            margin: "0 2px",
          }}
          value={crud}
          control={
            <Checkbox
              sx={{
                width: "70px",
                height: "35px",
                backgroundColor: handleBackgroundColorCheckBox(index),
                borderRadius: "0",
                color: "var(--gray)",
                "&.Mui-checked": { color: "var(--action)" },
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
      );
    } else {
      return (
        <FormControlLabel
          style={{
            display: "flex",
            margin: "0 2px",
          }}
          value={crud}
          control={
            <Checkbox
              sx={{
                width: "70px",
                height: "35px",
                backgroundColor: handleBackgroundColorCheckBox(index),
                borderRadius: "0",
                color: "var(--gray)",
                "&.Mui-checked": { color: "var(--action)" },
              }}
              checked={handleChecked(name, crud)}
              icon={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "2rem",
                      position: "absolute",
                      bottom: "-20px  ",
                      color: "var(--gray)",
                    }}
                  >
                    -
                  </Box>
                </Box>
              }
              checkedIcon={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "2rem",
                      position: "absolute",
                      bottom: "-20px  ",
                      color: "var(--gray)",
                    }}
                  >
                    -
                  </Box>
                </Box>
              }
            />
          }
          label={""}
          labelPlacement="end"
          disabled
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
      );
    }
  };
  return (
    <>
      <FormGroupSection>
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
              <Box>Checagens</Box>
              <Box>Aferições</Box>
              <Box>Evoluções</Box>
              <Box>Receituários</Box>
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
              {rights.map(({ crud, label }: any, index: number) =>
                handleIconPermission(name, crud, index)
              )}
            </FormGroup>
          </FormControl>
        ))}
      </FormGroupSection>
    </>
  );
};

export default React.memo(CheckListForm);
