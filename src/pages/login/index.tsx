import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { ContainerLogin, WelcomeTextWrapper, HomeIconLogo, LogoText, TextGray } from './styles';
import Button from '../../styles/components/Button';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Sollar
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <ContainerLogin maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <HomeIconLogo />

            <LogoText variant="h5">
              Portal Sollar
            </LogoText>
          </Box>

         <WelcomeTextWrapper>
          <TextGray>
              Bem-vindo(a)! Realize seu login para continuar:
            </TextGray>
         </WelcomeTextWrapper>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="CPF"
            name="cpf"
            autoComplete="number"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar de mim neste computador"
          />
          <Button
            background="success"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cadastrar
          </Button>
          <Grid container>
            <Box textAlign="center" width="100%">
            <TextGray >
              Esqueceu a senha? {' '}
                <Link href="#">
                  Clique aqui{' '}
                </Link>
                parar recuperar
            </TextGray>
            </Box>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </ContainerLogin>
  );
}
