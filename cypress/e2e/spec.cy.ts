// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('My First Test', () => {
  // cy.on("fail", (err, runnable) => {
  //   cy.log(err.message);
  //   return false;
  // });
  it('clicks the link "type"',() => {
   
    // cy.intercept('http://localhost:3000/customize/classification').as('boardList')
    cy.visit('http://localhost:4200/')
    // cy.contains('Data Catalog').click()
    // cy.contains('Cluster').click()
   
  //  cy.get('.mat-tab-label').contains('ACCESS').should('be.visible')

  // cy.get('.mat-tab-label').contains('ACCESS').should('not.exist')7
  // cy.wait(3000)
  // cy.contains('+').click()
  // cy.contains('+').click()
  // cy.contains('+').click()
  // cy.contains('Table 1').click()
  // cy.get('.mat-tab-label').contains('ACCESS').should('be.visible')
  // cy.get('.mat-tab-label').contains('ACCESS').click()
  //  cy.wait(5000)
   
    cy.contains('Breach Risk').click()
    cy.get('[data-subheader="sub-header"]').should('be.visible')
    cy.get('[data-header="header"]').should('be.visible')
    cy.get('[data-search="search-icon"]').should('be.visible')
    cy.get('[data-search="search"]').type('Cluster12/Database1/Schema/Table1')
    cy.contains('SEARCH').click()
    cy.get('[data-close="close-icon"]').should('be.visible')
    cy.get('[data-searchbtn="search-button"]').should('be.visible')
    // cy.get('[data-totalrecords="total-records"]').should('be.visible')
    cy.get('table').should('be.visible');
    cy.get('table').contains('th', 'Data Asset').should('be.visible');
    cy.get('table').contains('th', 'Data Asset').should('have.css', 'color', 'rgb(38, 50, 56)');


    cy.get('table tbody td').then(($td) => {
      const texts = Cypress._.map($td, 'innerText')
      expect(texts).to.deep.equal(texts)
      // console.log("table data",$td)
      // console.log(texts)
    })
    cy.get('table').contains('td', 'TEST_DATABRICKS ... auto_testing_table_1').should('be.visible')
      .siblings()
      .contains('button', 'More')
      .click()
    // cy.wait(3000)
    cy.get('[data-close="close"]').click()
    // cy.wait(3000)

    cy.get('.mat-paginator').find('button.mat-paginator-navigation-next.mat-icon-button').click();
    cy.get('[data-cy=tags-drpbtn]').should('be.visible').click()
    cy.get('[data-cy="menu-item"]').contains('age').click();
    cy.get('body').click(0, 0);
    cy.get('[data-cy="breach-drpbtn"]').click().get('[data-cy="breach-menu"]').contains('High').click();
    cy.get('body').click(0, 0);
    // cy.wait(3000)
   
    cy.get('[data-clear="clear-btn"]').click({ force: true })
    // cy.contains('Tags').click()
   
    // // // cy.intercept('GET', 'http://localhost:3000/customize/classification', {}).as('userPut')
    // // // // // cy.wait(36000)http://localhost:3000/customize/classification
    // // cy.wait('@boardList')
    // cy.request('http://localhost:3000/customize/classification')
    // cy.get('[data-tagssubheader="sub-header"]').should('be.visible')
    // // cy.wait(3000)
    // cy.get('[data-tagsheader="header"]').should('be.visible')
    // // cy.wait(3000)
    // cy.get('[data-heading="heading"]').should('be.visible')
    // // cy.wait(3000)
    // cy.get('table').contains('th', 'Tag Name').should('be.visible');
    // // cy.wait(3000)
    // cy.get('table').contains('th', 'Type').should('be.visible');
    // // // cy.wait(3000)
    // cy.get('[data-classheading="class-heading"]').should('be.visible')
    // // cy.wait(3000)

    // cy.get('[data-createtag="create-tag"]').type('new_tag')
    // // cy.wait(3000)
    // cy.contains('CREATE').click()
    // // cy.wait(3000)
    // cy.get('mat-select[formControlName=classification]').click().get('mat-option').contains('PI').click();
    // // // cy.intercept('GET', 'http://localhost:3000/customize/classification', {}).as('userPut')
    // // // // cy.wait(36000)http://localhost:3000/customize/classification
    // // // cy.wait('@userPut')
    // // // cy.request({
    // // //   method:'GET',
    // // //   url:'${http://localhost:3000/customize/classification}',
    // // //   failOnStatusCode: false,
    // // // }).as('details')
    // // // cy.get('@details').then((response=>{
    // // //   cy.log(JSON.stringify(response))
    // // // }))
    // cy.get('table').contains('th', 'Tags in category: pi').should('be.visible');
    // cy.get('table').contains('th', 'Action').should('be.visible');

    // // // cy.wait(2000)

    // cy.get('mat-select[formControlName=classificationTags]').click().get('mat-option').contains('new_tag').click();
    // cy.get('body').click(0, 0);
    // cy.contains('ADD TO CATEGORY').click()


    //   cy.get('[data-cy="classificaion-table"]', { timeout: 10000 }).should('be.visible').then(() => {
    //     cy.get('mat-select[formControlName=classificationTags]').click().get('mat-option').contains('new_tag').click();
    //  })

    // cy.get('[dy-tabletags="tags-table"]').contains('td', 'new_tag').should('be.visible');

    // cy.get('table').contains('td', 'TEST_DATABRICKS ... auto_testing_table_1').trigger('mouseover').find('mat-icon').click()
    //   cy.get(':nth-child(1) > [headers="Data Asset"]')
    //   .then(function ($el) {
    //     const id1 = $el.text();
    //     cy.wrap(id1).as('data');
    // });
    

    //   cy.get<string>('@data').then(data => cy.log(data))
    //   cy.get(':nth-child(1) > [headers="Data Asset"]')
    //   .invoke('text')
    //   .as('data');

    // cy.get<string>('@data').then(data => cy.log(data))
    // cy.get('table tbody td')

    // cy.get('.mat-paginator').find('mat-select.mat-paginator-range-label')
    // cy.get('[data-paginator="paginator"]').click()
    // cy.get('table').contains('td', 'TEST_DATABRICKS ... auto_testing_table_1').trigger('mouseover').find('mat-icon').click()




    // cy.get('table').contains('td', 'Hydrogen').should('be.visible');
    // it('confirms the sorted age column', () => {
    //   cy.get('table tbody')
    //     .table(2, 0, 1)
    //     .print()
    //     .map(Number)
    //     .print()

    // })

    // it('confirms the cells (cy.map)', () => {
    //   cy.get('table tbody td').map('innerText').then(console.log)
    // })



  })
  // it('second test', () => {
  //   cy.visit('http://localhost:4200/')
  //   cy.contains('Data Catalog').click()
  //   cy.contains('Cluster').click()
  //   cy.contains('+').click()
  //   cy.contains('+').click()
  //   cy.contains('+').click()
  //   cy.contains('Table 1').click()
  //   cy.get('.mat-tab-label').contains('ACCESS').should('be.visible')
  //   cy.get('.mat-tab-label').contains('ACCESS').click()
  // })
})