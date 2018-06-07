import Fx from '../lib/fxJs.mjs'
import '../lib/operators.mjs'

class Observable extends Fx.FxBuilder {
  onArrival(signal) {
    this.send(signal)
  }
}

var observer = new Observable()
observer.subscribe(signal => console.log(signal))

setInterval(() => {
  observer.next({ key: Math.random(100) })
}, 1000)

function isOdd(num) {
  if (num % 2 == 0) throw new Error(`Only odd numbers, ${num} are not allowed.`)
  return num
}

function compute(stream) {
  Fx.array(stream)
    .tube(Fx.array([7, 8, 9, 10]))
    .map(v => isOdd(v))
    .map(v => v + ' is allowed.')
    .errors((err, rethrow) => console.error(err.message))
    .map(v => console.log(v))
    .complete(() => console.log('complete!'))
}

compute([1, 2, 3, 4, 5, 6])
