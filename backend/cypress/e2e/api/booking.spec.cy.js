describe('Booking API', () => {
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

  it('should successfully book a ticket', () => {
    // First, log in to get the token
    loginAndGetToken();

    // Load booking data from fixture
    cy.fixture('bookingData.json').then((bookingData) => {
      // Use the token from cookies for authorization
      cy.getCookie('token').then((cookie) => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:3000/api/bookings/book', // Corrected URL
          body: bookingData,
          headers: {
            'Authorization': `Bearer ${cookie.value}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.message).to.eq('Booking successful');
          expect(response.body.bookingId).to.exist;
        });
      });
    });
  });

  it('should return an error for invalid payment details', () => {
    // First, log in to get the token
    loginAndGetToken();

    const invalidBookingData = {
      movieId: "60f4b2bbf1a6b78f9c4b6e3b",
      showtime: "2024-12-15T20:00:00Z",
      seats: [1, 2],
      payment: {
        amount: 30,
        status: "invalid",  // Invalid payment status
        type: "Credit Card",
      },
    };

    cy.getCookie('token').then((cookie) => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/bookings/book',  // Corrected URL
        body: invalidBookingData,
        headers: {
          'Authorization': `Bearer ${cookie.value}`,
        },
        failOnStatusCode: false, // Do not fail the test on non-2xx status codes
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Invalid payment details');
      });
    });
  });
});
