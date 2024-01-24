
interface IStepButtons {
    node: Element
    value: number
}

interface ICircularSlider {
    node: HTMLDivElement
    list: HTMLUListElement | null
    _counter: number
    sides: number
    step: number
    shift: number
    items: Element[] | null
    step_buttons: IStepButtons[]

    findParts: () => void
    prepare: () => void
    listen: () => void 
}

export class Slider implements ICircularSlider {

    node: HTMLDivElement
    list: HTMLUListElement | null
    _counter: number
    sides: number
    step: number
    shift: number
    items: Element[] | null
    step_buttons: IStepButtons[]

    constructor(node: HTMLDivElement) {
      this.node = node
      this.list = null
      this._counter = 0
      this.sides = 0
      this.step = 0
      this.shift = 0
      this.items = null
      this.step_buttons = []
      
      this.findParts()
      this.prepare()
      this.listen()
    }
    
    findParts() {
      this.list = this.node.querySelector('[data-slider-list]')
      this.items = [...this.list!.children]
      this.step_buttons = [...this.node.querySelectorAll('[data-slider-step-button]')].map((button) => {
          return {
          node: button,
          //@ts-ignore
          value: !!button.dataset.sliderStepButton ? +button.dataset.sliderStepButton: 1
        }
      })
    } 
    
    prepare() {
      this.sides = this.items!.length
      this.step = 2 * Math.PI / this.sides
      this.shift = Math.PI / 2
      this.counter = 0
    }
    
    listen() {
      this.step_buttons.forEach(button => {
          button.node.addEventListener('click', () => {
          this.counter = this.counter + button.value
        })
      })
    }
    //@ts-ignore
    listenKeys(e) {
      if(e.key === 'ArrowLeft') {
        this.counter = this.counter - 1
      } else if(e.key === 'ArrowRight') {
        this.counter = this.counter + 1
      }
    }
    
    notify() {
      this.items!.forEach((item, i) => {
        const pos = (i + this.counter) * this.step + this.shift
        const cos = Math.cos(pos)
        const sin = Math.sin(pos)
        const scale = Math.max(0.8, (sin + 1) / 2)
        
        //@ts-ignore
        item.style.setProperty('--cos', cos)
        //@ts-ignore
        item.style.setProperty('--sin', sin)
        //@ts-ignore
        item.style.setProperty('--scale', scale)
      })
    }
    
    get counter() {
      return this._counter
    }
    
    set counter(new_value) {
      this._counter = new_value < 0 ? this.sides + new_value : new_value % this.sides
      this.notify()
    }
  }