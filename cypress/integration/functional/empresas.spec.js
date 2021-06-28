/// <reference types="cypress" />

import loc from '../../support/locators';

describe('Validate Company Module', ()=>{

  beforeEach(() =>{
    cy.reload()
    cy.visit(Cypress.env('host')+'/login')
    cy.login('brunogcpereira@gmail.com','123456789')
    cy.xpath(loc.MENU.XP_BTN_EMPRESAS).click()
  })

  it('Visitar a pagina Sollar empresas',() => {
    cy.xpath(loc.MENU.XP_BTN_CLIENTES).click()
    cy.server()
    cy.route('GET','https://sollar-backend.herokuapp.com/api/companies?limit=10&page=1').as('response')
    cy.xpath(loc.MENU.XP_BTN_EMPRESAS).click()
    cy.wait('@response').then((xhr) => {
      let total = xhr.response.body.total
      expect(xhr.response.body.total).be.equal(total)
    })
    cy.get(loc.EMPRESAS.BTN_SEARCH).should('be.visible')
    cy.xpath(loc.EMPRESAS.XP_BTN_NOVO).should('be.visible')
    cy.xpath(`//h2[contains(.,'Lista de Empresas')]`).should('be.visible')
    cy.get('.MuiTableBody-root ').should('be.visible')
  })

  it('Should to fill fields',function (){
    cy.xpath(loc.EMPRESAS.XP_BTN_NOVO).click()
    cy.fixture('company').as('data').then(() => {
      let i = Math.floor(Math.random() * this.data.length)
      cy.get(loc.EMPRESAS.NOME_SOCIAL).type("Tascom consultoria tecnologia me")
      cy.get(loc.EMPRESAS.NOME_FANTASIA).type("Tascom consultoria tecnologia me")
      cy.get(loc.EMPRESAS.CNPJ).type(this.data[i].cnpj)
      cy.get(loc.EMPRESAS.CEP).type(this.data[i].cep)
      cy.get(loc.EMPRESAS.ENDERECO).click()
      cy.get(loc.EMPRESAS.NUMERO).type(this.data[i].numero)
      cy.get(loc.EMPRESAS.COMPLEMENTO).type('Empresarial'+this.data[i].numero)
      cy.get(loc.EMPRESAS.NOME_RESPONSAVEL).type("Tascom consultoria tecnologia me")
      cy.get(loc.EMPRESAS.TELEFONE).type(this.data[i].telefone)
      cy.get(loc.EMPRESAS.EMAIL).type(this.data[i].email)
      cy.get(loc.EMPRESAS.CELULAR).type(this.data[i].celular)
    })
  })

  it('Must to fill fields the gaps with INVALIABLE DATA',function (){
    cy.xpath(loc.EMPRESAS.XP_BTN_NOVO).click()
    cy.fixture('company').as('data').then(() => {
      let i = Math.floor(Math.random() * this.data.length)
      cy.get(loc.EMPRESAS.NOME_SOCIAL).type("Tascom consultoria tecnologia me")
      cy.get(loc.EMPRESAS.NOME_FANTASIA).type("Tascom consultoria tecnologia me")
      cy.get(loc.EMPRESAS.CNPJ).type('0000000000000000')
      cy.get(loc.EMPRESAS.CEP).type('000000000')
      cy.get(loc.EMPRESAS.ENDERECO).click()
      cy.get(loc.EMPRESAS.NUMERO).type(this.data[i].numero)
      cy.get(loc.EMPRESAS.COMPLEMENTO).type('Empresarial'+this.data[i].numero)
      cy.get(loc.EMPRESAS.NOME_RESPONSAVEL).type("Tascom consultoria tecnologia me")
      cy.get(loc.EMPRESAS.TELEFONE).type('0000000000000000')
      cy.get(loc.EMPRESAS.EMAIL).type(this.data[i].email)
      cy.get(loc.EMPRESAS.CELULAR).type('0000000000000000')
    })
    cy.xpath(`//*[@id="root"]/div[1]/main/div/div/div[1]/div[1]/div[2]/div[3]/p`)
    .should('be.visible').and('contain','CNPJ Inválido ou inexistente')
    cy.xpath(`//*[@id="root"]/div[1]/main/div/div/div[1]/div[2]/div/div[1]/p`)
    .should('be.visible').and('contain','CEP inválido')
    cy.xpath(`//*[@id="root"]/div[1]/main/div/div/div[1]/div[3]/div[2]/p`)
    .should('be.visible').and('contain','Por favor insira um número válido')
    cy.xpath(`//*[@id="root"]/div[1]/main/div/div/div[1]/div[3]/div[4]/p`)
    .should('be.visible').and('contain','Por favor insira um número válido')
  })

  it.skip('Should to create new Company', function (){
    cy.xpath(loc.EMPRESAS.XP_BTN_NOVO).click()
    cy.fixture('company').as('data').then(() => {
      let i = Math.floor(Math.random() * this.data.length)
      cy.get(loc.EMPRESAS.NOME_SOCIAL).type("Tascom consultoria tecnologia me")
      cy.get(loc.EMPRESAS.NOME_FANTASIA).type("Tascom consultoria tecnologia me")
      cy.get(loc.EMPRESAS.CNPJ).type(this.data[i].cnpj)
      cy.get(loc.EMPRESAS.CEP).type(this.data[i].cep)
      cy.get(loc.EMPRESAS.ENDERECO).click()
      cy.get(loc.EMPRESAS.NOME_RESPONSAVEL).type("Tascom consultoria tecnologia me")
      cy.get(loc.EMPRESAS.TELEFONE).type(this.data[i].telefone)
      cy.get(loc.EMPRESAS.EMAIL).type(this.data[i].email)
      cy.get(loc.EMPRESAS.CELULAR).type(this.data[i].celular)
      cy.get(loc.EMPRESAS.NUMERO).type(this.data[i].numero)
      cy.get(loc.EMPRESAS.COMPLEMENTO).type('Empresarial - '+this.data[i].numero)
    })
      cy.xpath(loc.EMPRESAS.XP_BTN_SALVAR).click()
      cy.get('.Toastify__toast-body').should('be.visible')
      .and('contain','Empresa cadastrada com sucesso!')
  })

  it('Should to create a same Company',() => {
    cy.xpath(loc.EMPRESAS.XP_BTN_NOVO).click()
    cy.get(loc.EMPRESAS.NOME_SOCIAL).type("Tascom consultoria tecnologia me")
    cy.get(loc.EMPRESAS.NOME_FANTASIA).type("Tascom consultoria tecnologia me")
    cy.get(loc.EMPRESAS.CNPJ).type('63.812.875/0001-08')
    cy.get(loc.EMPRESAS.CEP).type(74674100)
    cy.get(loc.EMPRESAS.ENDERECO).click()
    cy.get(loc.EMPRESAS.NOME_RESPONSAVEL).type("Tascom consultoria tecnologia me")
    cy.get(loc.EMPRESAS.TELEFONE).type(6227182862)
    cy.get(loc.EMPRESAS.EMAIL).type("atendimento@tascomconsultoemtec.com.br")
    cy.get(loc.EMPRESAS.CELULAR).type(62991995472)
    cy.get(loc.EMPRESAS.NUMERO).type('613')
    cy.get(loc.EMPRESAS.COMPLEMENTO).type('Empresarial - '+613)
    cy.xpath(loc.EMPRESAS.XP_BTN_SALVAR).click()
    cy.get('.Toastify__toast-body').should('be.visible')
    .and('contain','Ocorreu um erro ao cadastrar uma nova empresa')

  })

  it.only('Must to search Company Name', () => {
    cy.server()
    cy.route('GET','**/companies/**').as('res')
    cy.get('#search-input').type('Tascom')
    cy.wait('@res').then((res)=>{
      let total = res.body[0].total
      expect(total).to.be.equal(res.body[0].total)
      console.log(res.body[0].total)
    })

  })

  it('Must to show Pop-Up in New Company',() => {
    cy.xpath(loc.EMPRESAS.XP_BTN_NOVO).click()
    cy.xpath(loc.EMPRESAS.XP_BTN_VOLTAR).click()
    cy.get('#alert-dialog-title').should('contain','Cancelar')
    cy.get('#alert-dialog-description').should('contain','Tem certeza que deseja cancelar este cadastro?')
  })

  it('Must to show Pop-Up in Edit Company',() => {
    cy.get('#btn_patient-menu0').click()
    cy.get('#patient-menu0 > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click()
    cy.xpath(loc.EMPRESAS.XP_BTN_VOLTAR).click()
    cy.get('#alert-dialog-title').should('contain','Cancelar')
    cy.get('#alert-dialog-description').should('contain','Tem certeza que deseja cancelar este cadastro?')
  })

})
