describe('AutomationExercise E-Commerce Store - 10 Test Suite', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com/');
  });

  it('TC-01: Verify home page loads and displays featured products', () => {
    cy.url().should('include', 'automationexercise.com');
    cy.get('.features_items').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
  });

  it('TC-02: Verify navigation to All Products page', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('.title.text-center').should('contain', 'All Products');
  });

  it('TC-03: Search for a valid product ("Tshirt")', () => {
    cy.get('a[href="/products"]').click();
    cy.get('#search_product').type('Tshirt');
    cy.get('#submit_search').click();
    cy.get('.title.text-center').should('contain', 'Searched Products');
    cy.get('.productinfo p').should('contain.text', 'Tshirt');
  });

  it('TC-04: Search for a non-existent product (Boundary/Empty Results)', () => {
    cy.get('a[href="/products"]').click();
    cy.get('#search_product').type('NonExistentItemXYZ999');
    cy.get('#submit_search').click();
    cy.get('.title.text-center').should('contain', 'Searched Products');
    cy.get('.features_items .product-image-wrapper').should('have.length', 0);
  });

  it('TC-05: View single product details page', () => {
    cy.get('a[href="/products"]').click();
    cy.get('a[href="/product_details/1"]').click();
    cy.url().should('include', '/product_details/1');
    cy.get('.product-information h2').should('be.visible');
    cy.get('.product-information span span').should('contain', 'Rs.');
  });

  it('TC-06: Reject user login with invalid credentials (Negative)', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="login-email"]').type('wronguser@example.com');
    cy.get('[data-qa="login-password"]').type('InvalidPass123');
    cy.get('[data-qa="login-button"]').click();
    cy.get('.login-form form p')
      .should('be.visible')
      .and('contain', 'Your email or password is incorrect!');
  });

  it('TC-07: Reject signup using an already registered email (Negative)', () => {
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type('Test User');
    cy.get('[data-qa="signup-email"]').type('test@test.com');
    cy.get('[data-qa="signup-button"]').click();
    cy.get('.signup-form form p')
      .should('be.visible')
      .and('contain', 'Email Address already exist!');
  });

  it('TC-08: Add a product to the shopping cart and verify item row', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    cy.get('#cartModal a[href="/view_cart"]').click();
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info_table tbody tr').should('have.length', 1);
  });

  it('TC-09: Remove a product from the shopping cart', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    cy.get('#cartModal a[href="/view_cart"]').click();
    cy.get('.cart_quantity_delete').click();
    cy.get('#empty_cart').should('be.visible').and('contain', 'Cart is empty!');
  });

  it('TC-10: Verify footer newsletter subscription with valid email', () => {
    cy.scrollTo('bottom');
    cy.get('#susbscribe_email').type('student.qa@example.com');
    cy.get('#subscribe').click();
    cy.get('#success-subscribe .alert-success')
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  });
});