import EventEmitter from './eventEmitter.mjs'

export class FxBuilder {
  constructor(config, eventEmitter) {
    this.id = this.uuidv4()
    this.config = config
    this.observers = []
    this.emitter = eventEmitter ? eventEmitter : new EventEmitter()
  }
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
  onArrival(signal) {
    if (signal instanceof Error) {
      this.onError(signal)
    } else if (signal === FxBuilder.COMPLETE) {
      try {
        this.onComplete(signal)
      } catch (error) {
        this.send(error)
      }
    } else {
      try {
        this.onSignal(signal)
      } catch (error) {
        this.send(error)
      }
    }
    return this
  }

  send(signal) {
    this.observers.forEach(fn => fn(signal))
    setImmediate(() => this.emitter.emit(`propagated-event ${this.id}`, signal))
    return this
  }

  onComplete(signal) {
    this.send(signal)
    return this
  }

  onSignal(signal) {
    this.send(signal)
    return this
  }

  onError(error) {
    this.send(error)
    return this
  }

  next(signal) {
    setImmediate(() => this.onArrival(signal))
    return this
  }
  subscribe(observer) {
    this.observers.push(observer)
    return this
  }

  tube(node) {
    this.emitter.on(`propagated-event ${this.id}`, signal => node.next(signal))
    return node
  }
}
FxBuilder.COMPLETE = '__FX_COMPLETE__'
