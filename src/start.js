'use-strict'

const stan = require('./util/nats') // ARU
const gt = require('./util/getTimes')  // ARU
const nameQueue = 'orionX'
const objMsg = { id:'uiyrtuertiue', name:'datos', valor:75856.78 }
// const mymsg = '(ARU)' + JSON.stringify(objMsg) + '//' + gt.getDates()+ '//' + gt.getTimes()
const mymsg = `(ARU)  ${JSON.stringify(objMsg)}//${gt.getDates()}//${gt.getTimes()}`

stan.on('connect',() => {
  console.log('Conectado a Nats')
//   for(var i=1;i<=5;i++){ 
//     stan.publish(nameQueue, mymsg + '//' + i, (err,guid) => {
//       if (err) {
//         console.log('Falló la publicacion')
//       } else {
//         console.log('Publicado exitosamente en ', guid, 'cola : ', nameQueue)
//       }
//   })
// } // for
// Subscriber can specify how many existing messages to get.
const opts = stan.subscriptionOptions().setStartWithLastReceived()
const subscription = stan.subscribe(nameQueue, opts)

subscription.on('message', (msg) => {
  console.log('Received a message [' + msg.getSequence() + '] ' + msg.getData() + ' desde cola ' + nameQueue)
})

// mymsg2 = `(ARU) OTRO MENSAJE//${gt.getDates()}//${gt.getTimes()}`
// setTimeout(() =>{ 
//   stan.publish(nameQueue, mymsg2 + '//***fuera****',  (err,guid) => {
//   if (err) {
//     console.log('Falló la publicacion *****')
//   } else {
//     console.log('Publicado exitosamente en ***** ', guid, 'msg =', mymsg , ' ***** cola : ', nameQueue)
//   }
// })
// }
// ,5*1000)

// After 3 second, unsubscribe, when that is done, close the connection
setTimeout(() => {
  subscription.unsubscribe()
  subscription.on('unsubscribed', () => {
    console.log('Unsubcribe y cerrando la cola')
    stan.close()
  })
}, 45 * 1000)
})

// setInterval(() => { 
//   console.log('Aru ---> ...', inter) 
 
// },3*1000)

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())

stan.on('close',() => {
  console.log('Conexion a NATS cerrada')
  process.exit()
})
  // new TickeCreatedListener(stan).listen()


