import React from "react";

//MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";

// IMG
import { ReactComponent as IconPatient } from "../../../../assets/img/icon-pacient.svg";
import { ReactComponent as IconEdit } from "../../../../assets/img/icon editar.svg";
import { ReactComponent as IconChart } from "../../../../assets/img/icon-prontuario.svg";
import { ReactComponent as IconHospitalization } from "../../../../assets/img/icon-plano-internacoes.svg";
import { ReactComponent as IconTeam } from "../../../../assets/img/icon-equipe-medica.svg";
import HomeIcon from "@mui/icons-material/Home";

//Styles
import { WrapperDialog } from "./styles";
interface IDialogProps {
  tittle: { card: string; info?: string[] };
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
  const { tittle, content, openDialog, setOpenDialog } = props;

  const handleClose = () => {
    setOpenDialog(false);
  };
  const namePatient = (data: IContent) => {
    const name = data.rows.map(({ name, value }: IRows) => {
      if (name === "Nome" && tittle.card !== "Plano e Internação")
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
      if (
        name === "Número do Atendimento" &&
        tittle.card === "Plano e Internação"
      ) {
        return (
          <Box
            style={{
              fontSize: "20px",
              color: "var(--primary)",
              fontWeight: "bold",
            }}
          >
            {`Atendimento ${value}`}
          </Box>
        );
      }
    });
    return name;
  };
  function iconHeader(title: string) {
    if (title === "Dados Pessoais")
      return <IconPatient style={{ width: "16px" }} />;

    if (title === "Dados do Plano")
      return <IconHospitalization style={{ width: "16px" }} />;

    if (title === "Dados de atendimento")
      return <HomeIcon style={{ width: "16px", color: "var(--secondary)" }} />;

    if (title === "Equipe Multidisciplinar")
      return <IconTeam style={{ width: "16px" }} />;
  }

  const boxData = (name: string, value: any) => {
    return (
      <Box style={{ color: "var(--black)", marginLeft: "24px" }}>
        {name}: {value}
      </Box>
    );
  };
  const personalData = (data: IContent) => {
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
        case "Convênio":
          return boxData(name, value.name);
        case "Plano":
          return boxData(name, value.name);
        case "Subplano":
          return boxData(name, value.name);
        case "Código do paciente":
          return boxData(name, value);
        case "Número da carteira":
          return boxData(name, value);
        case "Data de validade":
          return boxData(name, value);
      }
    });
    return itens;
  };

  // function handleTeamData(content: IContent) {
  //   let data: string[] = [];

  //   content.rows.map(({ name, value }: IRows, index: number) => {
  //     if (name === "Equipe") {
  //       value.map((item: string) => {
  //         data.push(item);
  //       });
  //     }
  //   });

  //   return data;
  // }
  // function teamData(arr: string[]) {
  //   let itens = arr.map((item: string, index: number) => {
  //     return (
  //       <Box style={{ color: "var(--black)", marginLeft: "24px" }} key={index}>
  //         - {item}
  //       </Box>
  //     );
  //   });

  //   return itens;
  // }
  function handleTeamData(content: IContent) {
    let team: object[] = [];
    content.rows.map(({ name, value }: IRows) => {
      if (name === "Equipe") {
        value.map((item: any) => {
          if (item.name) team.push(item);
        });
      }
    });
    return team;
  }

  function teamData(arr: object[]) {
    let itens = arr.map((item: any, index: number) => {
      if (item.name) {
        let profession: string = item.profession_id.map((profession: any) => {
          return profession.name ? profession.name : false;
        });
        return (
          <Box
            key={index}
            style={{ color: "var(--black)", marginLeft: "24px" }}
          >
            - {item.name} {profession.length > 0 && `(${profession})`}
          </Box>
        );
      }
    });
    return itens;
  }

  function careData(content: IContent) {
    let itens = content.rows.map(({ name, value }: IRows, index: number) => {
      switch (name) {
        case "Data de Atendimento":
          return boxData(name, value);
        case "Tipo de internação":
          return boxData(name, value);
        case "CID":
          return boxData(name, value.name);
        case "Médico Assistente":
          return boxData(name, value);
        case "Especialidade do Atendimento":
          return boxData(name, value.name);
        case "Leito":
          return boxData(name, value);
        case "Unidade":
          return boxData(name, value);
        case "Setor":
          return boxData(name, value);
        case "Acomodação":
          return boxData(name, value);
      }
    });
    return itens;
  }

  const dataList = (tittle: string) => {
    if (tittle === "Dados Pessoais") return personalData(content);
    if (tittle === "Dados do Plano") return planData(content);
    if (tittle === "Dados de atendimento") return careData(content);
    if (tittle === "Equipe Multidisciplinar")
      return teamData(handleTeamData(content));
  };
  return (
    <WrapperDialog>
      <Dialog open={openDialog} onClose={handleClose}>
        <Box
          style={{
            padding: "21px 21px 8px 21px",
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

          {tittle.info?.map((tittleInfo: string) => {
            // console.log(tittleInfo);
            return (
              <>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    margin: "24px auto 8px",
                  }}
                >
                  {iconHeader(tittleInfo)}
                  {/* <IconPatient style={{ width: "16px" }} /> */}
                  <Box sx={{ fontWeight: "bold" }}>{tittleInfo} </Box>
                </Box>
                {dataList(tittleInfo)}
              </>
            );
          })}
        </Box>

        <DialogActions style={{ textAlign: "right" }}>
          <Button
            onClick={handleClose}
            style={{
              fontWeight: "bold",
              color: "var(--secondary)",
              padding: "8px 16px",
            }}
          >
            FECHAR
          </Button>
        </DialogActions>
      </Dialog>
    </WrapperDialog>
  );
}
