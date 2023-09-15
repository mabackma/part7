Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
  cy.visit('')
})

Cypress.Commands.add('getBlogs', () => {
  return cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
})

Cypress.Commands.add('addLike', () => {
  // Create a new blog
  cy.createBlog({
    title: 'a likeable blog',
    author: 'cypress',
    url: 'url to likeable blog',
  })

  // View the details of the new blog and press the like button
  cy.contains('likeable').contains('view').click().then(visibleBlog => {
    cy.get('.likes').contains('like').click().then(likedBlog => {
      return likedBlog
    })
  })

  Cypress.Commands.add('blogDeleted', () => {
    // Create a new blog
    cy.createBlog({
      title: 'Blog to be deleted',
      author: 'cypress',
      url: 'url to deleting blog',
    })

    // Verify that the blog exists on the page
    cy.contains('Blog to be deleted').should('exist')

    cy.contains('to be deleted').contains('view').click()
    cy.contains('remove').click()

    // Verify that the blog no longer exists on the page
    cy.contains('Blog to be deleted').should('not.exist')
  })

  Cypress.Commands.add('blogNotDeleted', () => {
    // Create a new blog
    cy.createBlog({
      title: 'Blog to be deleted',
      author: 'cypress',
      url: 'url to deleting blog',
    })

    // Log out current user
    cy.contains('Logout').click()

    // Create new user
    const user = {
      name: 'ML 2',
      username: 'mluukkai2',
      password: 'salainen2'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)

    // Log in new user
    cy.get('#username').type('mluukkai2')
    cy.get('#password').type('salainen2')
    cy.get('#login-button').click()

    // Verify that the blog exists on the page
    cy.contains('Blog to be deleted').should('exist')

    cy.contains('to be deleted').contains('view').click()
    cy.contains('remove').click()

    // Verify that the blog still exists on the page
    cy.contains('Blog to be deleted').should('exist')
  })
})
