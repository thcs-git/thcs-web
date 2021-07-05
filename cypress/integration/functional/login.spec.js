/// <reference types="cypress" />

import loc from '../../support/locators';

describe('Validation Login', () => {

  beforeEach('', () => {
    cy.reload()
    cy.visit(Cypress.env('host')+'/login')
  })


  it('Should to valid E-mail Fields', () => {
    //ASSERT - verify input valids e-mail
    cy.get(loc.LOGIN.EMAIL).type('tercio@mail.com')
      .should('have.attr', 'aria-invalid','false')
  })

  it('Should to valid Password Fields', () => {
    //ASSERT - verify input valids password
    cy.get(loc.LOGIN.PASSWORD).type('123456789')
      .should('have.attr', 'aria-invalid','false')
  })


  it('Should to invalid Emails Credentials', () => {
    //Insert ivalids datas in e-mail fields
    cy.get(loc.LOGIN.EMAIL).type('tercio@')
    cy.xpath(loc.LOGIN.XP_BTN_ENTRAR).click()
    cy.get(loc.LOGIN.EMAIL).should('have.attr', 'aria-invalid','true')
  })

  it('Should to invalid Password ', () => {
    //Insert ivalids datas in password fields
    cy.get(loc.LOGIN.PASSWORD).type('a')
    cy.xpath(loc.LOGIN.XP_BTN_ENTRAR).click()
    cy.get(loc.LOGIN.PASSWORD).should('have.attr', 'aria-invalid','true')

  })


  it('Should to valid login Elements', () => {
      //Verified if elements be visible and corretly length
      cy.get('.marca-sollar-d').should('be.visible')
      cy.get(loc.LOGIN.EMAIL).should('be.visible')
        .and('be.empty')
      cy.get(loc.LOGIN.PASSWORD).should('be.visible')
        .and('be.empty')
      cy.get(loc.LOGIN.REMEMBER).should('be.visible')
        .and('not.be.checked')
      cy.xpath(loc.LOGIN.XP_BTN_ENTRAR).should('be.visible')
      cy.xpath(loc.LOGIN.XP_BTN_CRIAR_CONTA).should('be.visible')
      cy.xpath(`//p[contains(.,'Bem-vindo(a)! Realize seu login para continuar:')]`).should('be.visible')
      cy.xpath(`//p[contains(.,'Bem-vindo(a)! Realize seu login para continuar:')]`).should('be.visible')
      cy.xpath(`//*[@id="root"]/div[1]/div[1]/form/div[3]/div/p`).should('be.visible')
      cy.xpath(`//span[contains(.,'Lembrar de mim neste computador')]`).should('be.visible')

  })

  it('Should to Invalid Login Credentials', () => {
    cy.get(loc.LOGIN.EMAIL).type('tercio@mail.com')
    cy.get(loc.LOGIN.PASSWORD).type('123456789')
    cy.xpath(loc.LOGIN.XP_BTN_ENTRAR).click()
    cy.get('.Toastify__toast-body')
      .should('have.attr', 'role' , 'alert')
      .and('have.text', 'E-mail e/ou senha errada.')

  })

  it('Should to Valid Login Credentials', () => {
    cy.login('brunogcpereira@gmail.com','123456789')
    cy.url().should('include','/dashboard')

  })

})
