import { FxBuilder } from './main.mjs'

export class ArrayStream extends FxBuilder {
  constructor(options, eventemitter) {
    super(options, eventemitter)
    this.stream = options
    this.stream.forEach(val => this.send(val))
    this.send(FxBuilder.COMPLETE)
  }
}
export default {
  FxBuilder,
  addOperator: (name, operator) => {
    FxBuilder.prototype[name] = function fn(...args) {
      return this.tube(operator(...args))
    }
  },
  array: array => new ArrayStream(array)
}
