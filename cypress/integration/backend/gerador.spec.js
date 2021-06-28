/// <reference types="cypress" />

describe('',() => {
  before('',() => {

  })

  it('Gerador de empresas', ()=>{
    cy.visit('https://www.4devs.com.br/gerador_de_empresas')

    cy.get('#bt_gerar_empresa')
    cy.get('#bt_gerar_empresa').click()

      let nome
      let cnpj
      let email
      let cep
      let endereco
      let numero
      let bairro
      let cidade
      let estado
      let telefone
      let celular

      cy.get('#nome').invoke('val').then( $nome => {
        const txt = $nome.txt()
      })

      cy.get('#cnpj').invoke('val').then(c =>{
         cnpj = c
      })
      cy.get('#email').invoke('val').then(e =>{
         email = e
      })
      cy.get('#cep').invoke('val').then(c =>{
         cep = c
      })
      cy.get('#endereco').invoke('val').then(e =>{
         endereco = e
      })
      cy.get('#numero').invoke('val').then(n =>{
         numero = n
      })
      cy.get('#bairro').invoke('val').then(b =>{
         bairro = b
      })
      cy.get('#cidade').invoke('val').then(c =>{
         cidade = c
      })
      cy.get('.small-10 >#estado').invoke('val').then(e =>{
         estado = e
      })
      cy.get('#telefone_fixo').invoke('val').then(t =>{
         telefone = t
      })
      cy.get('#celular').invoke('val').then(c =>{
         celular = c
      })

      cy.get('#search-input').type(txt)
      // cy.get(':nth-child(48) > a').click()
      // cy.get('#checktext_ifr').type(nome)
      // cy.get('#checktext_ifr').type(email)
      // cy.get('#checktext_ifr').type(cep)
      // cy.get('#checktext_ifr').type(cnpj)
      // cy.get('#checktext_ifr').type(endereco)
      // cy.get('#checktext_ifr').type(numero)
      // cy.get('#checktext_ifr').type(bairro)
      // cy.get('#checktext_ifr').type(cidade)
      // cy.get('#checktext_ifr').type(estado)
      // cy.get('#checktext_ifr').type(telefone)
      // cy.get('#checktext_ifr').type(celular)


  })
})
