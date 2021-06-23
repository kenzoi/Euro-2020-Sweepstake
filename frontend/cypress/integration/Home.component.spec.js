context('Assertions', () => {

  const baseUrl = 'http://localhost:3000';

  describe('Home Component', () => {
    it('It should login and redirect to the /user page', () => {
      cy.visit(baseUrl)
      cy.get('#email')
      .type('steffen@steffen.com')
      cy.contains('Login').click()
    cy.url()
    .should('include', `${baseUrl}/user`)
    })
  })

});
