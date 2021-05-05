/// <reference types="cypress" />

before('', () => {
  cy.visit(Cypress.env('host')+'/login')
})

describe('Login tests - Sollar', () => {

  it('Elements login', () => {
      //Verified if elements be visible and corretly length
      cy.get('.marca-sollar-d').should('be.visible')

      cy.get('[name="email"]').should('be.visible')
        .and('be.empty')

        cy.get('[type="password"]').should('be.visible')
        .and('be.empty')

      cy.get('[value="remember"]').should('be.visible')
        .and('not.be.checked')

      cy.get('.MuiButton-label')
        .should('be.visible')
        .and('have.length', 2)

      cy.get('.sc-iRpACI').should('be.visible')
  })

  it('Text Body', () => {
     //Contain the text in screen login
    cy.get('.sc-cqtpGg > .sc-aqkJz')
        .should('have.text','Bem-vindo(a)! Realize seu login para continuar:')

    cy.get('.MuiFormControlLabel-root > .MuiTypography-root')
        .should('have.text', 'Lembrar de mim neste computador')

    cy.get('.MuiBox-root > .sc-aqkJz')
        .should('have.text','Esqueceu a senha?  Clique aqui parar recuperar')
  })

  it('Login Credential', () => {
     //filling in credentials
      cy.get('[name="email"]').type('brunogcpereira@gmail.com')
      cy.get('[type="password"]').type('123456789')
  })

})
