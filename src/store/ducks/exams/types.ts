export enum ExamsTypes {
  LOAD_REQUEST = "@exams/LOAD_REQUEST",
  LOAD_SUCCESS = "@exams/LOAD_SUCCESS",
  LOAD_FAILURE = "@exams/LOAD_FAILURE",
}
export interface ExamsItem {
  Itens: [];
  ItensManuais: [];
  NecessitaNotificacaoReceitaPapel: boolean;
  Formulas: [];
  DataCriacao: string;
  ReferenciaInterna: string;
  Prescritor: {
    Documento: string;
    Nome: string;
    idPrescritor: number;
    UFConselho: string;
    Especialidades: [];
    Numero: string;
    Conselho: string;
    UF: string;
  };
  Paciente: {
    Nome: string;
    Sexo: string;
    Endereco: {};
    Documento: string;
    AlergiasEstruturadas: [];
    Alergias: [];
    Peso: number;
    Altura: number;
    ReferenciaExterna: string;
    Idade: string;
    idPaciente: number;
    Responsaveis: [];
    Emails: [string];
    Telefones: [string];
    Lactante: boolean;
    Gestante: boolean;
    Fumante: boolean;
  };
  Origem: {
    Nome: string;
    idParceiro: number;
    idProntuario: number;
  };
  Estabelecimento: {
    idEstabelecimento: number;
    Nome: string;
    CNES: string;
    Endereco: {
      Endereco1: string;
      Endereco2: string;
      Cidade: string;
      Estado: string;
      CodigoPostal: string;
    };
    Contato: {};
    Logo: string;
  };
  Comentario: string;
  idPrescricaoStatus: number;
  idPrescricao: number;
  TemBeneficio: boolean;
  Tags: [];
  RequerReceituarioEspecial: boolean;
  PrescricaoAssinada: boolean;
  CodigoValidacao: string;
  URLBarCode: string;
  URLQRCode: string;
  UltimoMetodoAssinatura: string;
  VersaoPacientes: number;
  UrlPacientes: string;
  AtestadoPDFUrl: string;
  Exames: [];
  Atestado: {
    idPrescricaoAtestado: number;
    DataInicio: string;
    DataTermino: string;
    DataAtestado: string;
    Texto: string;
    Observacao: string;
    Periodo: string;
    TipoPeriodo: string;
    TextoCompleto: string;
    ConsentimentoCID: boolean;
    CID10Estruturado: [
      {
        Codigo: string;
        idCID10: number;
        Descricao: string;
      }
    ];
    CampoLivre: boolean;
  };
  CertificadoDigitalObrigatorio: boolean;
  PlanosDesconto: [];
  ExibirCertificadoLocal: boolean;
  ExibirEmailParaEnvio: boolean;
  PermitirImpressao: boolean;
  CorPrimaria: string;
  CorSecundaria: string;
  TelefoneCelular: string;
  Email: string;
  CIDS10Estruturados: [];
  Diagnosticos: [];
  HabilitarSalvarSemEnviar: boolean;
  ExibirPorPrincipioAtivo: boolean;
  LmePDFUrl: [];
  Encaminhamentos: [];
  Documentos: [
    {
      TipoDocumento: string;
      Categoria: string;
      URL: string;
      Assinado: boolean;
      ContentType: string;
    }
  ];
}
export interface ExamsData {
  data: ExamsItem[];
  total: number;
}
export interface ExamsState {
  data: ExamsData;
  loading: boolean;
  success: boolean;
  error: boolean;
}
export type LoadRequestParams = Partial<Omit<string, "data">>;
