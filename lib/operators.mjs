import Fx from './fxJs.mjs'

Fx.addOperator('times', n => {
  class TimesNode extends Fx.FxBuilder {
    constructor(config, eventEmitter) {
      super(config, eventEmitter)
      this.n = this.config
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
      this.send(signal)
    }
  }
  return new PrintNode()
})

Fx.addOperator('map', fn => {
  class MapNode extends Fx.FxBuilder {
    constructor(config, eventEmitter) {
      super(config, eventEmitter)
      this.fn = config
    }
    onSignal(signal) {
      let out = this.fn(signal)
      this.send(out)
    }
  }
  return new MapNode(fn)
})

Fx.addOperator('errors', fn => {
  class ErrorsNode extends Fx.FxBuilder {
    constructor(config, eventEmitter) {
      super(config, eventEmitter)
      this.fn = config
    }
    onError(error) {
      this.fn(error, signal => {
        this.send(signal)
      })
    }
  }
  return new ErrorsNode(fn)
})

Fx.addOperator('complete', fn => {
  class DoneNode extends Fx.FxBuilder {
    constructor(config, eventEmitter) {
      super(config, eventEmitter)
      this.fn = config
    }
    onComplete(signal) {
      this.fn(signal)
    }
  }
  return new DoneNode(fn)
})
