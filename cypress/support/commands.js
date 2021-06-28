// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from './locators'

Cypress.Commands.add('login',(email,password) => {
  cy.get(loc.LOGIN.EMAIL).type(email)
  cy.get(loc.LOGIN.PASSWORD).type(password)
  cy.xpath(loc.LOGIN.XP_BTN_ENTRAR).click()
})


Cypress.Commands.add('loginApi',(user,pass) => {
  cy.request({
    method:'POST',
    url:'https://sollar-backend.herokuapp.com/api/user/login',
    body:{
        email: user,
        password: pass,
    }
  })
})

Cypress.Commands.add('getCnpj',(cyget) => {
  function generateCnpj(){
    let resultado
    const n1 = Math.round(Math.random()*9);
    const n2 = Math.round(Math.random()*9);
    const n3 = Math.round(Math.random()*9);
    const n4 = Math.round(Math.random()*9);
    const n5 = Math.round(Math.random()*9);
    const n6 = Math.round(Math.random()*9);
    const n7 = Math.round(Math.random()*9);
    const n8 = Math.round(Math.random()*9);
    const n9 = 0;
    const n10 = 0;
    const n11 = 0;
    const n12 = 1;

    let d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
    d1 = 11 - Math.round(d1 - (Math.floor(d1/11)*11));

    if (d1>=10) d1 = 0;
    let d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
    d2 = 11 - Math.round(d2 - (Math.floor(d2/11)*11));
    if (d2>=10) d2 = 0;
    return resultado = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+d1+d2;
  }

  const cnpj = generateCnpj()
  cy.get(cyget).type(cnpj)
})

Cypress.Commands.add('getCep',(cyget) => {
  function generateCep(){
    const arrayCep =
   [54759180, 54410520, 52071010, 54759095, 54580760, 54767727, 50781300, 55816700,
    52190516, 53530422, 54430700, 53510428, 53240420, 55819422, 54765435, 52081515,
    53620794, 54725150, 55641020, 54440401, 55039010, 54170661, 55297793, 52280106,
    56903441, 55153015, 52390085, 55644318, 53190016, 51250160, 54777125, 56318800,
    53180001, 52280460, 55010213, 54140290, 55019150, 55298700, 53630056, 54517150,
    55158105, 50010090, 52160520, 52390460, 50751200, 54737470, 54170195, 55645495,
    53290400, 55604430, 56323745, 54530040, 55022010, 50640500, 53220520, 53407483,
    52165205, 53270501, 54300040, 56912158, 54355211, 55297808, 52291450, 55195704,
    52130568, 54705360, 51240080, 53050390, 50740740, 55608695, 55645692, 54783715,
    56313430, 55021080, 55042370, 53620788, 54730202, 55642740, 53404412, 55027460,
    50650230, 54330206, 55027020, 55151740, 55032572, 55614455, 50900395, 54720243,
    55032370, 54345020, 55028170, 52081140, 53565631, 55640295, 52050130, 54325486,
    54490085, 56310745, 55152030, 50741160]
    let i;
    i = Math.floor(Math.random()*arrayCep.length)
    return arrayCep[i]
   }

   const cep = generateCep()
   cy.get(cyget).type(cep)
})

Cypress.Commands.add('getName',(cyget) => {
  function generateNewUser(){
    let name ='';
    let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for(let i=0; i<10; i++){
      name += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return name;
  };
  const nome = generateNewUser()
  cy.get(cyget).type(nome)
})

Cypress.Commands.add('getEmail', (cyget) =>{
  function generateNewUser(){
    let name ='';
    let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for(let i=0; i<10; i++){
      name += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return name;
  };
  const nome = generateNewUser()
  cy.get(cyget).type(nome+'@mail.com.br')
})


