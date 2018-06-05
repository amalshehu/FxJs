import { Fx } from '../main.mjs'

class FxNode extends Fx {
  onPerceive(signal) {
    test('Signal should be collected by onPerceive Method', () => {
      expect(signal).toBeTruthy()
    })
    this.send(signal * 2)
  }
}

var fx = new FxNode()
fx.observe(signal => {
  test('Observer should emit propagated signal', () => {
    expect(signal).toBe(2)
  })
})

fx.next(1)

class Square extends Fx {
  onPerceive(value) {
    this.send(value ** 2)
  }
}

class Write extends Fx {
  onPerceive(value) {
    test(`Take down-stream node as arg then square and pipe: ${value} `, () => {
      expect(value).toBeTruthy()
    })
  }
}

const square = new Square()
const write = new Write()
square.tube(write)
square
  .next(5)
  .next(10)
  .next(15)
