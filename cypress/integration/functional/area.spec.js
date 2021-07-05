/// <reference types="cypress" />

import loc from '../../support/locators';


describe('Validation of the Area Module', () => {
  beforeEach(() =>{
    cy.reload()
    cy.visit(Cypress.env('host')+'/login')
    cy.wait(1000)
    cy.login('brunogcpereira@gmail.com','123456789')
    cy.wait(1000)
    cy.changeCompany()
    cy.xpath(loc.MENU.XP_BTN_AREA).click()
  })

  it('Should to valid Area Elements', () =>{
    cy.xpath(loc.AREA.XP_LISTA).should('be.visible')
    cy.get('.sc-iJuUWI').should('be.visible')
    cy.get('#search-input').should('be.visible')
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').should('be.visible')
    cy.get('.sc-fKFyDc > .MuiButton-root > .MuiButton-label').should('be.visible')

  })


  it('Should to valid "Dados Area" Elements', () => {
    cy.xpath(loc.AREA.XP_BTN_NOVA_AREA).click()
    cy.xpath(`//div//h2[contains(.,'Cadastro de Área')]`).should('contain','Cadastro de Área')
    cy.xpath(loc.AREA.XP_BTN_DADOS_AREA).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_BAIRROS).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_PRESTADORES).should('be.visible')
    //Elements
    cy.get(loc.AREA.INPUT_NAME).should('be.visible')
    cy.get('.MuiSlider-root').should('be.visible')
    cy.get('.MuiSlider-thumb').should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_CANCELAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_PROXIMO).should('be.visible')

  })

  it('Should to valid "Bairros" Elements', () => {
    cy.wait(2000)
    cy.xpath(loc.AREA.XP_BTN_NOVA_AREA).click()
    cy.xpath(loc.AREA.XP_BTN_BAIRROS).click()
    cy.get(loc.AREA.ESTADOS).should('be.visible')
    cy.get(loc.AREA.CIDADES).should('be.visible')
    cy.get(loc.AREA.BAIRROS).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_CANCELAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_PROXIMO).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_VOLTAR).should('be.visible')

  })

  it('Should to valid "Prestadores" Elements', () => {
    cy.wait(2000)
    cy.xpath(loc.AREA.XP_BTN_NOVA_AREA).click()
    cy.xpath(loc.AREA.XP_BTN_PRESTADORES).click()
    cy.get(loc.AREA.FUNCOES).should('be.visible')
    cy.get(loc.AREA.PRESTADOR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_CANCELAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_SALVAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_VOLTAR).should('be.visible')
  })


  it('Should to fill in All Fields ', () => {
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
    cy.get(loc.AREA.CIDADES).type('CARUARU').wait(1000)
    cy.get(loc.AREA.CIDADES).type('{downArrow}{downArrow}{enter}')
    cy.get(loc.AREA.BAIRROS).type('Universitário').wait(2000)
    cy.get(loc.AREA.BAIRROS).type('{downArrow}{enter}')
    cy.get('.MuiChip-label').should('be.visible')
    cy.get('.active > .MuiBadge-root > .MuiBadge-badge').should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_PROXIMO).contains('Próximo').click()

    //PRESTADORES
    cy.get(loc.AREA.FUNCOES).type('Administrativo{downarrow}{enter}')
    cy.get(loc.AREA.PRESTADOR).type('Heytor{downarrow}{enter}')
    cy.xpath(`//div//h3[contains(.,'Administrativo')]`).should('contain','Administrativo')
    cy.xpath(`//button//span[contains(.,'Bairros')]/span`).should('contain','1')//nº de Bairros adicionado
    cy.xpath(`//button//span[contains(.,'Prestadores')]/span`).should('contain','1')//nº de Prestadores adicionado
    cy.xpath(`//div//span[contains(.,'Heytor')]`).should('contain','Heytor')//Prestador adicionado
    cy.xpath(loc.AREA.XP_BTN_CANCELAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_SALVAR).should('be.visible')
    cy.xpath(loc.AREA.XP_BTN_VOLTAR).should('be.visible')
    })

    it('Should to fill in All Fields (sem abastecimento/dias)', () => {

      cy.xpath(loc.AREA.XP_BTN_NOVA_AREA).click()
      //DADOS DA AREA
      cy.get(loc.AREA.INPUT_NAME).type('Zona Test')
      cy.get(loc.AREA.ABASTECIMENTO_1_DIAS).click()
      cy.get(loc.AREA.DIA_SEMANA).should('not.be.visible')
      cy.xpath(loc.AREA.XP_BTN_PROXIMO).contains('Próximo').click()

      //BAIRROS
      cy.get(loc.AREA.ESTADOS).type('Pernambuco{downarrow}{enter}')
      cy.get(loc.AREA.CIDADES).type('CARUARU').wait(1000)
      cy.get(loc.AREA.CIDADES).type('{downArrow}{downArrow}{enter}')
      cy.get(loc.AREA.BAIRROS).type('Universitário').wait(1000)
      cy.get(loc.AREA.BAIRROS).type('{downArrow}{enter}')
      cy.get('.MuiChip-label').should('be.visible')
      cy.get('.active > .MuiBadge-root > .MuiBadge-badge').should('be.visible')
      cy.xpath(loc.AREA.XP_BTN_PROXIMO).contains('Próximo').click()

      //PRESTADORES
      cy.get(loc.AREA.FUNCOES).type('Administrativo{downarrow}{enter}')
      cy.get(loc.AREA.PRESTADOR).type('Heytor{downarrow}{enter}')
      cy.xpath(`//div//h3[contains(.,'Administrativo')]`).should('contain','Administrativo')
      cy.xpath(`//button//span[contains(.,'Bairros')]/span`).should('contain','1')//nº de Bairros adicionado
      cy.xpath(`//button//span[contains(.,'Prestadores')]/span`).should('contain','1')//nº de Prestadores adicionado
      cy.xpath(`//div//span[contains(.,'Heytor')]`).should('contain','Heytor')//Prestador adicionado
      cy.xpath(loc.AREA.XP_BTN_CANCELAR).should('be.visible')
      cy.xpath(loc.AREA.XP_BTN_SALVAR).should('be.visible')
      cy.xpath(loc.AREA.XP_BTN_VOLTAR).should('be.visible')
      });


    it('Should to Edit an Area', () => {
        cy.xpath(loc.AREA.XP_BTN_MENU).click()
        cy.xpath(loc.AREA.XP_BTN_MENU_EDITAR).click()
        cy.get(loc.AREA.INPUT_NAME).type('{selectall}{backspace}CentroEdit')
        cy.xpath(`//span[contains(.,'Editar')]`).should('not.be.visible')
        cy.get('[aria-hidden="true"][data-index="6"]').click()
        cy.xpath(loc.AREA.XP_BTN_SALVAR).click()
        cy.get(loc.AREA.MSG).should('contain','Area atualizado com sucesso!')
        cy.url().should('eq',Cypress.env('host')+'/area')
    })

    it('Should to change "Ativo/Inativo" an Area', () => {
      cy.xpath(loc.AREA.XP_BTN_MENU).click()
      cy.xpath(loc.AREA.XP_BTN_MENU_EDITAR).click()
      cy.get(loc.AREA.INPUT_NAME).click()
      cy.get('[type="checkbox"]').click()
      cy.xpath(loc.AREA.XP_BTN_SALVAR).click()
      cy.get(loc.AREA.MSG).should('contain','Area atualizado com sucesso!')
      cy.url().should('eq','https://sollar-web.vercel.app/area')
    })

    it('Should to show Popup confirmation in "Menu Editar"', () => {
      cy.xpath(loc.AREA.XP_BTN_MENU).click()
      cy.xpath(loc.AREA.XP_BTN_MENU_EDITAR).click()
      cy.get(loc.AREA.INPUT_NAME).click()
      cy.get(loc.AREA.INPUT_NAME).type('{backspace}Edit')
      cy.xpath(loc.AREA.XP_BTN_CANCELAR).click()
      cy.get(loc.AREA.POPUP_MENU).should('be.visible').and('contain','Atenção')
    })

    //Teste ainda não funciona - (Popup Em desenvolvimento)
    it.skip(' Teste ainda funciona - Should to show Popup confirmation in "Nova Area"', () => {
      cy.xpath(loc.AREA.XP_BTN_NOVA_AREA).click()
      cy.get(loc.AREA.INPUT_NAME).click()
      cy.get(loc.AREA.INPUT_NAME).type('Edit')
      cy.xpath(loc.AREA.XP_BTN_CANCELAR).click()
      //popup Não está Aparecendo (Popup Em desenvolvimento)
      cy.get(loc.AREA.POPUP_MENU).should('be.visible').and('contain','Cancelar')
    })

    it('Should to search Ativo', () => {
      cy.server()
      cy.route('GET','**/patientarea/**').as('response')
      cy.get(loc.AREA.SEARCH).type('ativo{enter}')
      cy.wait('@response').then((xhr) => {
        let total = xhr.response.body.total
        expect(xhr.response.body.total).be.equal(total)
        expect(xhr.status).be.equal(200)
      })
    })

    it('Should to search Inativo', () => {
      cy.server()
      cy.route('GET','**/patientarea/**').as('response')
      cy.get(loc.AREA.SEARCH).type('inativo{enter}')
      cy.wait('@response').then((xhr) => {
        let total = xhr.response.body.total
        expect(xhr.response.body.total).be.equal(total)
        expect(xhr.status).be.equal(200)
      })
    })
})

