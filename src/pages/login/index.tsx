import React, { useCallback, useState, useEffect, useRef, memo } from "react";
// Router
import { useHistory } from "react-router-dom";

// Redux e saga
import { loadRequest, emailRequest } from "../../store/ducks/login/actions";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import {
  updateUserPasswordRequest,
  loadUserByEmail,
} from "../../store/ducks/users/actions";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ButtomMui from "@mui/material/Button";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormGroup,
  useMediaQuery,
  keyframes,
} from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
// styles
import {
  ContainerLogin,
  WelcomeTextWrapper,
  HomeIconLogo,
  LogoText,
  TextGray,
  TextBlue,
  ButtonGreen,
} from "./styles";
import theme from "../../theme/theme";
// icons
import THCStype1 from "../../components/Icons/THCS_Type1";
import House1 from "../../components/Icons/HouseType1";
import House2 from "../../components/Icons/HouseType2";
import HouseGroup from "../../components/Icons/HouseGroup";
import CloudIcon from "../../components/Icons/Cloud";
//Utils
import validateEmail from "../../utils/validateEmail";
import LOCALSTORAGE from "../../helpers/constants/localStorage";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
// componentes
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import BackgroundAnimated from "../../components/Background/Animated";
import BackgroundHouses from "../../components/Background/Houses";
function Copyright() {
  return (
    <Grid
      item
      sx={{
        // backgroundColor: theme.palette.grey[200],
        alignContent: "center",
        // fontSize: "20px",
        textDecoration: "bold",

        borderTop: "1px solid #d9d9d9",
        textAlign: "center",
        padding: "0.1rem",
        position: "fixed",
        left: "0",
        bottom: "0",
        // height: "40px",
        width: "100%",
      }}
    >
      <Typography variant="body2" align="center" sx={{ background: "#d9d9d9" }}>
        <Link
          href="https://www.tascominformatica.com.br/"
          sx={{
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
          target={"_blank"}
        >
          TASCOM
        </Link>
        {" © "}
        {new Date().getFullYear()}
      </Typography>
    </Grid>
  );
}

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     height: "100%",
//   },
//   paper: {
//     marginTop: theme.spacing(2),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//     // "& .MuiOutlinedInput-root": {
//     //   "&.Mui-focused fieldset": {
//     //     borderColor: "var(--secondary)",
//     //   },
//     // },
//   },
//   create_account: {
//     marginBottom: "14px",
//     "&:hover": {
//       background: "#f7f7f7",
//       fontWeight: "bold",
//       transition: "300ms",
//     },
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//     padding: "10px",
//     textTransform: "capitalize",
//     fontSize: "18px",
//     backgroundColor: "var(--success)",
//     "&:hover": {
//       backgroundColor: "#4fc66ae3",
//       fontWeight: "bold",
//       transition: "300ms",
//     },
//   },
//   register: {
//     margin: theme.spacing(1, 0, 2),
//     padding: "10px",
//     textTransform: "capitalize",
//     fontSize: "18px",
//     "&:hover": {
//       backgroundColor: "var(--success-hover)",
//       borderColor: "var(--success-hover)",
//       color: "white",
//     },
//     borderColor: "var(--success-hover)",
//     contrastText: "#fff",
//   },
//   wrapper: {
//     margin: theme.spacing(1),
//     position: "relative",
//   },
//   buttonSuccess: {
//     backgroundColor: "green[500]",
//     "&:hover": {
//       backgroundColor: "green[700]",
//     },
//   },
//   fab: {
//     width: "35px",
//     height: "25px",
//   },
//   fabProgress: {
//     color: "green[500]",
//     position: "absolute",
//     top: -6,
//     left: -6,
//     zIndex: 1,
//   },
//   buttonProgress: {
//     color: "green[500]",
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginTop: -12,
//     marginLeft: -12,
//   },
// }));

const SIZE_INPUT_PASSWORD = 6;

const validationSchema = yup.object({
  password: yup
    .string()
    .min(
      SIZE_INPUT_PASSWORD,
      `A senha deve ter no mínimo ${SIZE_INPUT_PASSWORD} caracteres`
    )
    .max(20, "Senha deve ter no maximo 20 caracteres")
    .required("Campo obrigatório"),
  confirmPassword: yup
    .string()
    .min(
      SIZE_INPUT_PASSWORD,
      `A senha deve ter no mínimo ${SIZE_INPUT_PASSWORD} caracteres`
    )
    .required("Campo obrigatório")
    .oneOf(
      [yup.ref("password"), null],
      "Nova senha e confirmar senha devem ser iguais"
    ),
  policyAccepted: yup
    .boolean()
    .required("Os termos e condições devem ser aceitos.")
    .oneOf([true], "Os termos e políticas devem ser aceitos."),
});
const validationSchemaRecoveryPassword = yup.object({
  email: yup
    .string()
    .required("Campo obrigatório")
    .email("Formato de e-mail incorreto"),
});
const policity = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          T+HCS - Health, Care and Safety
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          {" "}
          A proteção da privacidade e do uso legal de dados pessoais é um dos
          pilares do T+HCS, que tem como compromisso a garantia da segurança dos
          dados e da privacidade de nossos usuários. Esta política de
          privacidade explica como seus dados pessoais são coletados, usados,
          armazenados e divulgados através de nossa plataforma, sistema e
          aplicativo móvel. O T+HCS poderá alterar a presente política, devido a
          quaisquer alterações em nossas operações ou nas leis e regulamentos
          aplicáveis.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          QUEM SOMOS
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          <b>TASCOM INFORMÁTICA LTDA</b>, empresa de tecnologia, inscrita no
          CNPJ/MF sob o n.º 06.312.868/0001-03, com sede na Rua José Maria, nº
          76 - Letra A - CXPST 001, Arthur Lundgren I, Paulista/PE, CEP:
          53.417-350. Com inovação, processos, conexão humana e muitos anos de
          experiência, temos gerado resultados expressivos com nossas Soluções
          em Tecnologia Hospitalar.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{ color: theme.palette.error.main }}
        >
          O T+HCS SOLUÇÕES NO LAR é um sistema voltado a atenção domiciliar
          dividido em duas plataformas principais, uma voltada para desktop e
          ambientada na web e outra mobile distribuida e mantida pelas
          plataformas de distribuição do respespectivo provedor de os mibile
          (Google e Apple) ...
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Para efeitos da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados), o
          T+HCS realiza o tratamento de seus dados pessoais, como Operador de
          Dados, em acordo com esta política.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Você pode entrar em contato com nosso Oficial de Proteção de Dados
          ("DPO") enviando um e-mail para dpo@tascominformatica.com.br ou por
          correio tradicional, enviando-nos uma consulta para nosso endereço de
          escritório registrado.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Algumas considerações antes de você ler nossa Política:
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Para uma melhor compreensão desta Política de Privacidade e Proteção
          de Dados, considera-se dados pessoais as informações relativas às
          pessoas naturais identificadas ou identificáveis, que são obtidas a
          partir da coleta direta do titular ou através do compartilhamento de
          terceiros.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Os dados que não se referem à pessoa natural, serão considerados como
          dados corporativos, para facilitar o seu entendimento ao ler esta
          Política.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          DADOS TRATADOS PELO T+HCS
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Nos esforçamos para proteger os dados pessoais que mantemos em nossos
          registros, utilizando o mínimo de informações necessárias para as
          finalidades voltadas à execução dos nossos serviços.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Para tornar acessível esta informação, exemplificamos abaixo quais
          dados são tratados:
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ marginLeft: "14px" }}
        >
          <li>
            Dados de identificação, como nome, data de nascimento,
            nacionalidade, sexo, endereço, telefone, e-mail, números de CPF e
            RG;
          </li>
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Em algumas ocasiões podemos também tratar Dados Pessoais Sensíveis,
          envolvendo, mas não limitado a:
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ marginLeft: "14px" }}
        >
          <li>Dados relacionados à saúde;</li>
          <li>
            Dados genéticos ou biométricos vinculados a uma pessoa física.
          </li>
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          No entanto, não é possível descartar o eventual tratamento pontual de
          algum dado pessoal não descrito nesta política. Assim, para maior
          especificidade e assertividade, caso o titular pretenda conhecer mais
          detidamente como seus dados são tratados, recomendamos que entre em
          contato com nosso Oficial de Proteção de Dados ("DPO"), através dos
          meios de contato especificados nesta política.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          SOBRE OS DADOS TRATADOS ATRAVÉS DA NOSSA SOLUÇÃO EM TECNOLOGIA
          HOSPITALAR
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Através das soluções desenvolvidas por nós, nossos clientes assumem a
          condição de Proprietário/Controlador, possuindo autonomia e liberdade
          no que diz respeito ao tratamento dos dados pessoais, podendo optar
          sobre a finalidade do tratamento, a categoria de dados a serem
          coletados, qual o período de retenção, dentre outras questões
          relacionadas diretamente com o tratamento de dados pessoais.
          <br />É importante reforçar, para seu conhecimento, que T+HCS apenas
          operacionaliza as decisões de tratamento feitas pelos clientes.
          Portanto, não exercemos a atividade de Controlador sobre os dados
          pessoais tratados através dos nossos sistemas.{" "}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          As informações coletadas e processadas pelos nossos softwares são
          controladas por nossos clientes, que as utilizam, divulgam e protegem,
          de acordo com suas respectivas políticas de privacidade e proteção de
          dados.{" "}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Na condição de Operador, não controlamos os dados que são coletados
          diretamente por nossos clientes. Contudo, no intuito de minimizar
          incidentes envolvendo dados pessoais tratados por ocasião destas
          relações, adotamos diversas práticas de segurança da informação
          existentes no mercado, garantido segurança ao tratamento das
          informações alocados em nossas plataformas.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          AS FINALIDADES E OS FUNDAMENTOS LEGAIS PARA O TRATAMENTO DOS DADOS
          PESSOAIS
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Tratamos os dados pessoais apenas quando a sua finalidade cumpre as
          hipóteses previstas de tratamento constante na Lei nº 13.709/2018 (Lei
          Geral de Proteção de Dados Pessoais – LGPD).
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Destacamos abaixo as finalidades e as respectivas bases legais pelas
          quais processamos os dados pessoais:
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ marginLeft: "14px" }}
        >
          <li>
            Prestação de Serviços e fornecimento de software: Efetuamos o
            tratamento dos dados pessoais tendo como fundamento jurídico o
            cumprimento de obrigação legal e a execução de contrato ou
            procedimentos preliminares;
          </li>
          <li>
            Respostas de Requisições, Reclamações ou de Prestar Esclarecimentos
            aos Titulares: Tomamos como base legal o legítimo interesse,
            cumprimento de obrigação legal e a execução de contrato, conforme
            cada caso;
          </li>
          <li>
            Gerenciamento das Atividades Administrativas: Efetuamos o tratamento
            de dados pessoais com base na execução contratual, no exercício
            regular de direitos em processo judicial ou administrativo, no
            legítimo interesse e no cumprimento de obrigações legais.
          </li>
          <li>
            Medição do Nível de Satisfação dos Usuários do Software | Coleta de
            Sugestões de Melhorias: Tomamos como base legal o consentimento
            expresso.
          </li>
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Eventualmente, com a finalidade de analisar de que forma os usuários
          interagem com as ferramentas com o propósito de corrigir potenciais
          erros, na busca pela melhoria contínua dos softwares, acionamos
          determinados atributos na plataforma controlada pelos clientes, os
          quais coletam e armazenam informações de uso no sistema.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          As finalidades e hipóteses legalmente previstas para o tratamento dos
          dados pessoais poderão sofrer alterações conforme a evolução das
          atividades desempenhadas por nós, das normas aplicáveis e dos
          relacionamentos mantidos com a sociedade. Portanto, procuraremos
          manter atualizada nossa Política de Privacidade e Proteção Dados,
          oportunizando aos titulares a adequada ciência sobre nossa conduta.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Sob nenhuma circunstância iremos processar dados para qualquer
          propósito discriminatório, ilegal ou abusivo.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          TRATAMENTO DE DADOS PESSOAIS DE CRIANÇAS E ADOLESCENTES
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          No que se refere as plataformas desenvolvidas ou utilizadas por nós
          para interação com titulares de dados que controlamos, na hipótese de
          tratamento de dados pessoais de crianças, comprometemo-nos a obter o
          consentimento dos pais ou responsável legal para realizar esse
          tratamento.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Quanto aos dados pessoais operados por nós a partir da utilização do
          T+HCS pelos clientes, cabe a estes, na condição de controladores, a
          interação direta com os pais ou responsáveis legais das crianças, para
          o devido consentimento.{" "}
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          TIPOS DE DADOS COLETADOS
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Entre os tipos de Dados Pessoais que o T+HCS coleta, por si mesmo ou
          através de terceiros, existem: permissão de câmera, permissão de
          localização precisa (interrupta), permissão de localização aproximada
          (interrupta), permissão de telefone, permissão de armazenamento,
          permissão de compartilhamento de bluetooth, permissão de calendário,
          permissão de contatos, permissão de microfone, permissão de SMS e
          posição geográfica.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Detalhes completos sobre cada tipo de Dados Pessoais coletados são
          fornecidos nas seções dedicadas desta política de privacidade ou por
          textos explicativos específicos exibidos antes da coleta de Dados.{" "}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Os Dados Pessoais poderão ser fornecidos livremente pelo Usuário, ou,
          no caso dos Dados de Utilização, coletados automaticamente ao se
          utilizar este aplicativo. A menos que especificado diferentemente
          todos os Dados solicitados pelo T+HCS são obrigatórios e a falta de
          fornecimento destes Dados poderá impossibilitar este aplicativo de
          fornecer os seus serviços.{" "}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Nos casos em que este aplicativo afirmar especificamente que alguns
          Dados não forem obrigatórios, os Usuários ficam livres para deixarem
          de comunicar estes Dados sem nenhuma consequência para a
          disponibilidade ou o funcionamento do serviço. Os Usuários que tiverem
          dúvidas a respeito de quais Dados Pessoais são obrigatórios estão
          convidados a entrar em contato com o Proprietário.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Quaisquer usos de cookies – ou de outras ferramentas de rastreamento –
          por este aplicativo ou pelos proprietários de serviços terceiros
          utilizados por este aplicativo serão para a finalidade de fornecer os
          serviços solicitados pelo Usuário, além das demais finalidades
          descritas no presente documento e na Política de Cookies, se estiver
          disponível.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Os Usuários ficam responsáveis por quaisquer Dados Pessoais de
          terceiros que forem obtidos, publicados ou compartilhados através
          deste aplicativo e confirmam que possuem a autorização dos terceiros
          para fornecerem os Dados para o Proprietário.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          MÉTODO DE PROCESSAMENTO
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O processamento dos Dados é realizado utilizando computadores e/ou
          ferramentas de TI habilitadas, seguindo procedimentos organizacionais
          e meios estritamente relacionados com os fins indicados. Além do
          Proprietário, em alguns casos, os Dados podem ser acessados por certos
          tipos de pessoas encarregadas, envolvidas com a operação deste serviço
          (este aplicativo), nomeadas, quando necessário, como Processadores de
          Dados por parte do Proprietário. A lista atualizada destas partes pode
          ser solicitada ao Proprietário a qualquer momento.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          BASE JURÍDICA PARA O PROCESSAMENTO
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O Proprietário poderá processar os Dados Pessoais relacionados ao
          Usuário se uma das hipóteses a seguir se aplicar:
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ marginLeft: "14px" }}
        >
          <li>
            o fornecimento dos Dados for necessário para o cumprimento de um
            contrato com o Usuário e/ou quaisquer obrigações pré-contratuais do
            mesmo;
          </li>
          <li>
            o processamento for necessário para o cumprimento de uma obrigação
            jurídica à qual o Proprietário estiver sujeito;
          </li>
          <li>
            o processamento estiver relacionado a uma tarefa que for executada
            no interesse público ou no exercício de uma autorização oficial na
            qual o Proprietário estiver investido;
          </li>
          <li>
            o processamento for necessário para a finalidade de interesses
            legítimos perseguidos pelo Proprietário ou por um terceiro;
          </li>
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Em qualquer caso, o Proprietário colaborará de bom grado para
          esclarecer qual a base jurídica que se aplica ao processamento, e em
          especial se o fornecimento de Dados for um requisito obrigatório por
          força de lei ou contratual, ou uma exigência necessária para celebrar
          um contrato.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          LUGAR
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Os dados são processados nas sedes de operação dos Proprietários, e em
          quaisquer outros lugares onde as partes envolvidas com o processamento
          estiverem localizadas.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          PERÍODO DE CONSERVAÇÃO
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Portanto:
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ marginLeft: "14px" }}
        >
          <li>
            Os Dados Pessoais coletados para as finalidades relacionadas com a
            execução de um contrato entre o Proprietário e o Usuário serão
            conservados até que tal contrato tenha sido completamente cumprido.
          </li>
          <li>
            Os Dados Pessoais coletados para as finalidades relacionadas com os
            legítimos interesses do Proprietário serão conservados pelo tempo
            que for necessário para cumprir tais finalidades. Os Usuários
            poderão obter informações específicas sobre os interesses legítimos
            perseguidos pelo Proprietário dentro das seções pertinentes deste
            documento ou entrando em contato com o Proprietário.
          </li>
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O Proprietário poderá ter a permissão de conservar os Dados Pessoais
          por um prazo maior sempre que o Usuário tiver dado a sua autorização
          para tal processamento, enquanto tal autorização não tiver sido
          retirada. Além disso, o Proprietário poderá ficar obrigado a conservar
          os Dados Pessoais por um prazo maior em todas as ocasiões em que
          estiver obrigado a fazê-lo para o cumprimento de uma obrigação
          jurídica ou em cumprimento de um mandado de uma autoridade.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Assim que o prazo de conservação vencer, os Dados Pessoais serão
          apagados. Desta forma o direito de acessar, o direito de apagar, o
          direito de corrigir e o direito à portabilidade dos dados não poderão
          ter o seu cumprimento exigido após o vencimento do prazo de
          conservação.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          AS FINALIDADES DO PROCESSAMENTO
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Os Dados relativos ao Usuário são coletados para permitir que o
          Proprietário forneça os seus Serviços, bem como para os seguintes
          propósitos: permissões de dispositivos para acesso a Dados Pessoais e
          interações baseadas na localização.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Os Usuários poderão obter informações adicionais detalhadas sobre tais
          finalidades do processamento e sobre os Dados Pessoais específicos
          utilizados para cada finalidade nas seções respectivas deste
          documento.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          PERMISSÕES DE DISPOSITIVOS PARA ACESSO A DADOS PESSOAIS
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Dependendo do dispositivo específico do Usuário, o T+HCS pode
          solicitar certas permissões que permitem-no acessar os Dados do
          dispositivo do Usuário conforme descrito abaixo.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Por padrão estas permissões devem ser concedidas pelo Usuário antes
          que as respectivas informações possam ser acessadas. Uma vez que a
          permissão tenha sido dada, esta pode ser revogada pelo Usuário a
          qualquer momento. Para poder revogar estas permissões os Usuários
          devem consultar as configurações do dispositivo ou entrar em contato
          com o Proprietário para receber suporte através dos dados para contato
          fornecidos no presente documento. O procedimento exato para controlar
          as permissões de aplicativos poderá depender do dispositivo e software
          do Usuário.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Por favor observar que a revogação de tais permissões poderá afetar o
          funcionamento apropriado deste aplicativo
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Se o Usuário conceder quaisquer das permissões relacionadas abaixo,
          estes Dados Pessoais respectivos poderão ser processados (isto é,
          acessados, modificados ou removidos) por este aplicativo.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissão de armazenamento
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Usada para acessar o armazenamento externo compartilhado, inclusive a
          leitura e o acréscimo de quaisquer itens.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissão de calendário
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Usada para acessar o calendário no dispositivo do Usuário, inclusive a
          leitura, acréscimo e remoção de registros.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissão de compartilhamento de bluetooth
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Usada para acessar as funções relacionadas com o bluetooth, tais como
          o escaneamento para encontrar dispositivos, a conexão com dispositivos
          e permitir a transferência de dados entre dispositivos.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissão de contatos
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Usada para acessar os contatos e perfis no dispositivo do Usuário,
          inclusive para fazer mudanças nos registros.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissão de câmera
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Usada para acessar a câmera ou capturar imagens e vídeo do
          dispositivo.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissão de localização aproximada
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Usada para acessar a localização aproximada do dispositivo do Usuário.
          O T+HCS poderá coletar, usar e compartilhar os Dados de localização do
          Usuário para poder fornecer serviços com base na localização.{" "}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          A localização geográfica do Usuário é determinada de maneira que não é
          ininterrupta. Isto significa que é impossível para este aplicativo
          obter a posição aproximada do Usuário de forma ininterrupta.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissão de localização precisa
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Usada para acessar a localização precisa do dispositivo do Usuário. O
          T+HCS poderá coletar, usar e compartilhar os Dados de localização do
          Usuário para poder fornecer serviços com base na localização.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          A localização geográfica do Usuário é determinada de maneira que não é
          ininterrupta. Isto significa que é impossível para este aplicativo
          obter a posição exata do Usuário de forma ininterrupta.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissão de microfone
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Usada para acessar e gravar o áudio do microfone do dispositivo do
          Usuário.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissão de SMS
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Usada para acessar recursos relacionados com as mensagens do Usuário,
          inclusive o envio, recebimento e leitura de SMS.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissão de telefone
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Usada para acessar um conjunto de recursos típicos associados com a
          telefonia. Isto possibilita, por exemplo, acesso de leitura somente ao
          “status do telefone”, o que significa que possibilita o acesso ao
          número de telefone do dispositivo, informações da rede de telefonia
          móvel atual ou do status de quaisquer chamadas que estiverem sendo
          realizadas no momento.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          INFORMAÇÕES DETALHADAS SOBRE O PROCESSAMENTO DE DADOS PESSOAIS
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Os Dados Pessoais são recolhidos para os seguintes fins e utilizando
          os seguintes serviços:
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Geolocation (este aplicativo)
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O T+HCS pode coletar, usar e compartilhar a localização de dados do
          Usuário a fim de fornecer serviços baseados em localização.{" "}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          A maioria dos navegadores e dispositivos fornecem ferramentas para
          optar o não uso este recurso de padrão. Se a autorização explícita foi
          fornecida, os dados de localização do Usuário podem ser rastreados por
          este aplicativo.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Dados Pessoais coletados: posição geográfica.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Permissões de dispositivos para acesso a Dados Pessoais (este
          aplicativo)
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O T+HCS solicita determinadas permissões do Usuário que lhe permitem
          acessar os Dados do dispositivo do Usuário conforme descritos abaixo.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Dados Pessoais coletados: permissão de armazenamento, permissão de
          calendário, permissão de compartilhamento de bluetooth, permissão de
          contatos, permissão de câmera, permissão de localização aproximada
          (interrupta), permissão de localização precisa (interrupta), permissão
          de microfone, permissão de SMS e permissão de telefone.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Notificações push
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O T+HCS pode enviar notificações push para o Usuário.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Identificação exclusiva do dispositivo
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O T+HCS pode rastrear Usuários ao armazenar um identificador exclusivo
          do seu dispositivo, para fins de análise ou para o armazenamento das
          preferências dos Usuários.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          OS DIREITOS DOS USUÁRIOS
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Os Usuários poderão exercer determinados direitos a respeito dos seus
          Dados processados pelo Proprietário.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Em especial, os Usuários possuem os direitos a fazer o seguinte:
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ marginLeft: "14px" }}
        >
          <li>
            <b>Retirar a sua anuência a qualquer momento.</b> Os Usuários
            possuem o direito de retirar a sua anuência nos casos em que tenham
            dado a sua anuência anteriormente para o processamento dos seus
            Dados Pessoais.
          </li>
          <li>
            <b>Objetar o processamento dos seus Dados.</b> Os Usuários possuem o
            direito de objetar o processamento dos seus Dados se o processamento
            for executado sobre outra base jurídica que não a anuência. São
            fornecidos detalhes adicionais na seção específica abaixo.
          </li>
          <li>
            <b>Acessar os seus Dados. </b>Os Usuários possuem o direito de saber
            se os seus Dados estão sendo processados pelo Proprietário, obter
            revelações sobre determinados aspectos do processamento e conseguir
            uma cópia dos Dados que estiverem sendo processados.
          </li>
          <li>
            <b>Verificar e pedir retificação.</b> Os Usuários possuem o direito
            de verificar a exatidão dos seus Dados e de pedir que os mesmos
            sejam atualizados ou corrigidos.
          </li>
          <li>
            <b>Restringir o processamento dos seus Dados.</b> Os Usuários
            possuem o direito de, sob determinadas circunstâncias, restringir o
            processamento dos seus Dados para qualquer outra finalidade que não
            seja o armazenamento dos mesmos.
          </li>
          <li>
            <b>
              Ter os seus Dados Pessoais apagados ou retirados de outra maneira.
            </b>{" "}
            Os Usuários possuem o direito de, sob determinadas circunstâncias,
            obter a eliminação dos seus Dados do Proprietário.
          </li>
          <li>
            <b>
              Receber os seus Dados e ter os mesmos transferidos para outro
              controlador.
            </b>{" "}
            Os Usuários possuem o direito de receber os seus Dados em um formato
            estruturado, utilizado comumente e apto a ser lido por máquinas e,
            se for viável tecnicamente, fazer com que os mesmos sejam
            transmitidos para outro controlador sem nenhum empecilho. Esta
            determinação se aplica condicionada a que os Dados sejam processados
            por meios automatizados e que o processamento esteja baseado na
            anuência do Usuário, em um contrato do qual o Usuário seja uma das
            partes ou por obrigações pré-contratuais do mesmo.
          </li>
          <li>
            <b>Registrar uma reclamação.</b> Os Usuários possuem o direito de
            apresentar reclamação perante a sua autoridade de proteção de dados
            competente.
          </li>
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Detalhes sobre o direito de objetar ao processamento
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Nos casos em que os Dados Pessoais forem processados por um interesse
          público, no exercício de uma autorização oficial na qual o
          Proprietário estiver investido ou para finalidades dos interesses
          legítimos perseguidos pelo Proprietário, os Usuários poderão objetar
          tal processamento através do fornecimento de um motivo relacionado com
          a sua situação em especial para justificar a objeção.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Como exercer estes direitos
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Quaisquer pedidos para exercer os direitos dos Usuários podem ser
          direcionados ao Proprietário ou ao Operador, através dos dados para
          contato fornecidos neste documento. Estes pedidos podem ser exercidos
          sem nenhum custo e serão atendidos com a maior brevidade possível.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          INFORMAÇÕES ADICIONAIS SOBRE A COLETA E PROCESSAMENTO DE DADOS
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Ação jurídica
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Os Dados Pessoais dos Usuários podem ser utilizados para fins
          jurídicos pelo Proprietário em juízo ou nas etapas conducentes à
          possível ação jurídica decorrente de uso indevido deste serviço (este
          aplicativo) ou dos serviços relacionados. O Usuário declara estar
          ciente de que o Proprietário poderá ser obrigado a revelar os Dados
          Pessoais mediante solicitação das autoridades governamentais.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Informações adicionais sobre os dados pessoais do usuário
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Além das informações contidas nesta Política de Privacidade, este
          aplicativo poderá fornecer ao Usuário informações adicionais e
          contextuais sobre os serviços específicos ou a coleta e processamento
          de Dados Pessoais mediante solicitação.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Logs do sistema e manutenção
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Para fins de operação e manutenção, este aplicativo e quaisquer
          serviços de terceiros poderão coletar arquivos que gravam a interação
          com este aplicativo (logs do sistema) ou usar outros Dados Pessoais
          (tais como endereço IP) para esta finalidade.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          As informações não contidas nesta política
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Mais detalhes sobre a coleta ou processamento de Dados Pessoais podem
          ser solicitados ao Proprietário ou ao Operador de Dados, a qualquer
          momento. Favor ver as informações de contato no início deste
          documento.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Como são tratados os pedidos de “não me rastreie”
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O T+HCS não suporta pedidos de “Não Me Rastreie”. Para determinar se
          qualquer um dos serviços de terceiros que utiliza honram solicitações
          de “Não Me Rastreie”, por favor leia as políticas de privacidade.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          MUDANÇAS NESTA POLÍTICA DE PRIVACIDADE
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O T+HCS se reserva o direito de fazer alterações nesta Política de
          Privacidade a qualquer momento, mediante comunicação aos seus Usuários
          nesta página e possivelmente dentro deste aplicativo e/ou – na medida
          em que for viável tecnicamente e juridicamente – enviando um aviso
          para os Usuários através de quaisquer informações de contato
          disponíveis para o Proprietário. É altamente recomendável que esta
          página seja consultada várias vezes em relação à última modificação
          descrita na parte inferior.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Caso as mudanças afetem as atividades de processamento realizadas com
          base na anuência do Usuário, será coletada nova anuência do Usuário,
          onde for exigida.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          DEFINIÇÕES E REFERÊNCIAS JURÍDICAS
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Dados Pessoais (ou Dados)
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Quaisquer informações que diretamente, indiretamente ou em relação com
          outras informações – incluindo um número de identificação pessoal –
          permitam a identificação ou identificabilidade de uma pessoa física.
        </Typography>
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          Dados de Uso
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{ color: theme.palette.error.main }}
        >
          As informações coletadas automaticamente através deste aplicativo (ou
          serviços de terceiros contratados neste serviço (este aplicativo)),
          que podem incluir: os endereços IP ou nomes de domínio dos
          computadores utilizados pelos Usuários que utilizam este aplicativo;
          os endereços URI (Identificador Uniforme de Recurso); a data, a hora e
          o tempo despendido no atendimento ao paciente em home care
          (atendimento domiciliar); o método utilizado para submeter um
          agendamento de visita de um profissional da área de saúde ao paciente
          em home care, ao servidor; o tamanho do arquivo recebido em resposta;
          o código numérico que indica o status do servidor de resposta
          (resultado positivo, erro , etc.); as características do navegador e
          do sistema operacional utilizado pelo Usuário; os vários detalhes de
          tempo por visita (por exemplo, o tempo gasto em cada página dentro do
          aplicativo) e os detalhes sobre o caminho seguido dentro da aplicação,
          com especial referência à sequência de páginas visitadas e outros
          parâmetros sobre o sistema operacional do dispositivo e/ou ambiente de
          TI do Usuário. Na plataforma mobile também à coleta do posicionamento
          geográfico do dispositivo, acesso a câmera, situação de acesso a rede
          de dados.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Usuário
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          A pessoa que usa este aplicativo que, a menos que especificado
          diferentemente, coincida com o Titular dos Dados.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Titular dos Dados
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          A pessoa física a quem os Dados Pessoais se referem.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Processador de Dados (ou Supervisor de Dados)
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          A pessoa física ou jurídica, administração pública, agência ou outro
          órgão que processe os Dados Pessoais em nome do Controlador, conforme
          descrito nesta Política de Privacidade.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Controlador de Dados (ou Proprietário)
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          A pessoa física ou jurídica, administração pública, agência ou outro
          órgão que, isoladamente ou em conjunto com outros determinar as
          finalidades e os meios de processamento dos Dados Pessoais, incluindo
          medidas de segurança relativas ao funcionamento e ao uso deste serviço
          (este aplicativo). O Controlador de Dados, a menos que seja
          especificado de outra forma, é o Proprietário deste serviço (este
          aplicativo).
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Este Aplicativo
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O meio pelo qual os Dados Pessoais do Usuário são coletados e
          processados.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Serviço
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          O serviço fornecido por este aplicativo, conforme descrito nos termos
          relativos (se disponíveis) e neste aplicativo.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
        >
          Esta Política de Privacidade se refere somente a este aplicativo, se
          não afirmado diferentemente neste documento.
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Última atualização: 12 de janeiro de 2022.
        </Typography>
      </Box>
    </>
  );
};
const colorPrimary = theme.palette.primary.main;
const colorSecondary = theme.palette.secondary.main;
const colorWhite = theme.palette.common.white;
const colorTerciary = theme.palette.terciary.main;

const generateTwoDifferentRandomNumbers = (max: number): number[] => {
  const numberRandom1 = Math.floor(Math.random() * max);
  const numberRandom2 = Math.floor(Math.random() * max);
  return numberRandom1 !== numberRandom2
    ? [numberRandom1, numberRandom2]
    : generateTwoDifferentRandomNumbers(max);
};

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginState = useSelector((state: ApplicationState) => state.login);

  const [inputEmail, setInputEmail] = useState({ value: "", error: false });
  const [inputPassword, setInputPassword] = useState({
    value: "",
    error: false,
  });
  const [inputConfirmPassword, setInputConfirmPassword] = useState({
    value: "",
    error: false,
  });
  const [showRecoveryPassword, setShowRecoveryPassword] = useState(false);
  const [inputEmailForRecovery, setInputEmailForRecovery] = useState({
    value: "",
  });
  const [sendEmail, setSendEmail] = useState(false);
  const [checkPolicy, setCheckPolicy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [valid, setValid] = useState(false);
  const [openPolicyModal, setOpenPolicyModal] = useState(false);

  const xsQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.xs}px)`);
  const smQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.sm}px)`);
  const mdQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.md}px)`);
  const lgQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.lg}px)`);
  const xlQuery = useMediaQuery(`(max-width:${theme.breakpoints.values.xl}px)`);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handlePassword = useCallback(
    async (event) => {
      event.preventDefault();

      if (inputEmail.error || inputPassword.error) return;
      dispatch(
        updateUserPasswordRequest({
          email: inputEmail.value,
          password: inputPassword.value,
        })
      );
    },
    [inputPassword, inputEmail]
  );

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();

      if (inputEmail.error || inputPassword.error) return;
      dispatch(
        loadRequest({ email: inputEmail.value, password: inputPassword.value })
      );
    },
    [inputPassword, inputEmail]
  );

  const handleEmailValidator = useCallback(() => {
    if (!validateEmail(inputEmail.value)) {
      setInputEmail((prev) => ({
        ...prev,
        error: true,
      }));
      setValid(true);
    } else {
      setInputEmail((prev) => ({
        ...prev,
        error: false,
      }));
      setValid(false);
    }
  }, [inputEmail]);

  const handlePasswordValitor = useCallback(() => {
    let passwordError = false;
    let passwordConfirmError = false;

    passwordError = !(inputPassword.value.length >= SIZE_INPUT_PASSWORD);
    passwordConfirmError = !(
      inputConfirmPassword.value.length >= SIZE_INPUT_PASSWORD
    );

    if (inputPassword.value != inputConfirmPassword.value) {
      passwordError = true;
      passwordConfirmError = true;
    }

    setInputPassword((prev) => ({
      ...prev,
      error: passwordError,
    }));
    setInputConfirmPassword((prev) => ({
      ...prev,
      error: passwordConfirmError,
    }));
    setValid(passwordError && passwordConfirmError);
  }, [inputPassword, inputConfirmPassword]);

  const handleVerifyEmail = useCallback(
    async (event) => {
      event.preventDefault();

      if (inputEmail.error) return;

      // if (loginState.email.user) return;

      dispatch(emailRequest({ email: inputEmail.value }));

      if (loginState.email?.user && loginState.email?.password) {
        handleLogin(event);
      }
    },
    [inputPassword, inputEmail]
  );

  const handleKeyEnter = (e: any) => {
    if (e.key === "Enter") {
      if (loginState.email?.user) {
        if (loginState.email?.password) {
          handleLogin(e);
        } else {
          handlePassword(e);
          handleLogin(e);
        }
      } else {
        handleVerifyEmail(e);
      }
    }
  };

  function handleVerifyEmailAndPassword(e: any) {
    handleVerifyEmail(e);
    handlePassword(e);
    handleLogin(e);
  }
  useEffect(() => {
    let minSizePass = inputPassword.value.length >= SIZE_INPUT_PASSWORD;
    let minSizePassConfirm =
      inputConfirmPassword.value.length >= SIZE_INPUT_PASSWORD;

    if (
      inputConfirmPassword.value === inputPassword.value &&
      minSizePass &&
      minSizePassConfirm &&
      checkPolicy
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [inputConfirmPassword, inputPassword, checkPolicy]);
  useEffect(() => {}, [loginState]);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: loginState.email.user,
      password: "",
      confirmPassword: "",
      policyAccepted: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        updateUserPasswordRequest({
          email: inputEmail.value,
          password: values.password,
        })
      );
      dispatch(
        loadRequest({ email: inputEmail.value, password: values.password })
      );
    },
  });
  const formikRecoveryPassword = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchemaRecoveryPassword,
    onSubmit: (values) => {
      dispatch(loadUserByEmail(values.email));
      setSendEmail(true);
      setInputEmailForRecovery({ value: values.email });
    },
    // dispatch(
    //   updateUserPasswordRequest({
    //     email: inputEmailForRecovery.value,
    //     password: values.password,
    //   })
    // );
    // dispatch(
    //   loadRequest({ email: inputEmailForRecovery.value, password: values.password })
    // );
  });
  const handleUserbyEmail = useCallback(() => {
    // console.log(inputEmailForRecovery.value);
    dispatch(loadUserByEmail(inputEmailForRecovery.value));
    setSendEmail(true);
  }, [inputEmailForRecovery]);
  const ForgotPassword = () => (
    <Grid item mt={1}>
      <Link
        sx={{ width: "130px", display: "inline-block" }}
        onClick={() => setShowRecoveryPassword(true)}
        rel="noopener"
      >
        <Typography
          align={mdQuery ? "center" : "left"}
          variant="body2"
          sx={{
            width: "auto",
            cursor: "pointer",
            color: theme.palette.terciary.main,
            background: theme.palette.primary.main,
            borderRadius: "4px",
            padding: "0 4px",
            "&:hover": {
              color: theme.palette.common.white,
              textDecoration: "underline",
            },
          }}
        >
          Esqueceu a senha?
        </Typography>
      </Link>
    </Grid>
  );
  const renderOfLogin = () => (
    <Grid item sx={{ width: "25rem" }}>
      <WelcomeTextWrapper>
        <Typography
          fontWeight={500}
          variant="body1"
          align={mdQuery ? "center" : "left"}
          color={"common.white"}
        >
          Bem-vindo(a)! Realize seu login para continuar:
        </Typography>
      </WelcomeTextWrapper>
      <form
        style={{
          width: "100%", // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        }}
        noValidate
      >
        <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root.MuiInputBase-root": {
              "&.Mui-focused": {
                "& fieldset": {
                  border: `4px solid ${theme.palette.secondary.main} !important`,
                },
                // borderColor: `${theme.palette.secondary.main} !important`,
              },
              "&:hover": {
                "& fieldset": {
                  border: `4px solid ${theme.palette.terciaryDark.main}`,
                },
              },
            },
          }}
        >
          <OutlinedInput
            sx={{
              background: "white",
            }}
            color="secondary"
            onKeyDown={handleKeyEnter}
            error={inputEmail.error}
            required
            fullWidth
            placeholder="E-mail"
            name="email"
            autoComplete="number"
            autoFocus
            onChange={(inputValue) =>
              setInputEmail((prev) => ({
                ...prev,
                value: inputValue.target.value,
              }))
            }
            // onBlur={handleEmailValidator}
            id="outlined-adornment-email"
            value={inputEmail.value}
            endAdornment={
              <InputAdornment position="end">
                {/* <div className={classes.wrapper}> */}
                {/* <Fab
                      className={classes.fab}
                      aria-label="save"
                      // color="secondary"
                      // className={buttonClassname}
                      onClick={handleVerifyEmail}
                      style={{ color: "primary" }}
                    > */}
                <IconButton
                  onClick={handleVerifyEmail}
                  sx={{
                    cursor: "pointer",
                    "& svg, path": { cursor: "pointer" },
                  }}
                >
                  <ArrowForwardIcon color="secondary" />
                </IconButton>
                {/* </Fab> */}
                {/*<CircularProgress size={68} className={classes.fabProgress}/>*/}
                {/* </div> */}
              </InputAdornment>
            }
            // labelWidth={70}
          />
        </FormControl>
        {loginState.email.user ? (
          <>
            {loginState.email.password ? (
              <>
                <FormControl fullWidth margin="normal" variant="outlined">
                  {/* <InputLabel
                    htmlFor="outlined-adornment-password"
                    color="secondary"
                  >
                    Senha
                  </InputLabel> */}
                  <OutlinedInput
                    sx={{
                      "&.MuiOutlinedInput-root.MuiInputBase-root": {
                        background: "white",
                        "&:hover": {
                          "& fieldset": {
                            border: `4px solid ${theme.palette.terciaryDark.main}`,
                          },
                        },
                        "&.Mui-focused": {
                          "& fieldset": {
                            border: `4px solid ${theme.palette.secondary.main} `,
                          },
                        },
                        "&.Mui-error": {
                          "& fieldset": {
                            border: `4px solid ${theme.palette.error.main}`,
                          },
                        },
                      },
                    }}
                    placeholder="senha"
                    color="secondary"
                    onKeyDown={handleKeyEnter}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={inputPassword.value}
                    onChange={(inputValue) =>
                      setInputPassword((prev) => ({
                        ...prev,
                        value: inputValue.target.value,
                      }))
                    }
                    error={inputPassword.error}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          sx={{
                            // cursor: "pointer",
                            "& svg, path": { cursor: "pointer" },
                          }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    // labelWidth={70}
                  />
                </FormControl>
                <FormControlLabel
                  sx={{ "& .MuiTypography-root": { color: "white" } }}
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      sx={{
                        "&.MuiCheckbox-root": {
                          "& svg": { color: theme.palette.terciary.main },
                        },
                      }}
                    />
                  }
                  label="Lembrar de mim neste computador"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{
                    background: theme.palette.terciary.main,
                    color: theme.palette.text.primary,
                    "&:hover": { background: theme.palette.terciaryDark.main },
                  }}
                  onClick={handleLogin}
                >
                  Entrar
                </Button>
              </>
            ) : (
              <>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    color="secondary"
                    sx={{
                      margin: "8px 0",

                      "& .MuiOutlinedInput-root.MuiInputBase-root": {
                        background: "white",
                        "&:hover": {
                          "& fieldset": {
                            border: `4px solid ${theme.palette.terciaryDark.main}`,
                          },
                        },
                        "&.Mui-focused": {
                          "& fieldset": {
                            border: `4px solid ${theme.palette.secondary.main} `,
                          },
                        },
                        "&.Mui-error": {
                          "& fieldset": {
                            border: `4px solid ${theme.palette.error.main}`,
                          },
                        },
                      },
                    }}
                    id="password"
                    name="password"
                    placeholder="Nova senha"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            sx={{
                              "& svg, path": { cursor: "pointer" },
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    color="secondary"
                    sx={{
                      margin: "8px 0",

                      "& .MuiOutlinedInput-root.MuiInputBase-root": {
                        background: "white",
                        "&:hover": {
                          "& fieldset": {
                            border: `4px solid ${theme.palette.terciaryDark.main}`,
                          },
                        },
                        "&.Mui-focused": {
                          "& fieldset": {
                            border: `4px solid ${theme.palette.secondary.main} `,
                          },
                        },
                        "&.Mui-error": {
                          "& fieldset": {
                            border: `4px solid ${theme.palette.error.main}`,
                          },
                        },
                      },
                    }}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirmar senha"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            sx={{
                              "& svg, path": { cursor: "pointer" },
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormGroup
                    row
                    sx={{
                      margin: "0px 0px 8px 0px",
                      alignItems: "center",
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Checkbox
                      id="policyAccepted"
                      name="policyAccepted"
                      checked={formik.values.policyAccepted}
                      onChange={formik.handleChange}
                      color="secondary"
                      sx={{
                        "&.MuiCheckbox-root": {
                          "& svg": { color: theme.palette.terciary.main },
                        },
                      }}
                    />

                    <Typography
                      variant="body2"
                      sx={{ display: "inline", color: "white" }}
                    >
                      Li e concordo com os{" "}
                      <Typography
                        variant="body2"
                        onClick={() => setOpenPolicyModal(true)}
                        sx={{
                          display: "inline",
                          cursor: "pointer",
                          color: theme.palette.terciary.main,
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        termos e politicas{" "}
                      </Typography>
                      de privacidade
                    </Typography>

                    <FormHelperText error sx={{ marginLeft: "14px" }}>
                      {formik.submitCount && !formik.values.policyAccepted
                        ? formik.errors.policyAccepted
                        : ""}
                    </FormHelperText>
                  </FormGroup>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => formik.handleSubmit()}
                    color="secondary"
                    sx={{
                      background: theme.palette.terciary.main,
                      color: theme.palette.text.primary,
                      "&:hover": {
                        background: theme.palette.terciaryDark.main,
                      },
                    }}
                  >
                    Salvar senha
                  </Button>
                </form>
              </>
            )}
          </>
        ) : (
          <>
            {/*<Button*/}
            {/*  type="submit"*/}
            {/*  fullWidth*/}
            {/*  variant="contained"*/}
            {/*  color="primary"*/}
            {/*  className={classes.submit}*/}
            {/*  onClick={handleVerifyEmail}*/}
            {/*>*/}
            {/*  Verificar*/}
            {/*</Button>*/}
          </>
        )}
        {/*<Button*/}
        {/*  background="success_rounded"*/}
        {/*  type="button"*/}
        {/*  fullWidth*/}
        {/*  variant="contained"*/}
        {/*  className={classes.create_account}*/}
        {/*  onClick={() => history.push('/register')}*/}
        {/*>*/}
        {/*  Criar conta*/}
        {/*</Button>*/}
        {console.log(loginState.email)}
        {!loginState.email.user ? (
          <ForgotPassword />
        ) : loginState.email.password ? (
          <ForgotPassword />
        ) : (
          ""
        )}
      </form>
    </Grid>
  );
  const recovery = () => (
    <Grid item sx={{ width: "25rem !important" }}>
      <Typography
        variant="h5"
        fontWeight={500}
        color="white"
        mb={1}
        align={mdQuery ? "center" : "left"}
      >
        Redefina sua senha
      </Typography>

      <Typography
        variant="body1"
        mb={2}
        color="white"
        align={mdQuery ? "center" : "left"}
      >
        Insira seu e-mail
      </Typography>
      <FormControl
        fullWidth
        onSubmit={() => formikRecoveryPassword.handleSubmit()}
      >
        <TextField
          id="email"
          name="email"
          value={formikRecoveryPassword.values.email}
          onChange={formikRecoveryPassword.handleChange}
          error={
            formikRecoveryPassword.touched.email &&
            Boolean(formikRecoveryPassword.errors.email)
          }
          helperText={
            formikRecoveryPassword.touched.email &&
            formikRecoveryPassword.errors.email
          }
          color="secondary"
          fullWidth
          // label="E-mail"
          placeholder="E-mail"
          variant="outlined"
          type={"email"}
          // size="small"
          sx={{
            "& .MuiOutlinedInput-root.MuiInputBase-root": {
              background: "white",
              "&.Mui-error": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: `4px solid ${theme.palette.error.main} !important`,
                },
              },
              "&.Mui-focused": {
                "& fieldset": {
                  border: `4px solid ${theme.palette.secondary.main} !important`,
                },
                // borderColor: `${theme.palette.secondary.main} !important`,
              },
              "&:hover": {
                "& fieldset": {
                  border: `4px solid ${theme.palette.terciaryDark.main}`,
                },
              },
            },
          }}
        />

        <Grid
          item
          sx={{
            margin: "1rem 0",
            display: "flex",
            gap: "0.5rem",
            flexWrap: smQuery ? "wrap" : "nowrap",
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            onClick={() => formikRecoveryPassword.handleSubmit()}
            sx={{
              backgroundColor: theme.palette.terciary.main,
              color: theme.palette.primary.main,
              "&:hover": { backgroundColor: theme.palette.terciaryDark.main },
            }}
          >
            Enviar
          </Button>

          <Button
            onClick={() => setShowRecoveryPassword(false)}
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{
              color: theme.palette.terciary.main,
              border: `1px solid ${theme.palette.terciary.main}`,
              "&:hover": {
                border: `1px solid ${theme.palette.terciaryDark.main}`,
              },
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </FormControl>
    </Grid>
  );
  const recoverySend = () => (
    <Grid item sx={{ width: "25rem" }}>
      <Typography
        variant="h5"
        fontWeight={500}
        color="white"
        mb={1}
        align={mdQuery ? "center" : "left"}
      >
        Verifique seu e-mail
      </Typography>
      <Typography
        color="white"
        variant="h6"
        align={mdQuery ? "center" : "left"}
      >
        {`Enviamos um link de recuperação para o e-mail ${inputEmailForRecovery.value}. Confira sua caixa de
        entrada e clique no link de confirmação para criar uma nova senha.`}
      </Typography>
      <Typography mt={1} color="white" align={mdQuery ? "center" : "left"}>
        Se não receber o e-mail em 5 minutos:
      </Typography>
      <Typography
        ml={1}
        mt={1}
        color="white"
        align={mdQuery ? "center" : "left"}
      >
        - Verifique se o e-mail para recuperação está correto
        <br />- Verifique sua caixa de span
      </Typography>

      <Grid
        item
        sx={{
          margin: "1rem 0",
          display: "flex",
          gap: "0.5rem",
          flexWrap: smQuery ? "wrap" : "nowrap",
        }}
      >
        <Button
          sx={{
            height: "2rem",
            backgroundColor: theme.palette.terciary.main,
            color: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.terciaryDark.main },
          }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleUserbyEmail}
          fullWidth
        >
          Reenviar Email
        </Button>
        <Button
          sx={{
            height: "2rem",
            color: theme.palette.terciary.main,
            border: `1px solid ${theme.palette.terciary.main}`,
            "&:hover": {
              border: `1px solid ${theme.palette.terciaryDark.main}`,
            },
          }}
          type="submit"
          variant="outlined"
          color="primary"
          onClick={() => setShowRecoveryPassword(false)}
          fullWidth
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <>
      {loginState.loading && <Loading />}
      <Container
        sx={{
          maxWidth: "none !important",
          height: "calc(100% - 24px)",
          margin: 0,
          backgroundColor: theme.palette.primary.main,
          overflow: "hidden",
          padding: "0px !important",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "& .MuiFormHelperText-root": { fontWeight: 700 },
        }}
      >
        <Box sx={{ marginTop: "-20px" }}>
          <BackgroundAnimated />
        </Box>

        <Container
          sx={{
            width: "100%",
            padding: "16px",
            position: "absolute",
            top: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            zIndex: 10,
            maxWidth: "none !important",
            // background: "pink",
          }}
        >
          <Grid
            container
            gap={2}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              maxWidth: "1200px",
              // padding: "0 1rem",
            }}
          >
            <Grid
              xs={12}
              sm={12}
              md={6}
              lg={6}
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                display="flex"
                width={"25rem"}
                justifyContent="center"
                alignItems="center"
              >
                <THCStype1
                  fill={theme.palette.common.white}
                  // width={"25rem"}
                  width={"100%"}
                />
                {/* <HomeIconLogo /> */}
              </Box>
            </Grid>
            {showRecoveryPassword
              ? sendEmail
                ? recoverySend()
                : recovery()
              : renderOfLogin()}

            <Copyright />
          </Grid>
        </Container>
        <BackgroundHouses amountOfHouses={6} />
        {/* {generateRandomHouses(5)} */}
      </Container>
      <Dialog
        open={openPolicyModal}
        onClose={() => setOpenPolicyModal(false)}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Política de Privacidade
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {/* {[...new Array(500)]
              .map(() => `Cras mattis. Asdasd asd.`)
              .join("\n")} */}
            {policity()}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ marginTop: "1.25rem" }}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenPolicyModal(false);

              formik.values.policyAccepted = false;
              // setCheckPolicy(false);
            }}
            color="error"
          >
            Não Aceitar
          </Button>
          <Button
            onClick={() => {
              setOpenPolicyModal(false);
              formik.values.policyAccepted = true;
              // setCheckPolicy(true);
            }}
            variant="contained"
            color="secondary"
          >
            Aceitar
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={loginState.error}
        key={'login_error'}
      >
        <Alert severity="error">
          E-mail e/ou senha inválida
        </Alert>
      </Snackbar> */}
    </>
  );
}
