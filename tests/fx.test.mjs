import Fx from '../lib/fxJs.mjs'
import '../lib/operators.mjs'

class Observable extends Fx.FxBuilder {
  onArrival(signal) {
    this.send(signal)
  }
}

var observer = new Observable()
observer.subscribe(signal => console.log('Source signal', signal))

setInterval(() => {
  observer.next({ key: Math.random(100) })
}, 100)
