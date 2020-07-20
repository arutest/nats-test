'use-strict'

const stan = require('./util/nats') // ARU
const gt = require('./util/getTimes')  // ARU

const nameQueue = 'orionX'
const objMsg = { id:'uiyrtuertiue', name:'datos', valor:75856.78 }
const mymsg = `(ARU)  ${JSON.stringify(objMsg)}//${gt.getDates()}//${gt.getTimes()}`

stan.on('connect',() => {
  console.log('Conectado a Nats')

// Subscriber can specify how many existing messages to get.
const opts = stan.subscriptionOptions().setStartWithLastReceived()
const subscription = stan.subscribe(nameQueue, opts)

subscription.on('message', (msg) => {
  console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData() + ' desde cola ' + nameQueue)
})

// After 3 second, unsubscribe, when that is done, close the connection
setTimeout(() => {
  subscription.unsubscribe()
  subscription.on('unsubscribed', () => {
    console.log('Unsubcribe y cerrando la cola')
    stan.close()
  })
}, 45 * 1000)
})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())

stan.on('close',() => {
  console.log('Conexion a NATS cerrada')
  process.exit()
})
  // new TickeCreatedListener(stan).listen()


