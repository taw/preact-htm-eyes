import { Component } from "preact";
import { html } from "htm/preact";

export default class Eye extends Component {
  render() {
    let {x,y,color,sz,mx,my} = this.props;

    let max_eye_movement = 0.3 * sz;

    let dx = mx !== null ? mx - x : 0;
    let dy = my !== null ? my - y : 0;
    let dl = Math.max(0.000001, Math.sqrt(dx * dx + dy * dy));
    let displacement = Math.min(max_eye_movement, dl);
    let rx = x + (dx / dl) * displacement;
    let ry = y + (dy / dl) * displacement;
    let style = `fill: ${color}`;

    return (
      html`
        <g>
          <circle class="eye1" cx=${x} cy=${y} r=${sz} />
          <circle
            class="eye2"
            cx=${rx}
            cy=${ry}
            style=${style}
            r=${sz * 0.5}
          />
          <circle class="eye3" cx=${rx} cy=${ry} r=${sz * 0.2} />
        </g>
      `
    );
  }
}
