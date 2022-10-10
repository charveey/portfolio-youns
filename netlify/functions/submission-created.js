require("dotenv").config()

import fetch from 'node-fetch';
const { BUTTONDOWN_API_KEY } = process.env

exports.handler = async event => {
  const payload = JSON.parse(event.body).payload
  console.log(`Recieved a submission: ${payload.email}`)

  return fetch("https://getsendstack.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${EMAIL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: payload.email, notes: payload.name }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(`Submitted to SendStack:\n ${data}`)
    })
    .catch(error => ({ statusCode: 422, body: String(error) }))
} 
