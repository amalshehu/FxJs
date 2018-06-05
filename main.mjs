import EventEmitter from 'eventemitter3'
import uuid from 'uuid'

export class Fx {
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
    this.onPerceive(signal)
    return this
  }

  send(signal) {
    this.observers.forEach(fn => fn(signal))
    this.emitter.emit(`propagated-event ${this.id}`, signal)
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
