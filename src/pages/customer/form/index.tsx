import React, { useState } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	FormControl,
	InputLabel,
	InputAdornment
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import {
	ButtonsContent,
	ButtonDefeault,
	ButtonPrimary,
	FormSection,
	FormContent,
	InputFiled as TextField,
	OutlinedInputFiled,
	FormGroupSection
} from './styles';

import { getAddress } from '../../../providers/correios';

interface IFormFields {
	id?: string;
	socialName?: string;
	fantasyName?: string;
	fiscalNumber?: string;
	postalCode?: string;
	city?: string;
	neighborhood?: string;
	address?: string;
	addressNumber?: string;
	addressComplement?: string;
	email?: string;
	phone?: string;
	cellphone?: string;
}

interface IPageParams {
	id?: string;
}

export default function CustomerForm(props: RouteComponentProps<IPageParams>) {
	const history = useHistory();

	const [ state, setState ] = useState<IFormFields>({
		id: props.match.params.id || '',
		socialName: '',
		fantasyName: '',
		fiscalNumber: '',
		postalCode: '',
		city: '',
		neighborhood: '',
		address: '',
		addressNumber: '',
		addressComplement: '',
		email: '',
		phone: '',
		cellphone: ''
	});

	const [ openModalCancel, setOpenModalCancel ] = useState(false);

	async function handleCep(cep: string) {
		if (cep.length === 0) return;

		const address = await getAddress(cep);

		if (address.data.cep) {
			const { bairro: neighborhood, localidade: city, logradouro: addressName } = address.data;

			setState({
				...state,
				neighborhood,
				city,
				address: addressName
			});
		}
	}

	function handleSaveFormCustomer() {
		console.log(state);
	}

	function handleOpenModalCancel() {
		setOpenModalCancel(true);
	}

	function handleCloseModalCancel() {
		setOpenModalCancel(false);
	}

	function handleCancelForm() {
		setOpenModalCancel(false);
		history.goBack();
	}

	return (
		<Sidebar>
			<FormSection>
				<FormContent>
					<FormTitle>Cadastro de Clientes</FormTitle>

					<FormGroupSection>
						<Grid container>
							<Grid item md={2} xs={4}>
								<TextField
									id="input-customer-id"
									label="ID"
									variant="outlined"
									size="small"
									value={state.id}
									fullWidth
									disabled
								/>
							</Grid>
							<Grid item md={5} xs={12}>
								<TextField
									id="input-social-name"
									label="Nome Social"
									variant="outlined"
									size="small"
									value={state.socialName}
									onChange={(element) => setState({ ...state, socialName: element.target.value })}
									fullWidth
								/>
							</Grid>
							<Grid item md={4} xs={12}>
								<TextField
									id="input-fantasy-name"
									label="Nome Fantasia"
									variant="outlined"
									size="small"
									value={state.fantasyName}
									onChange={(element) => setState({ ...state, fantasyName: element.target.value })}
									fullWidth
								/>
							</Grid>

							<Grid item md={2} xs={12}>
								<TextField
									id="input-fiscal-number"
									label="CNPJ"
									variant="outlined"
									size="small"
									value={state.fiscalNumber}
									onChange={(element) => setState({ ...state, fiscalNumber: element.target.value })}
									placeholder="00.000.000/0000-00"
									fullWidth
								/>
							</Grid>

							<Grid item md={10} />
						</Grid>
					</FormGroupSection>

					{/*  */}
					<FormGroupSection>
						<Grid container>
							<Grid item md={2} xs={12}>
								<FormControl variant="outlined" size="small" fullWidth>
									<InputLabel htmlFor="search-input">CEP</InputLabel>
									<OutlinedInputFiled
										id="input-postal-code"
										label="CEP"
										placeholder="00000-000"
										value={state.postalCode}
										onChange={(element) => setState({ ...state, postalCode: element.target.value })}
										onBlur={(element) => handleCep(element.target.value)}
										endAdornment={
											<InputAdornment position="end">
												<SearchOutlined style={{ color: 'var(--primary)' }} />
											</InputAdornment>
										}
										labelWidth={155}
									/>
								</FormControl>
							</Grid>

							<Grid item md={3} xs={6} />

							<Grid item md={3} xs={12}>
								<TextField
									id="input-city"
									label="Cidade"
									variant="outlined"
									size="small"
									value={state.city}
									onChange={(element) => setState({ ...state, city: element.target.value })}
									fullWidth
								/>
							</Grid>

							<Grid item md={3} xs={12}>
								<TextField
									id="input-neighborhood"
									label="Bairro"
									variant="outlined"
									size="small"
									value={state.neighborhood}
									onChange={(element) => setState({ ...state, neighborhood: element.target.value })}
									fullWidth
								/>
							</Grid>

							<Grid item md={6} xs={12}>
								<TextField
									id="input-address"
									label="Endereço"
									variant="outlined"
									size="small"
									value={state.address}
									onChange={(element) => setState({ ...state, address: element.target.value })}
									fullWidth
								/>
							</Grid>

							<Grid item md={2} xs={12}>
								<TextField
									id="input-address-number"
									label="Número"
									variant="outlined"
									size="small"
									value={state.addressNumber}
									onChange={(element) => setState({ ...state, addressNumber: element.target.value })}
									fullWidth
								/>
							</Grid>

							<Grid item md={3} xs={12}>
								<TextField
									id="input-address-complement"
									label="Complemento"
									variant="outlined"
									size="small"
									value={state.addressComplement}
									onChange={(element) => setState({ ...state, addressComplement: element.target.value })}
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormGroupSection>

					<Grid container>
						<Grid item md={3} xs={12}>
							<TextField
								id="input-email"
								label="E-mail"
								variant="outlined"
								size="small"
								value={state.email}
								onChange={(element) => setState({ ...state, email: element.target.value })}
								fullWidth
							/>
						</Grid>
						<Grid item md={2} xs={12}>
							<TextField
								id="input-phone"
								label="Telefone"
								variant="outlined"
								size="small"
								value={state.phone}
								onChange={(element) => setState({ ...state, phone: element.target.value })}
								placeholder="0000-0000"
								fullWidth
							/>
						</Grid>
						<Grid item md={2} xs={12}>
							<TextField
								id="input-cellphone"
								label="Celular"
								variant="outlined"
								size="small"
								value={state.cellphone}
								onChange={(element) => setState({ ...state, cellphone: element.target.value })}
								placeholder="00000-0000"
								fullWidth
							/>
						</Grid>
					</Grid>
				</FormContent>
				<ButtonsContent>
					<ButtonDefeault variant="outlined" color="default" onClick={() => handleOpenModalCancel()}>
						Cancelar
					</ButtonDefeault>
					<ButtonPrimary variant="contained" color="primary" onClick={() => handleSaveFormCustomer()}>
						Salvar
					</ButtonPrimary>
				</ButtonsContent>
			</FormSection>

			<Dialog
				open={openModalCancel}
				onClose={handleCloseModalCancel}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Cancelar</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Tem certeza que deseja cancelar este cadastro?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModalCancel} color="primary">
						Não
					</Button>
					<Button onClick={handleCancelForm} color="primary" autoFocus>
						Sim
					</Button>
				</DialogActions>
			</Dialog>
		</Sidebar>
	);
}
