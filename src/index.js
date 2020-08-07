import './style';
import { Component, createRef } from 'preact';
import Eye from "./eye";
import { html } from "htm/preact";

export default class App extends Component {
	ref = createRef();

  constructor(props) {
		super(props)
		this.state = {
			eyes: [],
			mx: 0,
			my: 0,
		}
	}

	componentDidMount() {
		// init it to something random if mouse starts outside window
		let ww = window.innerWidth;
    let wh = window.innerHeight;
		let mx = Math.random() * ww;
		let my = Math.random() * wh;

		this.setState({
			eyes: this.createEyes(),
			mx,
			my,
		})
	}

	createEyes() {
		let eyes = [];
	  [...Array.from({ length: 1000 })].forEach(_ => {
			let newEye = this.randomEye();
  	  if (this.canPlaceEye(eyes, newEye)) {
      	eyes.push(newEye)
    	}
		})
		return eyes;
	}

	randomEye() {
		let ww = window.innerWidth;
		let wh = window.innerHeight;
    let sz = 20 + Math.random() * 60;
    let x = sz + Math.random() * (ww - 2 * sz);
    let y = sz + Math.random() * (wh - 2 * sz);
    let color = this.randomColor();
    return { x, y, sz, color };
	}

  randomColor() {
    let h = Math.random() * 360
    let s = Math.round(50 + Math.random() * 50)
    let l = Math.round(30 + Math.random() * 40)
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  eyeDistance(eye1, eye2) {
    let dx = eye1.x - eye2.x;
    let dy = eye1.y - eye2.y;
    return Math.sqrt((dx * dx) + (dy * dy))
  }

  canPlaceEye(eyes, newEye) {
    return eyes.every(eye =>
      this.eyeDistance(eye, newEye) >= eye.sz + newEye.sz + 5
    )
  }

 onmousemove = (event) => {
    let svg = this.ref.current
    let rect = svg.getBoundingClientRect()
    this.setState({
			mx: event.pageX - rect.x,
			my: event.pageY - rect.y,
		});
  }

	render() {
		let {eyes,mx,my} = this.state;

		return (
			html`
				<svg id="eyes" ref=${this.ref} onmousemove=${this.onmousemove}>
					${
						eyes.map(({ x, y, sz, color }) => (
							html`
								<${Eye} x=${x} y=${y} sz=${sz} color=${color} mx=${mx} my=${my} />
							`
						))
					}
				</svg>
			`
    );
	}
}
