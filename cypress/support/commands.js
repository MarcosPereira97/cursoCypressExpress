/// <reference types="cypress" />
import { faker } from '@faker-js/faker/locale/pt_BR'

Cypress.Commands.add('createTask', (taskName = '') => {

    cy.get('#newTask').as('inputTask')

    if (taskName !== '') {
        cy.get('@inputTask')
            .type(taskName)
    }
    cy.get('button[class*="ButtonNewTask"]').click()
})

Cypress.Commands.add('removeTaskByName', (taskName) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE',
        body: { name: taskName }
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('postTask', (task) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: task
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('isRequired', (targetMessage) => {
    cy.get('@inputTask')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(targetMessage).to.eq(text)
        })
})