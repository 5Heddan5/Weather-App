describe('Favorites feature', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.clearLocalStorage();
  });

  it('should allow adding Lund as a favorite', () => {
    cy.get('input[placeholder="Search city..."]').type('lund');

    cy.contains('Sök').click();

    cy.contains(/lund/i, { timeout: 10000 }).should('exist');

    cy.contains('Lägg till favorit').click();

    cy.get('div').contains(/lund/i).should('exist');
  });

it('should allow removing Lund from favorites', () => {
  // Lägg till 'lund' som favorit igen
  cy.get('input[placeholder="Search city..."]').type('lund');
  cy.contains('Sök').click();
  cy.contains('Lägg till favorit').click();

  // Ta bort favorit 'lund'
  cy.get('[data-cy="favorites-list"]')
    .contains(/lund/i)
    .parent()
    .find('[data-cy="remove-fav"]')
    .click();

  // Kontrollera att 'lund' inte längre finns i listan
  cy.get('[data-cy="favorites-list"]').should('not.contain', /lund/i);
});

});
