// e2e/api/modify.spec.cy.js

describe('Modify Booking API', () => {
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

  it('should modify booking details successfully', () => {
    // First, log in to get the token
    loginAndGetToken();

    const bookingId = '6759868ed7f506bfe699d9e1';  // Example booking ID
    const updateData = {
      showtime: '2024-12-10T18:00:00.000Z',
      seats: [1, 4],
      payment: {
        status: 'success',
        amount: 40,
        type: 'Credit Card',
      },
    };

    // After logging in, get the token from the cookies
    cy.getCookie('token').then((cookie) => {
      cy.request({
        method: 'PUT',
        url: `http://localhost:3000/api/bookings/${bookingId}/modify`,  // Correct URL
        body: updateData,
        headers: {
          'Authorization': `Bearer ${cookie.value}`, // Use the token from cookies
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Booking updated successfully');
        expect(response.body.booking.showtime).to.eq(updateData.showtime);
      });
    });
  });
});
