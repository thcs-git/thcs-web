/// <reference types="cypress" />

describe('',() => {

  it('Should search status - Ativo', () =>{

      cy.loginApi('brunogcpereira@gmail.com', '123456789')
      .its('body').then(bdy =>{
      cy.request({
        method:'GET',
        url:'https://sollar-backend.herokuapp.com/api/patientarea/?search=ativo',
        headers:{
          token :`${bdy.token}`,
          company_id: `${bdy.companies[0]._id}`,
          customer_id: `${bdy.customer_id._id}`,
        }
      }).as('res_ativo')

      cy.request({
        method:'GET',
        url:'https://sollar-backend.herokuapp.com/api/patientarea/?search=inativo',
        headers:{
          token :`${bdy.token}`,
          company_id: `${bdy.companies[0]._id}`,
          customer_id: `${bdy.customer_id._id}`,
        }
      }).as('res_inativo')

        cy.get('@res_ativo').then(res => {
          let total = res.body.total
          expect(res.body).to.have.property('total')
          expect(res.body.total).to.be.equal(total)
        })

        cy.get('@res_inativo').then(res => {
          let total = res.body.total
          expect(res.body).to.have.property('total')
          expect(res.body.total).to.be.equal(total)
        })
      })
    })



  })
