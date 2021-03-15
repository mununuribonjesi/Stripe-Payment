const axios = require('axios');

async function authorization(req)
{
const authHeader = req.headers['authorization'];
const bearerToken = authHeader.split(' ');
const token = bearerToken[1];
const url = "https://b4sbi04kmi.execute-api.us-east-1.amazonaws.com/dev/api/verification"

const response = await axios({
  url:url,
  method: 'Post',
  headers:{
    'Authorization':`Bearer ${token}`
  }
})

return response
}



module.exports = {
    authorization
}