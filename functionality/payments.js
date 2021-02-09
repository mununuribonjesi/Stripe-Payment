
require('dotenv').config();
const Stripe = require('stripe');
const axios = require('axios');
const { response } = require('express');

const stripe = new Stripe(process.env.SECRET_KEY);

async function stripePayment(req, res) {
  const { token, total, name, startTime, endTime, date, skill } = req.body;

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const authtoken = bearerToken[1];
  const url = "http://localhost:5000/api/findappointments";

  console.log('im in')

  var exists;

  await axios({
    method: 'get',
    url: 'http://localhost:5000/api/findappointments',
    params: {
      'name': name,
      'startTime': startTime,
      'endTime': endTime,
      'date': date,
      'skill': skill
    },
    headers: {
      'Authorization': `Bearer ${authtoken}`
    }
  }).then(response => {

    exists = response;

  }).catch(error => {

    exists = error.response;

  })


  if (exists.status == 200) {

    stripe.charges.create({
      amount: total,
      currency: 'gbp',
      source: token,
      description: skill,
    }).then(async function () {
      await axios({
        url: "http://localhost:5000/api/appointment",
        method: 'Post',
        data: {
          'name': name,
          'startTime': startTime,
          'endTime': endTime,
          'date': date,
          'skill': skill
        },
        headers: {
          'Authorization': `Bearer ${authtoken}`
        }
      })

      res.status(200).send({ message: 'Payment Successfull' });

    }).catch(error => {

      console.log(error);

      res.status(500).send({ message: error.code })

    })

  }
  else {
    return res.status(500).send({ message: 'unable to create appointment you have not been charged' })
  }

}

module.exports = {
  stripePayment
}