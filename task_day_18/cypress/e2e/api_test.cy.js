describe('Sanbercode Automated API Test Task', () => {
  const baseUrl = 'https://reqres.in/api'; 
  const apiKey = 'reqres-free-v1';   

  it('GET /users - List User', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users`,
      headers: { 'x-api-key': apiKey}
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(200);
      expect(response.headers['content-type']).to.include('application/json');
      const body = response.body;
      expect(body).to.have.property('page').that.is.a('number').and.is.above(0);
      expect(body).to.have.property('per_page').that.is.a('number').and.eq(6);
      expect(body).to.have.property('total').that.is.a('number').and.is.above(0);
      expect(body).to.have.property('total_pages').that.is.a('number').and.is.above(0);
      expect(body).to.have.property('data').that.is.an('array');
      expect(body).to.have.property('support').that.is.an('object');
    });
  });

  it('GET /users?page=0 returns page 1', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=0`,
      headers: { 'x-api-key': apiKey }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(200);
      const body = response.body;
      expect(body.page).to.eq(1);
    });
  });

  it('GET /users?page=3 returns last page', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=3`,
      headers: { 'x-api-key': apiKey }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(200);
      const body = response.body;
      expect(body.page).to.be.at.most(body.total_pages);
    });
  });

  it('GET /users?per_page=4 returns 4 users', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?per_page=4`,
      headers: { 'x-api-key': apiKey }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(200);
      const body = response.body;
      expect(body.per_page).to.eq(4);
      expect(body.data.length).to.eq(4);
    });
  });

  it('GET /users?per_page=0 returns default 6 users', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?per_page=0`,
      headers: { 'x-api-key': apiKey }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(200);
      const body = response.body;
      expect(body.per_page).to.eq(6);
      expect(body.data.length).to.eq(6);
    });
  });

  it('GET /users?per_page=15 returns all users in one page', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?per_page=15`,
      headers: { 'x-api-key': apiKey }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(200);
      const body = response.body;
      expect(body.per_page).to.eq(15);
      expect(body.total).to.be.at.most(body.data.length);
    });
  });

  it('GET /users/2 returns single user', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      headers: { 'x-api-key': apiKey }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(200);
      const body = response.body;
      expect(body.data).to.have.property('id', 2);
      expect(body.support).to.be.an('object');
    });
  });

  it('GET /unknown/23 returns 404', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/unknown/23`,
      headers: { 'x-api-key': apiKey },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(404);
      expect(response.duration).to.be.lessThan(200);
      const body = response.body;
      expect(body).to.have.property('error').that.is.a('string');
    });
  });

  it('GET /users?delay=3 returns delayed response', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?delay=3`,
      headers: { 'x-api-key': apiKey }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.at.least(3000);
      const body = response.body;
      expect(body).to.have.property('page').that.is.a('number').and.is.above(0);
    });
  });

  it('POST /users creates new user', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: { 'x-api-key': apiKey },
      body: { name: "Alvin", job: "Freelancer" }
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id').that.is.a('string');
      expect(response.body).to.have.property('createdAt').that.is.a('string');
    });
  });

  it('PUT /users/727 updates user', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/727`,
      headers: { 'x-api-key': apiKey },
      body: { name: "Lavina", job: "Office Worker" }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('updatedAt').that.is.a('string');
    });
  });

  it('PATCH /users/727 updates user', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/727`,
      headers: { 'x-api-key': apiKey },
      body: { name: "Clark", job: "Clerk" }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('updatedAt').that.is.a('string');
    });
  });

  it('DELETE /users/727 deletes user', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/727`,
      headers: { 'x-api-key': apiKey },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(204);
    });
  });

  it('POST /register success', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: { 'x-api-key': apiKey },
      body: {
        email: "eve.holt@reqres.in",
        password: "pistol"
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });

  it('POST /register failure - missing password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: { 'x-api-key': apiKey },
      body: { email: "sydney@fife" },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });

  it('POST /login success', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers: { 'x-api-key': apiKey },
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('POST /login failure - missing password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers: { 'x-api-key': apiKey },
      body: { email: "peter@klaven" },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });
 
});
