const locators = {

  LOGIN: {
      EMAIL: '[name="email"]',
      PASSWORD: '[type="password"]',
      REMEMBER: '[value="remember"]',
      XP_BTN_ENTRAR: `//span[contains(.,'Entrar')]`,
      XP_BTN_CRIAR_CONTA: `//span[contains(.,'Criar conta')]`
  },

  MENU: {
    XP_BTN_AREA:`//*[@id="root"]/div[1]/div/div/ul[1]/li[6]`,
  },

  AREA: {
    XP_LISTA:`//tr[@class="MuiTableRow-root"]`,
    XP_BTN_NOVA_AREA: `//div//span[contains(.,'Nova Área')]`,
    XP_BTN_DADOS_AREA: `//div/button[contains(.,'Dados da Área')]`,
    XP_BTN_BAIRROS:`//div/button[contains(.,'Bairros')]`,
    XP_BTN_PRESTADORES:`//div/button[contains(.,'Prestadores')]`,
    XP_BTN_CANCELAR:`//div//button[contains(.,'Cancelar')]`,
    XP_BTN_VOLTAR:`//div//button[contains(.,'Voltar')]`,
    XP_BTN_PROXIMO:`//div//button[contains(.,'Próximo')]`,
    XP_BTN_SALVAR:`//div//button[contains(.,'Salvar')]`,
    XP_BTN_MENU: `//*[@id="btn_area-menu0"]/span[1]`,
    XP_BTN_MENU_EDITAR: `//*[@id="area-menu0"]/div[3]/ul/li[1]`,
    INPUT_NAME: '[id="input-name"]',
    ABASTECIMENTO_1_DIAS:'[aria-hidden="true"][data-index="0"]',
    ABASTECIMENTO_7_DIAS:'[aria-hidden="true"][data-index="1"]',
    DIA_SEMANA:'#combo-box-day-of-week',
    ESTADOS: '#combo-box-neigthborhoods-states',
    CIDADES: '#combo-box-neigthborhoods-city',
    BAIRROS: '#combo-box-neigthborhoods',
    FUNCOES:'#combo-box-profession',
    PRESTADOR:'#combo-box-users'
  }
}


export default locators;
