import React from "react";
import {Checkbox, CheckboxProps, FormControl, FormControlLabel, FormGroup, FormLabel, Grid} from "@material-ui/core";
import {FormGroupSection} from "./styles";
import {makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import _ from "lodash";

interface Iprops {
  state: any;
  setState: any;
  rows: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  formLabel: {
    color: 'var(--primary)',
    '&.Mui-disabled': {
      color: 'var(--gray-dark)',
    },
    '&.Mui-focused': {
      color: 'var(--primary)',
    },
    // '&.Mui-disabled:hover': { background:theme.palette.secondary.main },
  }
}));

const CustomCheckbox = withStyles({
  root: {
    color: 'var(--primary)',
    '&$checked': {
      color: 'var(--secondary)',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const CheckListForm = (props: Iprops) => {
  const {state, setState, rows} = props;
  const classes = useStyles();

  const mode = _.split(window.location.pathname, '/').slice(-2)[0]

  function handleChecked(name: string, crud: string) {
    return _.indexOf(state.rights, `${name}.${crud}`) > -1;
  }

  return (
    <FormGroupSection>
      {rows.map(({legend, name, rights}: any, index: number) => (
        <FormControl component="fieldset" style={{marginBottom: '15px', display: 'flex'}}>
          <FormLabel className={classes.formLabel}>{legend}</FormLabel>
          <FormGroup aria-label="position" row>
            {rights.map(({crud, label}: any, index: number) => (
              <FormControlLabel
                value={crud}
                control={<CustomCheckbox checked={handleChecked(name, crud)}/>}
                label={label}
                labelPlacement="end"
                disabled={mode === 'view'}
                onChange={(event, value) => {
                  const rights = [...state.rights];
                  const right = `${name}.${crud}`

                  if (value) {
                    setState((prevState: any) => ({
                      ...prevState,
                      rights: [...prevState.rights, right]
                    }))
                  } else {
                    _.pull(rights, right);
                    setState((prevState: any) => ({
                      ...prevState,
                      rights: rights
                    }))
                  }
                }}
              />
            ))}
          </FormGroup>
        </FormControl>
      ))}
    </FormGroupSection>
  );
}

export default React.memo(CheckListForm);
