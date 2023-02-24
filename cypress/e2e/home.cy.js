/// <reference types="cypress" />

describe('home', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    it('webapp deve estar online', () => {
        cy.title()
            .should('eq', 'Gerencie suas tarefas com Mark L')
    });
});