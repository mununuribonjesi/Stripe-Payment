const axios = require('axios');

async function Authorization(req)
{
const authHeader = req.headers['authorization'];
const bearerToken = authHeader.split(' ');
const token = bearerToken[1];
const url = "http://localhost:3000/api/verification"

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
    Authorization
}