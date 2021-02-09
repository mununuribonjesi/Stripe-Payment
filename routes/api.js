const express = require('express');
const router = express.Router();
const functions = require('../functionality/payments');
const security = require('../functionality/security/Authorization');

router.post('/payment', async function (req, res, next) {

    if(!req.headers['authorization']) return res.sendStatus(403);
  
    const Auth = await security.Authorization(req);

    if(Auth.status==200)
    {
      functions.stripePayment(req,res)
    }
    else
    {
      return res.sendStatus(403)
    }
  });

module.exports = router