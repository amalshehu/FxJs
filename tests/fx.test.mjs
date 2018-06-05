import { Fx } from '../main.mjs'

class FxNode extends Fx {
  onCOllect(signal) {
    test('Signal should be collected by onCOllect Method', () => {
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

fx.push(1)
