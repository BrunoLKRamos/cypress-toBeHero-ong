const el = require('./elements').ELEMENTS

class Register{
    acessarCadastro(){
        cy.visit('http://localhost:3000/register')
    }

    preencherCadastro(){
        cy.get(el.name).type('Doguinhos legais')
        cy.get(el.email).type('doguinhos@mail.com')
        cy.get(el.whatsapp).type('48999999999')
        cy.get(el.city).type('Florianópolis')
        cy.get(el.uf).type('SC')

        cy.route('POST', '**/ongs').as('postOng')

        cy.get(el.submit).click()
    }

    validarCadastroDeOngComSucesso(){
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200)
            expect(xhr.response.body).has.property('id')
            expect(xhr.response.body.id).is.not.null
        })
    }
}

export default new Register()