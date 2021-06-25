describe('First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('ShowMeWeather')
    // cy.contains('sandbox app is running!')
  })
})
