const fs = require('fs');
const path = require('path');

const postmanPath = path.join(__dirname, 'DOCS', 'CityFix-backend.postman_collection.json');
const collection = JSON.parse(fs.readFileSync(postmanPath, 'utf8'));

// Find "Users" item
const usersItem = collection.item.find(i => i.name === 'Users');
if (usersItem) {
  // Update "update-me" to PUT
  const updateMe = usersItem.item.find(i => i.name === 'update-me');
  if (updateMe && updateMe.request) {
    updateMe.request.method = 'PUT';
  }
  // Remove "change-password"
  usersItem.item = usersItem.item.filter(i => i.name !== 'change-password');
}

fs.writeFileSync(postmanPath, JSON.stringify(collection, null, 2));
console.log('Fixed Postman collection.');

async function fetchAPI() {
  const baseUrl = 'https://cityfix-backend-lime.vercel.app/api/v1';
  let adminToken = null;
  let citizenToken = null;
  const responses = {};

  try {
    // Attempt Admin login
    const adminLogin = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@cityfix.local', password: 'securepassword123' })
    });
    const adminData = await adminLogin.json();
    responses['POST /auth/login (admin)'] = adminData;
    
    if (adminData.data && adminData.data.tokens) {
      adminToken = adminData.data.tokens.accessToken;
    } else {
        // try citizen
        const citizenLogin = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'citizen@cityfix.local', password: 'securepassword123' })
        });
        const citizenData = await citizenLogin.json();
        responses['POST /auth/login (citizen)'] = citizenData;
        if (citizenData.data && citizenData.data.tokens) {
            citizenToken = citizenData.data.tokens.accessToken;
        }
    }

    const tokenToUse = adminToken || citizenToken;

    if (!tokenToUse) {
      console.log('Could not get a token, saving what we have.', responses);
    } else {
      // GET /complaints
      const complaints = await fetch(`${baseUrl}/complaints`, {
        headers: { Authorization: `Bearer ${tokenToUse}` }
      });
      responses['GET /complaints'] = await complaints.json();

      // GET /admin/dashboard-stats
      const stats = await fetch(`${baseUrl}/admin/dashboard-stats`, {
        headers: { Authorization: `Bearer ${tokenToUse}` }
      });
      responses['GET /admin/dashboard-stats'] = await stats.json();

      // POST /payments/initiate (expecting it to fail nicely or return a structure)
      // We need a complaintId for this, let's grab one from the complaints list if it exists
      let complaintId = '<UUID>';
      if (responses['GET /complaints'] && responses['GET /complaints'].data && responses['GET /complaints'].data.length > 0) {
        complaintId = responses['GET /complaints'].data[0].id;
      }
      
      const payment = await fetch(`${baseUrl}/payments/initiate`, {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${tokenToUse}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ complaintId, purpose: 'PRIORITY_FEE' })
      });
      responses['POST /payments/initiate'] = await payment.json();
    }

    fs.writeFileSync(path.join(__dirname, 'DOCS', 'api-responses.json'), JSON.stringify(responses, null, 2));
    console.log('Fetched API responses and saved to DOCS/api-responses.json');
  } catch (error) {
    console.error('Error fetching API:', error);
  }
}

fetchAPI();
