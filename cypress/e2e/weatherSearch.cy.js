/* eslint-env cypress */ 
describe('Weather app simple E2E', () => {
  it('should search for Lund', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Skriv stad..."]').type('Lund');
    cy.get('button').contains('Sök').click();
    cy.contains('Lund').should('be.visible');
  });
});
