/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Validade Configuration Test',()=>{

  beforeEach(() =>{
    cy.reload()
    cy.visit(Cypress.env('host')+'/login')
    cy.login('brunogcpereira@gmail.com','123456789')
    cy.xpath(loc.MENU.XP_BTN_CONFIGURACOES).click()
  })

  it('Must to validate',()=>{
    cy.get('#alert-dialog-title').should('be.visible')
    cy.xpath(`//h2[contains(.,'Olá, Bruno')]`).should('be.visible')
    cy.xpath(`//p[contains(.,'Você está trabalhando nesta empresa, mas você pode mudar quando quiser')]`).should('be.visible')
    cy.get('.MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').should('be.visible')
    cy.get('.MuiAutocomplete-popupIndicator > .MuiIconButton-label > .MuiSvgIcon-root').click()
    cy.wait(1000)
    cy.get('#combo-box-change-company').type('{downArrow}')
    cy.get('#combo-box-change-company').type('{enter}')
    cy.xpath(`//span[contains(.,'Fechar')]`).click()
    cy.get('.MuiList-padding > :nth-child(3)').click()
    cy.xpath(`//*[@id="root"]/div[1]/main/div/div[2]/table/tbody/tr[1]/td[2]`)
    .should('contain','02.762.729/0001-20')

    cy.xpath(`//h4[contains(.,'Bruno Inc.')]`).should('contain','Bruno Inc.')
  })
})
