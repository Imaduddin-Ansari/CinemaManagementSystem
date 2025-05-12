// e2e/api/history.spec.cy.js

describe('Get Booking History API', () => {
  // Function to log in and retrieve the token from cookies
  const loginAndGetToken = () => {
    // Make the login request
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/users/login', // Update with your login endpoint
      body: {
        email: 'i222446@nu.edu.pk',  // Replace with valid login details
        password: 'Imad2446',         // Replace with valid password
      },
    }).then((response) => {
      // Assert the login is successful
      expect(response.status).to.eq(200);
      
      // Verify the token is stored in cookies
      cy.getCookie('token').should('exist');
    });
  };

  it('should fetch user booking history', () => {
    // First, log in to get the token
    loginAndGetToken();

    // After logging in, get the token from the cookies
    cy.getCookie('token').then((cookie) => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/bookings/history',  // Adjust with your actual endpoint
        headers: {
          'Authorization': `Bearer ${cookie.value}`,  // Use the token from the cookies
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  });
});
