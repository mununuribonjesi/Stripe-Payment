const express = require('express');
const router = express.Router();
const functions = require('../functionality/payments');
const security = require('../functionality/security/auth');

router.post('/payment', async function (req, res, next) {

    if(!req.headers['authorization']) return res.sendStatus(403);
  
    const auth = await security.authorization(req);

    if(auth.status==200)
    {
      functions.stripePayment(req,res)
    }
    else
    {
      return res.sendStatus(403)
    }
  });

module.exports = router