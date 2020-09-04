Cypress.Commands.add('createOng', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/ongs',
        body: {
            name: "Gatinhos não tão queridos",
            email: "gatos@mail.com",
            whatsapp: "48888888888",
            city: 'Florianópolis',
            uf: "SC"
        }
    }).then(response => {
        expect(response.body.id).is.not.null
        cy.log(response.body.id)

        Cypress.env('createdOngId', response.body.id)
    })
})

Cypress.Commands.add('createNewIncident', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/incidents',
        headers: { 'Authorization': `${ Cypress.env('createdOngId') }`, },
        body: {
            title: "Animal abandonado",
            description: "Animal precisa de apoio para ter uma moradia",
            value: "200"
        }
    }).then(response => {
        expect(response.body.id).is.not.null
        cy.log(response.body.id)

        Cypress.env('createIncidentId', response.body.id)
    })
})

Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/profile', {
        onBeforeLoad: (browser) => {
            browser.localStorage.setItem('ongId', Cypress.env('createdOngId'))
            browser.localStorage.setItem('ongName', 'Gatinhos não tão queridos')
        }
    })
})
