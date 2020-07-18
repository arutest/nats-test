const crypt = require('crypto')
const nats = require('node-nats-streaming')
const myClientID = crypt.randomBytes(4).toString('hex')

console.log('mi Cliente ID --> ', myClientID)

const stan =  nats.connect('client-connect',myClientID,
{ url:'nats://localhost:4222',maxReconnectAttempts: 10, timeout:30*1000}) 


module.exports = stan