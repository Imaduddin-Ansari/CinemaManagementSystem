// e2e/api/cancel.spec.cy.js

describe('Cancel Booking API', () => {
  // Function to log in and retrieve the token from cookies
  const loginAndGetToken = () => {
    // Make the login request
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/users/login', // Update with your login endpoint
      body: {
        email: 'i222446@nu.edu.pk',  // Replace with valid login details
        password: 'Imad2446',    // Replace with valid password
      },
    }).then((response) => {
      // Assert the login is successful
      expect(response.status).to.eq(200);
      
      // Verify the token is stored in cookies
      cy.getCookie('token').should('exist');
    });
  };

  it('should cancel a booking successfully', () => {
    // First, log in to get the token
    loginAndGetToken();

    const bookingId = '6756a3e420fbefc407a3a687';  // Example booking ID

    cy.getCookie('token').then((cookie) => {
      cy.request({
        method: 'DELETE',
        url: `http://localhost:3000/api/bookings/${bookingId}/cancel`,  // Corrected URL
        headers: {
          'Authorization': `Bearer ${cookie.value}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Booking cancelled successfully');
      });
    });
  });
});
