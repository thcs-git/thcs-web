import React from "react";

//MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@material-ui/core/Box";

// IMG
import { ReactComponent as IconPatient } from "../../../../assets/img/icon-pacient.svg";
import { ReactComponent as IconEdit } from "../../../../assets/img/icon editar.svg";
import { ReactComponent as IconChart } from "../../../../assets/img/icon-prontuario.svg";
import { ReactComponent as IconHospitalization } from "../../../../assets/img/icon-plano-internacoes.svg";

//Styles
import { WrapperDialog } from "./styles";
interface IDialogProps {
  tittleCard: string;
  content: IContent;
  openDialog: boolean;
  setOpenDialog: any;
}
interface IContent {
  tittle: string;
  rows: IRows[];
}
interface IRows {
  name: string;
  value: any;
}

export default function DialogInfo(props: IDialogProps) {
  const { tittleCard, content, openDialog, setOpenDialog } = props;

  const handleClose = () => {
    setOpenDialog(false);
  };
  const namePatient = (data: IContent) => {
    const name = data.rows.map(({ name, value }: IRows) => {
      if (name === "Nome")
        return (
          <Box
            style={{
              fontSize: "20px",
              color: "var(--primary)",
              fontWeight: "bold",
            }}
          >
            {value}
          </Box>
        );
    });
    return name;
  };
  function iconHeader(title: string) {
    if (title === "Dados Pessoais")
      return <IconPatient style={{ width: "16px" }} />;

    if (title === "Plano e Internação")
      return <IconHospitalization style={{ width: "16px" }} />;
  }

  const boxData = (name: string, value: any) => {
    return (
      <Box style={{ color: "var(--black)", marginLeft: "24px" }}>
        {name}: {value}
      </Box>
    );
  };
  const personalData = (data: IContent) => {
    // console.log(data.rows);
    const list = data.rows.map(({ name, value }: IRows, index: number) => {
      switch (name) {
        case "Nome":
          return boxData(name, value);
        case "Gênero":
          return boxData(name, value);
        case "Estado Civil":
          return boxData(name, value);
        case "Estado Civil":
          return boxData(name, value);
        case "Data de nascimento":
          return boxData(name, value);
        case "Mãe":
          return boxData(name, value);
        case "RG":
          return boxData(name, value);
        case "CPF":
          return boxData(name, value);
        case "Celular":
          return boxData(name, value);
        case "Telefone":
          return boxData(name, value);
        case "Doador de órgãos":
          return boxData(name, value == true ? "Sim" : "Não");
        case "Nacionalidade":
          return boxData(name, value);
        case "CEP":
          return boxData(name, value);
        case "Endereço":
          return boxData(name, value);
        case "Número":
          return boxData(name, value);
        case "Bairro":
          return boxData(name, value);
        case "Cidade":
          return boxData(name, value);
        case "UF":
          return boxData(name, value);
      }
    });
    return list;
  };
  const planData = (data: IContent) => {
    let itens = data.rows.map(({ name, value }: IRows, index: number) => {
      switch (name) {
        case "Número do Atendimento":
          return boxData(name, value);
        case "Médico Assistente":
          return boxData(name, value);
        case "Tipo de internação":
          return boxData(name, value);
        case "Convênio":
          return boxData(name, value.name);
        case "Plano":
          return boxData(name, value.name);
        case "Código do paciente":
          return boxData(name, value);
        case "Unidade":
          return boxData(name, value);
        case "Setor":
          return boxData(name, value);
      }
    });
    return itens;
  };
  console.log(content.rows);
  return (
    <WrapperDialog>
      <Dialog open={openDialog} onClose={handleClose}>
        <Box
          style={{
            padding: "21px",
            fontSize: "14px",
            minWidth: "526px",
            lineHeight: "24px",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {namePatient(content)}
            <button
              style={{
                cursor: "pointer",
                border: "2px solid var(--secondary)",
                borderRadius: "2px",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "4px",
                gap: "6px",
              }}
              onClick={() => {
                console.log("cliquei");
              }}
            >
              <IconEdit style={{ cursor: "pointer" }} />
              <Box
                style={{
                  cursor: "pointer",
                  fontSize: "10px",
                  color: "var(--secondary)",
                  fontWeight: "bold",
                }}
              >
                Editar
              </Box>
            </button>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              margin: "24px auto 8px",
            }}
          >
            {iconHeader(tittleCard)}
            {/* <IconPatient style={{ width: "16px" }} /> */}
            <Box>{tittleCard} </Box>
          </Box>
          {tittleCard === "Dados Pessoais" && personalData(content)}
          {tittleCard === "Plano e Internação" && planData(content)}
        </Box>

        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ fontWeight: "bold", color: "var(--secondary)" }}
          >
            FECHAR
          </Button>
        </DialogActions>
      </Dialog>
    </WrapperDialog>
  );
}
