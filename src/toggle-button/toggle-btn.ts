import { LitElement, html, css } from 'lit-element';
import { property, customElement } from 'lit/decorators.js'

@customElement('aalam-tgl-btn')
export class ToggleButton extends LitElement {
  @property({ type: Boolean }) toggled = false;
    tlgbefore:string=''
    tlgafter:string=''

    
  static get styles() {
    return css`
      button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        outline: none;
        background-color: #007bff;
        color: white;
        position: relative;
        border-radius:100px;
        transition: background-color 0.3s;
      }

      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        border-radius:50%;
        background-color: #f8f9fa;
        transition: transform 0.3s;
      }

      button.toggled {
        background-color: yellow;

      }

      button.toggled::before {
        transform: translateX(100%);
        background-color:#000;
      }
    `;
  }

  handleClick() {
    this.toggled = !this.toggled;
  }

  render() {
    return html`
      <button class="${this.toggled ? 'toggled' : ''}" @click="${this.handleClick}">
        ${this.toggled ? '' : ''}
      </button>
    `;
  }
}
