describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('.login-form-container').should('exist')   // LoginForm is present
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.visit('')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('.signedIn').should('contain', 'Matti Luukkainen logged in')
      cy.get('.signedIn').find('button').should('exist').should('have.text', 'Logout')
    })

    it('fails with wrong credentials', function() {
      cy.visit('')
      cy.get('#username').type('non-existent user')
      cy.get('#password').type('not a real password')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.getBlogs().then(previousBlogs => {
        // Create new blog
        cy.createBlog({
          title: 'a new blog',
          author: 'cypress',
          url: 'url to new blog',
        })

        // Check that the length of the blogs array is one more than before
        cy.getBlogs().then(currentBlogs => {
          expect(currentBlogs.body.length).to.equal(previousBlogs.body.length + 1)
        })
      })
    })

    it('A user can like a blog', function () {
      // Add like and verify that the new blog has one like
      cy.addLike().then(() => {
        cy.get('.likes').should('contain', 'likes 1')
      })
    })

    it('A user can delete a blog they created', function() {
      cy.blogDeleted()
    })

    it('Another user cannot delete a blog', function() {
      cy.blogNotDeleted()
    })
  })

})