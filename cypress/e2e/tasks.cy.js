/// <reference types="cypress" />

describe('tarefa', () => {

    let testData;

    before(() => {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    });

    context('cadastro', () => {

        beforeEach(() => {
            cy.visit('/')
        });
        it('deve cadastrar uma nova tarefa', () => {

            const task = testData.adiciona

            cy.removeTaskByName(task.name)
            cy.createTask(task.name)

            cy.contains('main div p', task.name)
                .should('be.visible')
        })
        it('não deve permitir tarefa duplicada', () => {

            const task = testData.duplicada

            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)

            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })
        it('campo obrigatorio', () => {

            cy.createTask()
            cy.isRequired('This is a required field')
        })
    });

    context('atualização', () => {
        it('deve concluir uma tarefa', () => {
            const task = testData.atualizar

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*="ItemToggle"]').click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        });
    });

    context('exclusão', () => {
        it('deve remover uma tarefa', () => {
            const task = testData.remove

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*="ItemDelete"]').click()

            cy.contains('p', task.name)
                .should('not.exist')
        });
    });
})