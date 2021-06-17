import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@material-ui/core";
import Sidebar from "../../components/Sidebar";
import { FeedbackDescription } from "../recoverypassword/form/style";
import { BoxCustom, FeedbackTitle } from "../userconfiguration/form/style";
import React, { useState, useEffect, useCallback } from "react";
import { UserRecoveryPassword } from "../../store/ducks/users/types";
import { RouteComponentProps, useHistory } from "react-router-dom";
import FeedbackComponent from "../../components/Feedback";
import { ButtonDefault,ButtonsContent } from "./style";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { loadCheckEmail, cleanAction,loadRecoveryPassword, loadUserByEmail, loadRequest,loadUserTypesRequest} from "../../store/ducks/users/actions";

export default function RecoveryPassMenu(){
  const history = useHistory();
  const dispatch = useDispatch();
  const SIZE_INPUT_PASSWORD = 3;
  const [newPassword,setNewPassword] = useState({value:"",error:false});
  const [newConfirmPassword,setNewConfirmPassword] = useState({value:""});
  const [ok,setOk] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userecovery, setUserecovery] = useState<UserRecoveryPassword>({
    _id:"",
    password:""

  })
  const currentUser = localStorage.getItem(localStorage.USER_ID);

  useEffect(()=>{
    setUserecovery(prev=>({
      ...prev,
      id:currentUser
    }))
  },[currentUser])
  const handleClickShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  const  handleValidatePassword = useCallback(()=>{
    setNewPassword(prev => ({ ...prev, error: !(newPassword.value.length >= SIZE_INPUT_PASSWORD
      && newPassword.value == newConfirmPassword.value) }));
      setUserecovery(prev=>({
        ...prev,
        password:newPassword.value
      }))
      }
  ,[newPassword])

  const  recoveryPassword= useCallback(()=>{
    if(!newPassword.error){
        console.log(userecovery);
    dispatch(loadRecoveryPassword(userecovery));
    setOk(true);
    }
  },[newPassword])
  return (
    <>
      <Sidebar>
        <BoxCustom>
            <Grid container direction="column">
                <Grid item md={12} >
                  <FeedbackTitle>
                    Alteração de senha
                  </FeedbackTitle>
                 <FeedbackDescription style={{marginTop:"3rem"}}>
                   Para criar uma nova senha, preencha os campos abaixo:
                 </FeedbackDescription>
                </Grid>
                <Grid item md={4}>

                  <FormControl fullWidth margin='normal' variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          error={newPassword.error}
                          onChange={element=>{
                            setNewPassword(prev=>({
                              ...prev,
                              value:element.target.value
                            }))
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                          onBlur={handleValidatePassword}
                          labelWidth={70}
                        />
                      </FormControl>


                </Grid>
                <Grid item md={4}>

                  <FormControl fullWidth margin='normal' variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Confirmar Nova Senha</InputLabel>
                        <OutlinedInput
                        labelWidth={200}
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          error={newPassword.error}
                          onChange={element=>{
                            setNewConfirmPassword(prev=>({
                              ...prev,
                              value:element.target.value
                            }))
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                </Grid>
                <Grid md={12} style={{marginTop:"2rem"}}>
                  <ButtonsContent>
                      <ButtonDefault onClick={recoveryPassword}>Salvar Senha</ButtonDefault>
                  </ButtonsContent>
                </Grid>
              </Grid>
        </BoxCustom>
      </Sidebar>
    </>
  );
}
