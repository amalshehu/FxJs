// import Fx from '../lib/fxJs.mjs'
// import '../lib/operators.mjs'

// export class Observable extends Fx.FxBuilder {
//   onArrival(signal) {
//     this.send(signal)
//   }
// }
// var observer = new Observable()
// observer.subscribe(signal => {
//   console.log(signal)
// })

// let x = observer

// x.subscribe(signal => {
//   console.log('x', signal)
// })
// setInterval(() => {
//   observer.next({ key: Math.random(100) })
// }, 1000)

// import http from 'http'

// const server = http.createServer((req, res) => {
//   console.log('http request')
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/html')

//   res.end('<h1>Hello World</h1>')
// })
// server.listen(3000, '127.0.0.1', () => {
//   setTimeout(() => {
//     console.log('time out')
//   }, 1e5)
// })
