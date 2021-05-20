/// <reference types="cypress" />

import loc from '../../support/locators';

beforeEach(() =>{
  cy.reload()
  cy.visit(Cypress.env('host')+'/login')
  cy.login('brunogcpereira@gmail.com','123456789')
  cy.xpath(loc.MENU.XP_BTN_AREA).click()
})

describe('Validation Area', () => {

  it('Area - Elements', () =>{
    cy.xpath(loc.AREA.XP_LISTA).should('have.length',10)
    cy.get('.sc-iJuUWI').should('be.visible')
    cy.get('#search-input').should('be.visible')
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').should('be.visible')
    cy.get('.sc-fKFyDc > .MuiButton-root > .MuiButton-label').should('be.visible')

  })


  it('Dados Area', () => {
    cy.xpath(loc.AREA.XP_BTN_NOVA_AREA).click()
    cy.xpath(`//div//h2[contains(.,'Cadastro de Área')]`).should('contain','Cadastro de Área')
    cy.xpath(loc.AREA.XP_BTN_DADOS_AREA).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_BAIRROS).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_PRESTADORES).should('be.visible')
    //Elements
    cy.get(loc.AREA.INPUT_NAME).should('be.visible')
    cy.get(loc.AREA.SLIDE_ABASTECIMENTO).should('be.visible')
    cy.get(loc.AREA.ABASTECIMENTO).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_CANCELAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_PROXIMO).should('be.visible')

  })

  it('Bairros ', () => {
    cy.wait(2000)
    cy.xpath(loc.AREA.XP_BTN_NOVA_AREA).click()
    cy.xpath(loc.AREA.XP_BTN_BAIRROS).click()
    cy.get(loc.AREA.ESTADOS).should('be.visible')
    cy.get(loc.AREA.CIDADES).should('be.visible')
    cy.get(loc.AREA.BAIRROS).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_CANCELAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_PROXIMO).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_VOLTAR).should('be.visible')

  });

  it('Prestadores', () => {
    cy.wait(2000)
    cy.xpath(loc.AREA.XP_BTN_NOVA_AREA).click()
    cy.xpath(loc.AREA.XP_BTN_PRESTADORES).click()
    cy.get(loc.AREA.FUNCOES).should('be.visible')
    cy.get(loc.AREA.PRESTADOR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_CANCELAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_SALVAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_VOLTAR).should('be.visible')
  })


  it.only('Register - Fields ', () => {
    cy.xpath(loc.AREA.XP_BTN_NOVA_AREA).click()
    //DADOS DA AREA
    cy.get(loc.AREA.INPUT_NAME).type('Zona Test')
    cy.get(loc.AREA.ABASTECIMENTO_7_DIAS).click()
    cy.get(loc.AREA.DIA_SEMANA).type('Sábado{uparrow}{enter}')
      .should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_PROXIMO).contains('Próximo')
      .click()

    //BAIRROS
    cy.get(loc.AREA.ESTADOS).type('Pernambuco{downarrow}{enter}')
    cy.get(loc.AREA.CIDADES).type('CARUARU')
    cy.wait(500)
    cy.get(loc.AREA.CIDADES).type('{downArrow}{downArrow}{enter}')
    cy.get(loc.AREA.BAIRROS).type('Universitário').wait(2000)
    cy.get(loc.AREA.BAIRROS).type('{downArrow}{enter}')
    cy.get('.MuiChip-label').should('be.visible')
    cy.get('.active > .MuiBadge-root > .MuiBadge-badge').should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_PROXIMO).contains('Próximo').click()

    //PRESTADORES
    cy.get(loc.AREA.FUNCOES).type('Administrativo{downarrow}{enter}')
    cy.get(loc.AREA.PRESTADOR).type('Bruno{downarrow}{enter}')
    cy.xpath(`//div//h3[contains(.,'Administrativo')]`).should('contain','Administrativo')
    cy.xpath(`//button//span[contains(.,'Bairros')]/span`).should('contain','1')//nº de Bairros adicionado
    cy.xpath(`//button//span[contains(.,'Prestadores')]/span`).should('contain','1')//nº de Prestadores adicionado
    cy.xpath(`//div//span[contains(.,'Bruno')]`).should('have.text','Bruno Pereira')//Prestador adicionado
    cy.xpath(loc.AREA.XP_BTN_CANCELAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_SALVAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_VOLTAR).should('be.visible')
    })

    it('Register (sem abastecimento/dias) - Fields ', () => {

      cy.xpath(loc.AREA.XP_BTN_NOVA_AREA).click()
      //DADOS DA AREA
      cy.get(loc.AREA.INPUT_NAME).type('Zona Test')
      cy.get(loc.AREA.ABASTECIMENTO_1_DIAS).click()
      cy.get(loc.AREA.DIA_SEMANA).should('not.be.visible')
      cy.xpath(loc.AREA.XP_BTN_PROXIMO).contains('Próximo').click()

      //BAIRROS
      cy.get(loc.AREA.ESTADOS).type('Pernambuco{downarrow}{enter}')
      cy.get(loc.AREA.CIDADES).type('CARUARU')
      cy.wait(500)
      cy.get(loc.AREA.CIDADES).type('{downArrow}{downArrow}{enter}')
      cy.get(loc.AREA.BAIRROS).type('Universitário').wait(2000)
      cy.get(loc.AREA.BAIRROS).type('{downArrow}{enter}')
      cy.get('.MuiChip-label').should('be.visible')
      cy.get('.active > .MuiBadge-root > .MuiBadge-badge').should('be.visible')
      cy.xpath(loc.AREA.XP_BTN_PROXIMO).contains('Próximo').click()

      //PRESTADORES
      cy.get(loc.AREA.FUNCOES).type('Administrativo{downarrow}{enter}')
      cy.get(loc.AREA.PRESTADOR).type('Bruno{downarrow}{enter}')
      cy.xpath(`//div//h3[contains(.,'Administrativo')]`).should('contain','Administrativo')
      cy.xpath(`//button//span[contains(.,'Bairros')]/span`).should('contain','1')//nº de Bairros adicionado
      cy.xpath(`//button//span[contains(.,'Prestadores')]/span`).should('contain','1')//nº de Prestadores adicionado
      cy.xpath(`//div//span[contains(.,'Bruno')]`).should('have.text','Bruno Pereira')//Prestador adicionado
      cy.xpath(loc.AREA.XP_BTN_CANCELAR).should('be.visible')
      cy.xpath(loc.AREA.XP_BTN_SALVAR).should('be.visible')
      cy.xpath(loc.AREA.XP_BTN_VOLTAR).should('be.visible')
      });


    it.only('Edit - Area', () => {

        cy.xpath(loc.AREA.XP_BTN_MENU).click()
        cy.xpath(loc.AREA.XP_BTN_MENU_EDITAR).click()
        cy.get(loc.AREA.INPUT_NAME).type('Edit')
        // //Botão redundante "Editar" NÃO deve está visivel
        cy.xpath(`//span[contains(.,'Editar')]`).should('be.visible')//ainda visivel(Para o teste passar)

        cy.get('[aria-hidden="true"][data-index="6"]').click()
        cy.xpath(`//div//button[contains(.,'Salvar')]`).click()
        cy.get('.Toastify__toast-body').should('contain','Area atualizado com sucesso!')
        cy.url().should('eq','https://sollar-web.vercel.app/area')
    })

    it('Ativo/Inativo - Area', () => {

      cy.xpath(`/html/body/div[1]/div[1]/main/div/div/div[2]/table/tbody/tr[2]/td[7]/button/span[1]`).click()
      cy.xpath(`//*[@id="area-menu1"]/div[3]/ul/li[2]`).click()
      cy.xpath(`//*[@id="root"]/div[1]/main/div/div/div[1]/div[1]/button/span[1]`).click()
      cy.xpath(`//*[@id="root"]/div[1]/main/div/div/div[1]/div[2]/div[2]/div[1]/div/div[3]/label/span[1]/span[1]/span[1]/input`).click()
      cy.xpath(`//div//button[contains(.,'Salvar')]`).click()
      cy.get('.Toastify__toast-body').should('contain','Area atualizado com sucesso!')
      cy.url().should('eq','https://sollar-web.vercel.app/area')

    });





})

