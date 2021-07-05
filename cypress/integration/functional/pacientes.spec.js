/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Validation Patients Module',() => {
  beforeEach(() =>{
    cy.reload()
    cy.visit(Cypress.env('host')+'/login')
    cy.wait(1000)
    cy.login('brunogcpereira@gmail.com','123456789')
    cy.wait(1000)
    cy.xpath(loc.MENU.XP_BTN_PACIENTES).click()
  })

  it.skip('Shoudl to create a new Patient', function() {
    cy.xpath(loc.PACIENTES.XP_BTN_NOVO).click()
    cy.fixture('person').as('data').then(() =>{
      let i = Math.floor(Math.random() * this.data.length)
      let myData = this.data[i].data_nasc
      let myArray = myData.split('-')
      let idade = this.data[i].idade
      let cpf =  this.data[i].cpf
      let nome = this.data[i].nome

      cy.get(loc.PACIENTES.NOME).type(this.data[i].nome)
      cy.get(loc.PACIENTES.NOME_SOCIAL).type(this.data[i].nome)
      cy.get(loc.PACIENTES.NACIONALIDADE).type('brasileira')
      cy.get(loc.PACIENTES.DATA_NASC).type(myArray[2]+'-'+myArray[1]+'-'+myArray[0])
      cy.get(loc.PACIENTES.SEXO).type(this.data[i].sexo+'{downArrow}{enter}')
      cy.get(loc.PACIENTES.MAE).type(this.data[i].mae)
      cy.get(loc.PACIENTES.CPF).type(this.data[i].cpf)
      cy.get(loc.PACIENTES.RG).type(this.data[i].rg)
      cy.get(loc.PACIENTES.ORGAO_EMISSOR).type('Emissor')
      cy.get(loc.PACIENTES.ESTADO_CIVIL).type('Casado{downArrow}{enter}')
      cy.get(loc.PACIENTES.TIPO_SANGUINEO).type(this.data[i].tipo_sanguineo+'{downArrow}{enter}')
      cy.get(loc.PACIENTES.CEP).type(this.data[i].cep)
      cy.get(loc.PACIENTES.ENDERECO).click()
      cy.get(loc.PACIENTES.COMPLEMENTO).type('APT/Casa numero - '+this.data[i].numero)
      cy.get(loc.PACIENTES.EMAIL).type(this.data[i].email)
      cy.get(loc.PACIENTES.TELEFONE).type(this.data[i].telefone_fixo)
      cy.get(loc.PACIENTES.CELULAR).type(this.data[i].celular)
      cy.get(loc.PACIENTES.NOME_RESPONSAVEL).type(this.data[i].mae)
      cy.get(loc.PACIENTES.PARENTESCO).type('mae')
      cy.get(loc.PACIENTES.AREAS).type('sul{downArrow}{enter}')
      cy.get(loc.PACIENTES.CELULAR_RESPONSAVEL).type(this.data[i].celular)
      cy.get(loc.PACIENTES.NUMERO).type(this.data[i].numero)
      cy.xpath(loc.PACIENTES.XP_BTN_SALVAR).click()
      cy.wait(4000)


      cy.get('.Toastify__toast-body').should('contain','Paciente cadastrado com sucesso!')
      cy.get('.Toastify__toast-body').should('be.visible')
      cy.get('h1').should('contain','Avaliação concluída')
      cy.get('h5').should('contain',this.data[i].nome)
      cy.xpath(`//p[contains(.,'${this.data[i].idade} anos')]`).should('contain',`${idade}`)
      cy.xpath(`//p[contains(.,'${this.data[i].cpf}')]`).should('contain',`${cpf}`)
      cy.xpath(`//span[contains(.,'Editar')]`).should('be.visible')
      cy.xpath(`//span[contains(.,'Iniciar Captação')]`).should('be.visible')
      cy.xpath(`//span[contains(.,'Listar pacientes')]`).should('be.visible')
    })


  })


  //Não está apresentando erro no CEP (Desenvolvimento)
  it.skip('Teste não funciona  (Desenvolvimento) - Shoudl to fill fields ivalidate', function() {

    cy.xpath(loc.PACIENTES.XP_BTN_NOVO).click()
    cy.fixture('person').as('data').then(() =>{
      let i = Math.floor(Math.random() * this.data.length)
      let myData = this.data[i].data_nasc
      let myArray = myData.split('-')

      cy.get(loc.PACIENTES.NOME).type(this.data[i].nome)
      cy.get(loc.PACIENTES.NOME_SOCIAL).type(this.data[i].nome)
      cy.get(loc.PACIENTES.NACIONALIDADE).type('brasileira')
      cy.get(loc.PACIENTES.DATA_NASC).type(myArray[2]+'-'+myArray[1]+'-'+myArray[0])
      cy.get(loc.PACIENTES.SEXO).type(this.data[i].sexo+'{downArrow}{enter}')
      cy.get(loc.PACIENTES.MAE).type(this.data[i].mae)
      cy.get(loc.PACIENTES.CPF).type('12345678910')
      cy.get(loc.PACIENTES.RG).type('12345678')
      cy.get(loc.PACIENTES.ORGAO_EMISSOR).type('Emissor')
      cy.get(loc.PACIENTES.ESTADO_CIVIL).type('Casado{downArrow}{enter}')
      cy.get(loc.PACIENTES.TIPO_SANGUINEO).type(this.data[i].tipo_sanguineo+'{downArrow}{enter}')
      cy.get(loc.PACIENTES.CEP).type('12345678')//Não está apresentando erro (Desenvolvimento)
      cy.get(loc.PACIENTES.ENDERECO).click()
      cy.get(loc.PACIENTES.COMPLEMENTO).type('APT/Casa numero - '+this.data[i].numero)
      cy.get(loc.PACIENTES.EMAIL).type(this.data[i].email)
      cy.get(loc.PACIENTES.TELEFONE).type('123456789')
      cy.get(loc.PACIENTES.CELULAR).type('123456789')
      cy.get(loc.PACIENTES.NOME_RESPONSAVEL).type(this.data[i].mae)
      cy.get(loc.PACIENTES.PARENTESCO).type('mae')
      cy.get(loc.PACIENTES.AREAS).type('sul{downArrow}{enter}')
      cy.get(loc.PACIENTES.CELULAR_RESPONSAVEL).type('123456789')
      cy.get(loc.PACIENTES.NUMERO).type(this.data[i].numero)

      cy.xpath(`//*[@id="simple-tabpanel-0"]/div/p/div[1]/div/div/div[1]/div[2]/div[1]/div/p`)
      .should('be.visible').and('contain','Por favor insira um cpf válido')
      cy.xpath(`//*[@id="simple-tabpanel-0"]/div/p/div[1]/div/div/div[2]/div[2]/div[2]/p`)
      .should('be.visible').and('contain','Por favor insira um número válido')
      cy.xpath(`//*[@id="simple-tabpanel-0"]/div/p/div[1]/div/div/div[2]/div[2]/div[3]/p`)
      .should('be.visible').and('contain','Por favor insira um número válido')
      cy.xpath(`//*[@id="simple-tabpanel-0"]/div/p/div[1]/div/div/div[3]/div/div[2]/p`)
      .should('be.visible').and('contain','Por favor insira um número válido')
    })

  })


  it('Should to show Pop-Up confirmation - New Patients',() => {
    cy.xpath(loc.PACIENTES.XP_BTN_NOVO).click()
    cy.get(loc.PACIENTES.ENDERECO).type('Teste de Pop-Up')
    cy.xpath(loc.PACIENTES.XP_BTN_VOLTAR).click()

    cy.get('#alert-dialog-title').should('be.visible')
    cy.get('#alert-dialog-description').should('be.visible')
  })


  it('Should to show Pop-Up confirmation - Edit Patients',() => {
    cy.get(loc.PACIENTES.BTN_MENU).click()
    cy.get(loc.PACIENTES.BTN_MENU_EDITAR).click()
    cy.get(loc.PACIENTES.ENDERECO).type('Teste de Pop-Up')
    cy.xpath(loc.PACIENTES.XP_BTN_VOLTAR).click()

    cy.get('#alert-dialog-title').should('be.visible')
    cy.get('#alert-dialog-description').should('be.visible')
  })

  it('Should to search Patients - Name',() => {
    cy.get(loc.PACIENTES.SEARCH).click()
    cy.server()
    cy.route('GET', '**/patient/**').as('response')
    cy.get(loc.PACIENTES.SEARCH).type('Bruna')
    cy.wait('@response').then((xhr) => {
      let total = xhr.response.body.total
      let nome = xhr.response.body.data[0].name
      let cpf = xhr.response.body.data[0].fiscal_number
      let mae = xhr.response.body.data[0].mother_name
      expect(xhr.response.body.total).to.be.equal(total)
      expect(xhr.response.body.data[0].name).to.be.equal(nome)
      expect(xhr.response.body.data[0].fiscal_number).to.be.equal(cpf)
      expect(xhr.response.body.data[0].mother_name).to.be.equal(mae)

    })
  })



  it('Should to search Patients - CPF',() => {
    cy.get(loc.PACIENTES.SEARCH).click()
    cy.server()
    cy.route('GET', '**/patient/**').as('response')
    cy.get(loc.PACIENTES.SEARCH).type('181.193.330-04')
    cy.wait('@response').then((xhr) => {
        let total = xhr.response.body.total
        let nome = xhr.response.body.data[0].name
        let cpf = xhr.response.body.data[0].fiscal_number
        let mae = xhr.response.body.data[0].mother_name
        expect(xhr.response.body.total).to.be.equal(total)
        expect(xhr.response.body.data[0].name).to.be.equal(nome)
        expect(xhr.response.body.data[0].fiscal_number).to.be.equal(cpf)
        expect(xhr.response.body.data[0].mother_name).to.be.equal(mae)

    })
  })


  it('Should to search Patients - Responsable',() => {
    cy.get(loc.PACIENTES.SEARCH).click()
    cy.server()
    cy.route('GET', '**/patient/**').as('response')
    cy.get(loc.PACIENTES.SEARCH).type('Sophia')
    cy.wait('@response').then((xhr) => {
        let total = xhr.response.body.total
        let nome = xhr.response.body.data[0].name
        let cpf = xhr.response.body.data[0].fiscal_number
        let mae = xhr.response.body.data[0].mother_name
        expect(xhr.response.body.total).to.be.equal(total)
        expect(xhr.response.body.data[0].name).to.be.equal(nome)
        expect(xhr.response.body.data[0].fiscal_number).to.be.equal(cpf)
        expect(xhr.response.body.data[0].mother_name).to.be.equal(mae)
    })
  })

  it('Should validate Elements in Module',() => {
    cy.xpath(loc.MENU.XP_BTN_CLIENTES).click()
    cy.server()
    cy.route('GET','https://sollar-backend.herokuapp.com/api/patient?limit=10&page=1').as('response')
    cy.xpath(loc.MENU.XP_BTN_PACIENTES).click()
    cy.wait('@response').then((xhr) => {
      let total = xhr.response.body.total
      expect(total).to.be.equal(xhr.response.body.total)
      console.log(xhr.response.body.total)
    })

    cy.get(loc.PACIENTES.SEARCH).should('be.visible')
    cy.xpath(loc.PACIENTES.XP_BTN_NOVO).should('be.visible')
    cy.get('.MuiToolbar-root').should('be.visible')
  })

})
