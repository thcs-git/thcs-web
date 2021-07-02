/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Client functional tests', () => {

  beforeEach(() =>{
    cy.reload()
    cy.visit(Cypress.env('host')+'/login')
    cy.login('brunogcpereira@gmail.com','123456789')
    cy.xpath(loc.MENU.XP_BTN_CLIENTES).click()
  })

  it('Should to valid Clients Elements',() => {
    cy.xpath(`//h2[contains(.,'Lista de Clientes')]`).should('be.visible')
    .and('have.text','Lista de Clientes')
    cy.xpath(loc.CLIENTES.XP_BTN_NOVO).should('be.visible')
    cy.xpath(`//p[contains(.,'Resultados por página:')]`).should('be.visible')
    cy.xpath(`//select[contains(.,'10')]`).should('be.visible')
    cy.xpath(`//tbody/tr[10]`).should('be.visible')
  })

  it('Should to fill fields with Valid Data', () => {
    cy.xpath(loc.CLIENTES.XP_BTN_NOVO).click()
    cy.xpath(`//h2[contains(.,'Cadastro de Cliente')]`).should('have.text','Cadastro de Cliente')
    cy.get(loc.CLIENTES.NOME).type('Cliente de Testes')
    cy.get(loc.CLIENTES.NOME_SOCIAL).type('Cliente de Testes')
    cy.get(loc.CLIENTES.CNPJ).type('69798397000105')
    cy.get(loc.CLIENTES.CEP).type('50720110')
    cy.get(loc.CLIENTES.ENDERECO).click()
    cy.get(loc.CLIENTES.NUMERO).type('841')
    cy.get(loc.CLIENTES.NOME_RESPONSAVEL).type('Responsavel Cliente')
    cy.get(loc.CLIENTES.EMAIL).type('cliente@mail.com.br')
    cy.get(loc.CLIENTES.TELEFONE).type('81999999999')
    cy.get(loc.CLIENTES.CELULAR).type('81999999999')

    cy.xpath(`//*[@id="root"]/div[1]/main/div/div/div[2]/div/div[1]/div/div[3]/p`).should('is.not.visible')
    cy.get(loc.CLIENTES.ENDERECO).should('have.value','Rua Carlos Gomes')
    cy.get(loc.CLIENTES.BAIRROS).should('have.value','Madalena')
    cy.get(loc.CLIENTES.CIDADE).should('have.value','Recife')
    cy.get(loc.CLIENTES.UF).should('have.value','PE')
  })

  it('Should to fill fields with Invalid Data', () => {
    cy.xpath(loc.CLIENTES.XP_BTN_NOVO).click()
    cy.get(loc.CLIENTES.NOME).type('Cliente de Testes')
    cy.get(loc.CLIENTES.NOME_SOCIAL).type('Cliente de Testes')
    cy.get(loc.CLIENTES.CNPJ).type('69798397000100')
    cy.get(loc.CLIENTES.CEP).type('00000000')
    cy.get(loc.CLIENTES.ENDERECO).click()
    cy.get(loc.CLIENTES.NUMERO).type('841')
    cy.get(loc.CLIENTES.NOME_RESPONSAVEL).type('Responsavel Cliente')
    cy.get(loc.CLIENTES.EMAIL).type('cliente@mail.com.br')
    cy.get(loc.CLIENTES.TELEFONE).type('12345')
    cy.get(loc.CLIENTES.CELULAR).type('12345') //Não está mostrando Campo inválido (Em desenvolvimento)

    cy.xpath(loc.CLIENTES.XP_MSG_CNPJ).should('is.visible').and('have.text', 'CNPJ Inválido ou inexistente')
    cy.xpath(loc.CLIENTES.XP_MSG_CEP).should('is.visible').and('have.text','CEP inválido')
    cy.xpath(loc.CLIENTES.XP_MSG_TELEFONE).should('is.visible').and('have.text','Por favor insira um número válido')
  })

  it('Should to show confirmation POPUP', () => {
    cy.xpath(loc.CLIENTES.XP_BTN_NOVO).click()
    cy.get(loc.CLIENTES.NOME).type('Cliente de Testes')
    cy.get(loc.CLIENTES.NOME_SOCIAL).type('Cliente de Testes')
    cy.get(loc.CLIENTES.CNPJ).type('69798397000105')
    cy.get(loc.CLIENTES.CEP).type('50720110')
    cy.get(loc.CLIENTES.ENDERECO).click()
    cy.get(loc.CLIENTES.NUMERO).type('841')
    cy.get(loc.CLIENTES.NOME_RESPONSAVEL).type('Responsavel Cliente')
    cy.get(loc.CLIENTES.EMAIL).type('cliente@mail.com.br')
    cy.get(loc.CLIENTES.TELEFONE).type('81999999999')
    cy.get(loc.CLIENTES.CELULAR).type('81999999999')
    cy.xpath(loc.CLIENTES.XP_BTN_CANCELAR).click()
    cy.get('#alert-dialog-title').should('be.visible')
    .and('have.text','Cancelar')
    cy.get('#alert-dialog-description').should('be.visible')
    .and('have.text','Tem certeza que deseja cancelar este cadastro?')
  })

  it.only('Should to Edit a Client and cancel POPUP', () => {
    cy.get(loc.CLIENTES.BTN_NOME_FANTASIA).click()
    cy.wait(500)
    cy.xpath(loc.CLIENTES.XP_BTN_CLIENTE_EDITAR).click()
    cy.get(loc.CLIENTES.NOME_RESPONSAVEL).click()
    cy.wait(500)
    cy.get(loc.CLIENTES.NOME_RESPONSAVEL).type('{backspace}s')
    cy.xpath(loc.CLIENTES.XP_BTN_CANCELAR).click()
    cy.get('#alert-dialog-title').should('be.visible')
    .and('contain','Cancelar')
    cy.get('#alert-dialog-description').should('be.visible')
    .and('contain','Tem certeza que deseja cancelar este cadastro?')

  })

  it.skip('Should make a New Client', function (){
    cy.fixture('person').as('data').then(() => {
      let i = Math.floor(Math.random() * this.data.length)
      cy.xpath(loc.CLIENTES.XP_BTN_NOVO).click()
      cy.get(loc.CLIENTES.NOME).type(this.data[i].nome)
      cy.get(loc.CLIENTES.NOME_SOCIAL).type(this.data[i].nome)
      cy.get(loc.CLIENTES.NOME_RESPONSAVEL).type(this.data[i].mae)
      cy.get(loc.CLIENTES.EMAIL).type(this.data[i].email)
      cy.get(loc.CLIENTES.TELEFONE).type(this.data[i].telefone_fixo)
      cy.get(loc.CLIENTES.CELULAR).type(this.data[i].celular)
      cy.get(loc.CLIENTES.CEP).type(this.data[i].cep)
      cy.wait(2000)
      cy.getCnpj(loc.CLIENTES.CNPJ)
      cy.get(loc.CLIENTES.NUMERO).type(this.data[i].numero)
      cy.get(loc.CLIENTES.COMPLEMENTO).type('APT/Casa numero - '+this.data[i].numero)
      })

    cy.xpath(loc.CLIENTES.XP_BTN_SALVAR).click()
    cy.get('.Toastify__toast-body').should('be.visible')
    .and('contain','Cliente cadastrado com sucesso!')

    cy.xpath(`//h1[contains(.,'Cadastro concluído!')]`).should('be.visible')
    .and('contain','Cadastro concluído!')

    cy.xpath(`//button/span[contains(.,'Voltar')]`).should('be.visible')
    cy.xpath(`//button/span[contains(.,'Novo')]`).should('be.visible')
    cy.xpath(`//p[contains(.,'Os dados foram salvos no sistema. Deseja adicionar novo cadastro?')]`).should('be.visible')
  })


  it('Should try create duplicate client', () => {
    cy.xpath(loc.CLIENTES.XP_BTN_NOVO).click()
    cy.get(loc.CLIENTES.NOME).type('Cliente de Testes')
    cy.get(loc.CLIENTES.NOME_SOCIAL).type('Cliente de Testes')
    cy.get(loc.CLIENTES.CNPJ).type('69798397000105')
    cy.get(loc.CLIENTES.CEP).type('50720110')
    cy.get(loc.CLIENTES.NUMERO).type('841')
    cy.get(loc.CLIENTES.NOME_RESPONSAVEL).type('Responsavel Cliente')
    cy.get(loc.CLIENTES.EMAIL).type('cliente@mail.com.br')
    cy.get(loc.CLIENTES.TELEFONE).type('81999999999')
    cy.get(loc.CLIENTES.CELULAR).type('81999999999')
    cy.xpath(loc.CLIENTES.XP_BTN_SALVAR).click()

    cy.get('.Toastify__toast-body').should('be.visible')
    .and('contain','Não foi possível cadastrar um novo cliente')
  })


  it('Should to Edit a Client', () => {
    cy.get(loc.CLIENTES.BTN_NOME_FANTASIA).click()
    cy.wait(2000)
    cy.xpath(loc.CLIENTES.XP_BTN_CLIENTE_EDITAR).click()
    cy.get(loc.CLIENTES.NOME_RESPONSAVEL).click()
    cy.wait(500)
    cy.get(loc.CLIENTES.NOME_RESPONSAVEL).type('{backspace}s')
    cy.xpath(loc.CLIENTES.XP_BTN_SALVAR).click()
    cy.get('.Toastify__toast-body').should('be.visible')
    .and('contain','Empresa atualizada com sucesso!')
  })

  it('Should to search for Fiscal Number', () => {
    cy.server()
    cy.route('GET','**/client/**').as('res')
    cy.get(loc.CLIENTES.SEARCH).type('19.267.426/0001-34{enter}')

    cy.wait('@res').then((xhr) => {
      let total = xhr.response.body.total;
      let nome = xhr.response.body.data[0].name
      expect(xhr.status).be.equal(200)
      expect(xhr.response.body.total).be.equal(total)
      expect(xhr.response.body.data[0].name ).be.equal(nome)
    })

  })

  it('Should to search for Name', () =>{
    cy.server()
    cy.route('GET','**/client/**').as('res')
    cy.get(loc.CLIENTES.SEARCH).type('Cliente de Testes{enter}')

    cy.wait('@res').then((xhr) => {
      let total = xhr.response.body.total;
      let nome = xhr.response.body.data[0].name
      expect(xhr.status).be.equal(200)
      expect(xhr.response.body.total).be.equal(total)
      expect(xhr.response.body.data[0].name ).be.equal(nome)
    })
  })

  it('Should to search for Status - Ativo', () =>{
    cy.server()
    cy.route('GET','**/client/**').as('res')
    cy.get(loc.CLIENTES.SEARCH).type('Ativo {enter}')

    cy.wait('@res').then((xhr) => {
      let total = xhr.response.body.total;
      expect(xhr.status).be.equal(200)
      expect(xhr.response.body.total).be.equal(total)
    })
  })

  it('Should to search for Status - Inativo', () =>{
    cy.server()
    cy.route('GET','**/client/**').as('res')
    cy.get(loc.CLIENTES.SEARCH).type('inativo {enter}')

    cy.wait('@res').then((xhr) => {
      let total = xhr.response.body.total;
      expect(xhr.status).be.equal(200)
      expect(xhr.response.body.total).be.equal(total)
    })
  })


})
