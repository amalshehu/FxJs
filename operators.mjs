import Fx from './main.mjs'
const Node = Fx.Node

Fx.addOperator('times', n => {
  class TimesNode extends Fx.FxBuilder {
    constructor(options, eventemitter) {
      super(options, eventemitter)
      this.n = this.options
    }
    onArrival(signal) {
      this.send(signal * n)
    }
  }
  return new TimesNode(n)
})

Fx.addOperator('print', () => {
  class PrintNode extends Fx.FxBuilder {
    onArrival(signal) {
      console.log(signal)
      this.send(signal)
    }
  }
  return new PrintNode()
})

Fx.addOperator('map', fn => {
  class MapNode extends Fx.FxBuilder {
    constructor(options, eventemitter) {
      super(options, eventemitter)
      this.fn = options
    }
    onArrival(signal) {
      let out = this.fn(signal)
      this.send(out)
    }
  }
  return new MapNode(fn)
})
