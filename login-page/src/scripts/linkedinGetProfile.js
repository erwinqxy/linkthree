const axios = require('axios');

const accessToken = 'your_oauth2_access_token';
const profileEndpoint = 'https://api.linkedin.com/v2/me';

axios
  .get(profileEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then((response) => {
    console.log('Profile Data:', response.data);
  })
  .catch((error) => {
    console.error('Error fetching profile data:', error);
  });
