import Fx from '../main.mjs'

class Square extends Fx.FxBuilder {
  onPerceive(value) {
    this.send(value ** 2)
  }
}

class Write extends Fx.FxBuilder {
  onPerceive(value) {
    // test(`Take down-stream node as arg then square and pipe: ${value} `, () => {
    //   expect(value).toBeTruthy()
    // })
    console.log(value)
  }
}

const square = new Square()
const write = new Write()

Fx.array([1, 2, 3])
  .tube(square)
  .tube(write)
