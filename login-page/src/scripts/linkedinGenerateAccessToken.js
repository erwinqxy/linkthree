const axios = require('axios');

async function getLinkedInAccessToken(authorizationCode) {
  const requestData = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    client_id: '86fceak5pj0zeh',
    client_secret: '3DscfcB2HUeQRHcZ',
    redirect_uri: 'http://localhost:3000/linkedin',
  });

  const tokenEndpoint = 'https://www.linkedin.com/oauth/v2/accessToken';

  try {
    const response = await axios.post(tokenEndpoint, requestData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error obtaining access token:', error);
    throw error;
  }
}

getLinkedInAccessToken(
  'AQT8EidxXO2qrKHeVJRIqnxef2nGTJZA4FqxOAtLIkHZeVJUG_1g2SuDB2KCEi2loQ9iaikkFbDzwLR18ys-3ok1vL_kNu10CyTmCPb70nF-8vyu2ONtD_NlwIUXnjWn_Bk7FXMSGYS1aTRTYlsJ0cazN4vQ5_Q3LH3lF-XYfDLgZIC6ttWo-JID6DsaIxHJdFMz6g_pvoEZqIwxdqw'
)
  .then((accessToken) => {
    console.log('Access Token:', accessToken);
  })
  .catch((error) => {
    console.error('Error obtaining access token:', error);
  });