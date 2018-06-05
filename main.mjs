import EventEmitter from 'eventemitter3'
import uuid from 'uuid'

export class FxBuilder {
  constructor(config, eventEmitter) {
    this.id = uuid.v1()
    this.config = config
    this.observers = []
    this.emitter = eventEmitter ? eventEmitter : new EventEmitter()
  }
  onPerceive(signal) {
    return this
  }

  next(signal) {
    setImmediate(() => {
      this.onPerceive(signal)
    })
    return this
  }

  send(signal) {
    this.observers.forEach(fn => fn(signal))
    setImmediate(() => {
      this.emitter.emit(`propagated-event ${this.id}`, signal)
    })
    return this
  }

  observe(observer) {
    this.observers.push(observer)
    return this
  }

  tube(node) {
    this.emitter.on(`propagated-event ${this.id}`, signal => {
      node.next(signal)
    })
    return node
  }
}

export class ArrayStream extends FxBuilder {
  constructor(options, eventemitter) {
    super(options, eventemitter)
    this.stream = options
    this.stream.forEach(val => this.send(val))
  }
}
export default {
  FxBuilder,
  array: array => {
    return new ArrayStream(array)
  }
}
