import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Divider, Grid, List, ListItem, ListItemText, Menu, MenuItem, Tooltip, Typography} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import {useHistory} from "react-router-dom";

import QueueIcon from '@material-ui/icons/Queue';
import TodayRoundedIcon from '@material-ui/icons/TodayRounded';
import {FormTitle} from '../../../styles/components/Form';
import Sidebar from '../../../components/Sidebar';

import {loadCareById} from '../../../store/ducks/cares/actions';

import {ReactComponent as IconProfile} from '../../../assets/img/icon-profile.svg';
import {ReactComponent as IconProntuario} from '../../../assets/img/icon-prontuario.svg';
import IconMultidisciplinar from '../../../assets/img/icon-equipe-medica.svg';
import IconDadosPessoais from '../../../assets/img/icon-dados-pessoais.svg';
import IconPlanoInternacoes from '../../../assets/img/icon-plano-internacoes.svg';
import IconUltimosProced from '../../../assets/img/icon-ultimos-procedimentos.svg';

import IconAfericao from '../../../assets/img/icon-afericao.svg';
import IconCurativos from '../../../assets/img/icon-curativos.svg';
import IconMedicacao from '../../../assets/img/icon-medicacao.svg';
import IconStatus from '../../../assets/img/icon-status.svg';

import {ContainerStyle as Container, Profile} from './styles';
import ButtonComponent from '../../../styles/components/Button';
import Button from '../../../styles/components/Button';
import {MoreVert, Check as CheckIcon, Close as CloseIcon, Add as AddIcon} from '@material-ui/icons';
import {ApplicationState} from '../../../store';
import {RouteComponentProps} from 'react-router-dom';
import {age, formatDate} from '../../../helpers/date';
import mask from '../../../utils/mask';
import Loading from '../../../components/Loading';
import QRCode from "react-qr-code";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

interface IPageParams {
  id?: string;
}

export default function PatientOverview(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const {params} = props.match;
  const careState = useSelector((state: ApplicationState) => state.cares);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (params.id) {
      dispatch(loadCareById(params.id));
    }

  }, [dispatch]);

  const handleOpenRowMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, [anchorEl]);

  const handleCloseRowMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const renderPatientStatus = useCallback((status: string) => {
    switch (status) {
      case 'Não Elegível':
        return <CloseIcon style={{color: '#FF6565', cursor: 'pointer'}}/>
      case 'Elegível':
        return <CheckIcon style={{color: '#4FC66A', cursor: 'pointer'}}/>
      default:
        return <CheckIcon style={{color: '#EBEBEB'}}/>
    }
  }, []);

  const getLastDocument = useCallback(() => {
    const {documents_id: documents} = careState.data;

    return documents ? documents[documents.length - 1]?.created_at : '';
  }, [careState]);

  const getPatientPhone = useCallback(() => {
    const {patient_id: patient} = careState.data;

    const number = patient?.phones[0].number

    return number;
  }, [careState]);

  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION)

  return (
    <>
      <Sidebar>
        {careState.loading && <Loading/>}
        <Container>
          <FormTitle>Overview de Paciente</FormTitle>

          {integration ? (
            <>
              <Card>
                <Box mb={2} mt={2} paddingLeft={5} paddingRight={5} display="flex" justifyContent="space-between"
                     alignItems="center">
                  <Profile>
                    <IconProfile/>
                    <div>
                      <h5>{careState.data.patient_id?.name}</h5>
                      <p>{careState.data.patient_id?.birthdate ? age(careState.data.patient_id?.birthdate) : ''}</p>
                    </div>
                  </Profile>
                </Box>
              </Card>
              <Grid container xs={12} style={{justifyContent: 'center'}}>
                <Grid container md={8} xs={8} spacing={2} style={{marginTop: '2%'}}>
                  {/* Dados pessoais */}
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card className="card-styles">
                      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                        <img src={IconDadosPessoais} alt="Dados pessoais"/>
                        <h5>Dados pessoais</h5>
                        <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}
                                aria-haspopup="true" onClick={handleOpenRowMenu}>
                          <MoreVert/>
                        </Button>
                        <Menu
                          id={`menu-prontuario`}
                          anchorEl={anchorEl}
                          keepMounted
                          open={anchorEl?.id === `btn_menu-prontuario`}
                          onClose={handleCloseRowMenu}
                        >
                          <MenuItem
                            onClick={() => history.push(`/patient/${careState.data.patient_id._id}/view/edit`)}>
                            Visualizar Paciente
                          </MenuItem>
                          <Divider/>
                        </Menu>
                      </Box>

                      {/*<List className="text-list" component="ul" aria-label="mailbox folders">*/}
                      {/*  <ListItem>*/}
                      {/*    <p>CPF: {mask(careState.data.patient_id?.fiscal_number, '###.###.###-##')}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>RG: {mask(careState.data.patient_id?.national_id, '#.###.###')} {careState.data.patient_id?.issuing_organ.toString().toUpperCase()}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>DN: {formatDate(careState.data.patient_id?.birthdate, ' DD/MM/YYYY')}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Mãe: {careState.data.patient_id?.mother_name}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Tipo Sanguíneo: {careState.data.patient_id?.blood_type}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Doador de órgãos: {careState.data.patient_id?.organ_donor ? 'Sim' : 'Não'}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Sexo: {careState.data.patient_id?.gender}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Telefone: {mask(getPatientPhone(), '(##) #####-####')}</p>*/}
                      {/*  </ListItem>*/}
                      {/*</List>*/}

                      <footer>
                        <Typography variant="caption" color="textSecondary">
                          Última avaliação
                          {/*{formatDate(careState.data.patient_id?.created_at, ' DD/MM/YYYY [às] HH:mm')}*/}
                          {/* {formatDate(state?.started_at ?? '', 'DD/MM/YYYY HH:mm:ss')} */}
                        </Typography>
                      </footer>
                    </Card>
                  </Grid>
                  {/* Plano de internacao */}
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card className="card-styles">
                      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                        <img src={IconPlanoInternacoes} alt="Plano Internações"/>
                        <h5>Plano e internação</h5>
                        <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}
                                aria-haspopup="true">
                          <MoreVert/>
                        </Button>
                      </Box>

                      {/*<List className="text-list" component="ul" aria-label="mailbox folders">*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Hospital: {careState.data.capture?.hospital}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Unidade: {careState.data.capture?.unity}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Setor: {careState.data.capture?.sector}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Leito: {careState.data.capture?.bed}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Convênio: {careState.data.health_insurance_id?.name}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Plano: {careState.data.health_plan_id?.name}</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <p>Sub Plano: {careState.data.health_sub_plan_id?.name}</p>*/}
                      {/*  </ListItem>*/}
                      {/*</List>*/}

                      <footer>
                        <Typography variant="caption" color="textSecondary">
                          Última avaliação
                          {/*{formatDate(careState.data.updated_at, 'DD/MM/YYYY [às] HH:mm')}*/}
                        </Typography>
                      </footer>
                    </Card>
                  </Grid>
                  {/* Equipe Multidisciplinar */}
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card className="card-styles">
                      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                        <img src={IconMultidisciplinar} alt="Equipe médica"/>
                        <h5>Equipe multidisciplinar</h5>
                        <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}
                                aria-haspopup="true">
                          <MoreVert/>
                        </Button>
                      </Box>

                      {/*<List className="text-list" component="ul" aria-label="mailbox folders">*/}
                      {/*  <ListItem>*/}
                      {/*    <CheckIcon style={{color: '#4FC66A'}}/>*/}
                      {/*    <p>texto</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <CloseIcon style={{color: '#FF6565'}}/>*/}
                      {/*    <p>texto</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <AddIcon style={{color: '#0899BA'}}/>*/}
                      {/*    <p>texto</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}

                      {/*  </ListItem>*/}
                      {/*</List>*/}

                      <footer>
                        <Typography variant="caption" color="textSecondary">
                          Última avaliação
                          {/* {formatDate(state?.started_at ?? '', 'DD/MM/YYYY HH:mm:ss')} */}
                        </Typography>
                      </footer>
                    </Card>
                  </Grid>
                  {/* Equipe Multidisciplinar */}
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card className="card-styles">
                      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                        <img src={IconMultidisciplinar} alt="Equipe médica"/>
                        <h5>Equipe multidisciplinar</h5>
                        <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}
                                aria-haspopup="true">
                          <MoreVert/>
                        </Button>
                      </Box>

                      {/*<List className="text-list" component="ul" aria-label="mailbox folders">*/}
                      {/*  <ListItem>*/}
                      {/*    <CheckIcon style={{color: '#4FC66A'}}/>*/}
                      {/*    <p>texto</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <CloseIcon style={{color: '#FF6565'}}/>*/}
                      {/*    <p>texto</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}
                      {/*    <AddIcon style={{color: '#0899BA'}}/>*/}
                      {/*    <p>texto</p>*/}
                      {/*  </ListItem>*/}
                      {/*  <ListItem>*/}

                      {/*  </ListItem>*/}
                      {/*</List>*/}

                      <footer>
                        <Typography variant="caption" color="textSecondary">
                          Última avaliação
                          {/* {formatDate(state?.started_at ?? '', 'DD/MM/YYYY HH:mm:ss')} */}
                        </Typography>
                      </footer>
                    </Card>
                  </Grid>
                </Grid>
                <Grid container md={4} xs={4} spacing={2} style={{marginTop: '2%'}}>
                  {/* Equipe Multidisciplinar */}
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card className="card-styles">
                      <ButtonComponent onClick={() => history.push(`/care/${params.id}/overview/schedule`)}
                                       background="primary" fullWidth>
                        <TodayRoundedIcon/>
                        <p>Agenda</p>
                      </ButtonComponent>
                      {careState.data._id && (
                        <Card style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                          <p style={{paddingTop: "1.6rem"}}>
                            <QRCode value={JSON.stringify(careState.data._id)}/>
                          </p>
                        </Card>
                      )}
                    </Card>
                  </Grid>
                  {/* Equipe Multidisciplinar */}
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card className="card-styles">
                      <ButtonComponent onClick={() => history.push(`/care/${params.id}/overview/schedule`)}
                                       background="primary" fullWidth>
                        <TodayRoundedIcon/>
                        <p>Agenda</p>
                      </ButtonComponent>
                      {careState.data._id && (
                        <Card style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                          <p style={{paddingTop: "1.6rem"}}>
                            <QRCode value={JSON.stringify(careState.data._id)}/>
                          </p>
                        </Card>
                      )}
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/*<Grid container md={4} xs={12} style={{marginTop: '2%'}}> /!** Aside *!/*/}
              {/*  <Grid item md={12}>*/}
              {/*    <ButtonComponent onClick={() => history.push(`/care/${params.id}/overview/schedule`)}*/}
              {/*                     background="primary" fullWidth>*/}
              {/*      <TodayRoundedIcon/>*/}
              {/*      <p>Agenda</p>*/}
              {/*    </ButtonComponent>*/}
              {/*    {careState.data._id && (*/}
              {/*      <Card style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>*/}
              {/*        <p style={{paddingTop: "1.6rem"}}>*/}
              {/*          <QRCode value={JSON.stringify(careState.data._id)}/>*/}
              {/*        </p>*/}
              {/*      </Card>*/}
              {/*    )}*/}
              {/*  </Grid>*/}
              {/*  <Grid item md={12} style={{marginTop: '20px'}}>*/}
              {/*    <ButtonComponent onClick={() => history.push(`/care/${params.id}/overview/schedule`)}*/}
              {/*                     background="primary" fullWidth>*/}
              {/*      <TodayRoundedIcon/>*/}
              {/*      <p>Agenda</p>*/}
              {/*    </ButtonComponent>*/}
              {/*    {careState.data._id && (*/}
              {/*      <Card style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>*/}
              {/*        <p style={{paddingTop: "1.6rem"}}>*/}
              {/*          <QRCode value={JSON.stringify(careState.data._id)}/>*/}
              {/*        </p>*/}
              {/*      </Card>*/}
              {/*    )}*/}
              {/*  </Grid>*/}
              {/*</Grid>*/}
              {/* Ultimos procedimentos */}
              <Grid item md={12} xs={12} style={{marginTop: '20px'}}>
                <Card className="card-styles">
                  <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                    <img src={IconUltimosProced} style={{marginLeft: '2%'}} alt="Dados pessoais"/>
                    <div className="card-styles-footer">
                      <h5>Últimos procedimentos</h5>
                    </div>
                    <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}
                            aria-haspopup="true">
                      <MoreVert/>
                    </Button>
                  </Box>

                  <Grid container>
                    <Grid item md={4} xs={12} style={{paddingLeft: '6%'}}>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </>
          ) : (
            <>
              <Card>
                <Box mb={2} mt={2} paddingLeft={5} paddingRight={5} display="flex" justifyContent="space-between"
                     alignItems="center">
                  <Profile>
                    <IconProfile/>
                    <div>
                      <h5>{careState.data.patient_id?.name}</h5>
                      <p>{careState.data.patient_id?.birthdate ? age(careState.data.patient_id?.birthdate) : ''}</p>
                    </div>
                  </Profile>
                  <div>
                    <ButtonComponent background="success">
                      <QueueIcon/>
                      <p>Protuário do paciente</p>
                    </ButtonComponent>
                  </div>
                </Box>
              </Card>

              <Grid container xs={12}>
                <Grid container md={8} xs={12} style={{marginTop: '2%'}}>

                  {/* Avalicao paciente */}
                  <Grid item md={6} xs={12} style={{paddingRight: '10px'}}>
                    <Card className="card-styles">
                      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                        <IconProntuario/>
                        <h5>Avaliação do paciente</h5>
                        <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}
                                aria-haspopup="true" onClick={handleOpenRowMenu}>
                          <MoreVert/>
                        </Button>
                        <Menu
                          id={`menu-prontuario`}
                          anchorEl={anchorEl}
                          keepMounted
                          open={anchorEl?.id === `btn_menu-prontuario`}
                          onClose={handleCloseRowMenu}
                        >
                          <MenuItem onClick={() => {
                          }}>Visualizar</MenuItem>
                          <Divider/>
                          <MenuItem onClick={() => {
                          }}>Editar</MenuItem>
                        </Menu>
                      </Box>

                      <List className="text-list" component="ul" aria-label="mailbox folders">
                        {careState.data.documents_id?.map(document => (
                          <ListItem>
                            {renderPatientStatus(document.status)}
                            <p>{document.document_group_id.name} : {document.complexity}</p>
                          </ListItem>
                        ))}
                      </List>

                      <Box display="flex" justifyContent="center" paddingTop={2} paddingBottom={1}>
                        <Button background="primary" onClick={() => {
                        }}>Adicionar manutenção</Button>
                      </Box>

                      <footer>
                        <Typography variant="caption" color="textSecondary">
                          Última avaliação:
                          {formatDate(getLastDocument(), ' DD/MM/YYYY [às] HH:mm')}
                        </Typography>
                      </footer>
                    </Card>
                  </Grid>

                  {/* Dados pessoais */}
                  <Grid item md={6} xs={12} style={{paddingRight: '10px'}}>
                    <Card className="card-styles">
                      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                        <img src={IconDadosPessoais} alt="Dados pessoais"/>
                        <h5>Dados pessoais</h5>
                        <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}
                                aria-haspopup="true" onClick={handleOpenRowMenu}>
                          <MoreVert/>
                        </Button>
                        <Menu
                          id={`menu-prontuario`}
                          anchorEl={anchorEl}
                          keepMounted
                          open={anchorEl?.id === `btn_menu-prontuario`}
                          onClose={handleCloseRowMenu}
                        >
                          <MenuItem onClick={() => {
                          }}>Visualizar</MenuItem>
                          <Divider/>
                          <MenuItem onClick={() => {
                          }}>Editar</MenuItem>
                        </Menu>
                      </Box>

                      <List className="text-list" component="ul" aria-label="mailbox folders">
                        <ListItem>
                          <p>CPF: {mask(careState.data.patient_id?.fiscal_number, '###.###.###-##')}</p>
                        </ListItem>
                        <ListItem>
                          <p>RG: {mask(careState.data.patient_id?.national_id, '#.###.###')} {careState.data.patient_id?.issuing_organ.toString().toUpperCase()}</p>
                        </ListItem>
                        <ListItem>
                          <p>DN: {formatDate(careState.data.patient_id?.birthdate, ' DD/MM/YYYY')}</p>
                        </ListItem>
                        <ListItem>
                          <p>Mãe: {careState.data.patient_id?.mother_name}</p>
                        </ListItem>
                        <ListItem>
                          <p>Tipo Sanguíneo: {careState.data.patient_id?.blood_type}</p>
                        </ListItem>
                        <ListItem>
                          <p>Doador de órgãos: {careState.data.patient_id?.organ_donor ? 'Sim' : 'Não'}</p>
                        </ListItem>
                        <ListItem>
                          <p>Sexo: {careState.data.patient_id?.gender}</p>
                        </ListItem>
                        <ListItem>
                          <p>Telefone: {mask(getPatientPhone(), '(##) #####-####')}</p>
                        </ListItem>
                      </List>

                      <footer>
                        <Typography variant="caption" color="textSecondary">
                          Última avaliação:
                          {formatDate(careState.data.patient_id?.created_at, ' DD/MM/YYYY [às] HH:mm')}
                          {/* {formatDate(state?.started_at ?? '', 'DD/MM/YYYY HH:mm:ss')} */}
                        </Typography>
                      </footer>
                    </Card>
                  </Grid>

                  {/* Equipe Multidisciplinar */}
                  <Grid item md={6} xs={12} style={{paddingRight: '10px', marginTop: '20px'}}>
                    <Card className="card-styles">
                      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                        <img src={IconMultidisciplinar} alt="Equipe médica"/>
                        <h5>Equipe multidisciplinar</h5>
                        <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}
                                aria-haspopup="true" onClick={handleOpenRowMenu}>
                          <MoreVert/>
                        </Button>
                        <Menu
                          id={`menu-prontuario`}
                          anchorEl={anchorEl}
                          keepMounted
                          open={anchorEl?.id === `btn_menu-prontuario`}
                          onClose={handleCloseRowMenu}
                        >
                          <MenuItem onClick={() => {
                          }}>Visualizar</MenuItem>
                          <Divider/>
                          <MenuItem onClick={() => {
                          }}>Editar</MenuItem>
                        </Menu>
                      </Box>

                      <List className="text-list" component="ul" aria-label="mailbox folders">
                        <ListItem>
                          <CheckIcon style={{color: '#4FC66A'}}/>
                          <p>texto</p>
                        </ListItem>
                        <ListItem>
                          <CloseIcon style={{color: '#FF6565'}}/>
                          <p>texto</p>
                        </ListItem>
                        <ListItem>
                          <AddIcon style={{color: '#0899BA'}}/>
                          <p>texto</p>
                        </ListItem>
                        <ListItem>

                        </ListItem>
                      </List>

                      <footer>
                        <Typography variant="caption" color="textSecondary">
                          Última avaliação: 08/11/2020, às 14h25
                          {/* {formatDate(state?.started_at ?? '', 'DD/MM/YYYY HH:mm:ss')} */}
                        </Typography>
                      </footer>
                    </Card>
                  </Grid>

                  {/* Plano de internacao */}
                  <Grid item md={6} xs={12} style={{paddingRight: '10px', marginTop: '20px'}}>
                    <Card className="card-styles">
                      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                        <img src={IconPlanoInternacoes} alt="Plano Internações"/>
                        <h5>Plano e internação</h5>
                        <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}
                                aria-haspopup="true" onClick={handleOpenRowMenu}>
                          <MoreVert/>
                        </Button>
                        <Menu
                          id={`menu-prontuario`}
                          anchorEl={anchorEl}
                          keepMounted
                          open={anchorEl?.id === `btn_menu-prontuario`}
                          onClose={handleCloseRowMenu}
                        >
                          <MenuItem onClick={() => {
                          }}>Visualizar</MenuItem>
                          <Divider/>
                          <MenuItem onClick={() => {
                          }}>Editar</MenuItem>
                        </Menu>
                      </Box>

                      <List className="text-list" component="ul" aria-label="mailbox folders">
                        <ListItem>
                          <p>Hospital: {careState.data.capture?.hospital}</p>
                        </ListItem>
                        <ListItem>
                          <p>Unidade: {careState.data.capture?.unity}</p>
                        </ListItem>
                        <ListItem>
                          <p>Setor: {careState.data.capture?.sector}</p>
                        </ListItem>
                        <ListItem>
                          <p>Leito: {careState.data.capture?.bed}</p>
                        </ListItem>
                        <ListItem>
                          <p>Convênio: {careState.data.health_insurance_id?.name}</p>
                        </ListItem>
                        <ListItem>
                          <p>Plano: {careState.data.health_plan_id?.name}</p>
                        </ListItem>
                        <ListItem>
                          <p>Sub Plano: {careState.data.health_sub_plan_id?.name}</p>
                        </ListItem>
                      </List>

                      <footer>
                        <Typography variant="caption" color="textSecondary">
                          Última avaliação:
                          {formatDate(careState.data.updated_at, 'DD/MM/YYYY [às] HH:mm')}
                        </Typography>
                      </footer>
                    </Card>
                  </Grid>

                  {/* Ultimos procedimentos */}
                  <Grid item md={12} xs={12} style={{paddingRight: '10px', marginTop: '20px', marginBottom: '10%'}}>
                    <Card className="card-styles">
                      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                        <img src={IconUltimosProced} style={{marginLeft: '2%'}} alt="Dados pessoais"/>
                        <div className="card-styles-footer">
                          <h5>Últimos procedimentos</h5>
                          <Typography variant="caption" component="p" color="textSecondary">
                            Check in na Rua Conde da Boa Vista, 705 - Boa Vista
                          </Typography>
                          <Typography variant="caption" component="p" color="textSecondary">
                            Atualizado em 12/11/2020, às 19h04
                          </Typography>
                        </div>
                        <Button className="btn-dropwdown" aria-controls={`menu-prontuario`} id={`btn_menu-prontuario`}
                                aria-haspopup="true" onClick={handleOpenRowMenu}>
                          <MoreVert/>
                        </Button>
                        <Menu
                          id={`menu-prontuario`}
                          anchorEl={anchorEl}
                          keepMounted
                          open={anchorEl?.id === `btn_menu-prontuario`}
                          onClose={handleCloseRowMenu}
                        >
                          <MenuItem onClick={() => {
                          }}>Visualizar</MenuItem>
                          <Divider/>
                          <MenuItem onClick={() => {
                          }}>Editar</MenuItem>
                        </Menu>
                      </Box>

                      <Grid container>
                        <Grid item md={4} xs={12} style={{paddingLeft: '6%'}}>
                          <Box display="flex" mt={4}>
                            <img src={IconCurativos} alt="Curativo"/>
                            <p>Curativo A</p>
                          </Box>
                          <Box display="flex" mt={4}>
                            <img src={IconMedicacao} alt="Medicação"/>
                            <p>Medicação A</p>
                          </Box>
                        </Grid>
                        <Grid item md={4} xs={12} style={{paddingLeft: '6%'}}>
                          <Box display="flex" mt={4}>
                            <img src={IconStatus} alt="Status"/>
                            <p>Informação importante Y</p>
                          </Box>
                          <Box display="flex" mt={4}>
                            <img src={IconMedicacao} alt="Medicação"/>
                            <p>Aplicação de soro C 5%</p>
                          </Box>
                        </Grid>
                        <Grid item md={4} xs={12} style={{paddingLeft: '6%'}}>
                          <Box display="flex" mt={4}>
                            <img src={IconAfericao} alt="Aferição"/>
                            <p>Aferição de pressão A</p>
                          </Box>
                          <Box display="flex" mt={4}>
                            <img src={IconCurativos} alt="Curativo"/>
                            <p>Remoção de curativo B</p>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid> {/* grid container */}

                <Grid container md={4} xs={12} style={{marginTop: '2%'}}> {/** Aside */}
                  <Grid item md={12}>
                    <ButtonComponent onClick={() => history.push(`/care/${params.id}/overview/schedule`)}
                                     background="primary" fullWidth>
                      <TodayRoundedIcon/>
                      <p>Agenda</p>
                    </ButtonComponent>
                    {careState.data._id && (
                      <Card style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <p style={{paddingTop: "1.6rem"}}>
                          <QRCode value={JSON.stringify(careState.data._id)}/>
                        </p>
                      </Card>
                    )}


                  </Grid>
                  <Grid item md={4}>


                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </Sidebar>
    </>
  );
}

