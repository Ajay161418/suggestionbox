import { LitElement, html,css } from 'lit';
import { customElement ,property ,state } from 'lit/decorators.js';
import { queryAssignedElements } from 'lit/decorators.js';
String.prototype.formatUnicorn =  function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
             Array.prototype.slice.call(arguments)
             : arguments[0];
             for (key in args) {
                 str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
             }
    }

    return str;
};

@customElement('aalam-sgn-box')
export class SuggestionBox extends LitElement {
  static styles = css`
`;
    @property()
    slot_input = null;

    @property()
    _private_slot_el:boolean = false;

    @property()
    _loadmore_item_el:boolean = false;

    @property()
    templatehtml:any;

    @queryAssignedElements({slot: 'sgn-item-template'})
    template_slots: Array<HTMLElement>;

    @queryAssignedElements({slot: '__private-item'})
    private_items: Array<HTMLElement>;

    @queryAssignedElements({slot: ' __loadmore-item'})
    loadmore_items: Array<HTMLElement>;

    @state()
    has_more:boolean;

    @state()
    index:number = -1;

    @property()
    size:number = 0;

    @state()
    show_empty:boolean = true;

    @state()
    result:Object[];

    @property()
    highlight:string;

    private input_el:HTMLElement | null;

    private input_temp:HTMLElement | null;

    render() {
      return html `
      <div style = "position:relative">
      <div part = "sgn-input" class = "inputbox" >
          <slot name = "sgn-input"  @keydown = ${this.unslottedInputEvent}><input  /></slot>
      </div>
      <template></template>
         <slot name = "sgn-item-template" style = "display:none"></slot>
      <div part = "sgn-container">
          <div style = "display:${this.show_empty?'block':'none'}" part = "sgn-empty"><slot name = "sgn-empty"></slot></div>
          <div  style = "display:${!this.show_empty?'block':'none'}">
              <div part = "active">
              <slot  name = "__private-item" @click = ${this.saveInput}></slot>
              </div>
              <slot name = "__loadmore-item" @click = ${this.loadmoreentry}></slot>
          </div>
       </div>
      `
    }
    saveInput(event) {
        let el = event.target;
        while (true) {
            if (el.slot == "__private-item")break;
            el = el.parentElement;
      }
      this.input_el.value =this.result[this.private_items.indexOf(el)].name;
    }

    unslottedInputEvent(e) {
        if (!this.input_el) {
            this.input_el = e.target;
      }
      const resultLength = this.result.length;
      switch (e.key) {
        case "ArrowUp":
          if (this.index === -1) {
            this.index = resultLength; 
          } else if (this.index === resultLength) {
            this.index = resultLength - 1; 
          } else {
            this.index = (this.index - 1 + resultLength) % resultLength; 
          }
          break;
        case "ArrowDown":
          if (this.index === -1 || (this.has_more && this.index === resultLength)) {
            this.index = 0; 
          } else {
            this.index = (this.index + 1) % (resultLength + (this.has_more ? 1 : 0)); 
          }
          break;
        case "Enter":
          if (this.index === resultLength) {
            this.loadmoreentry();
          }
          break;
      }
      this.setInputValue(); 
    }
    setInputValue() {
        const resultLength = this.result.length;
        for (let el of this.private_items) {
            el.classList.remove('active');
        }
        for (let el of this.loadmore_items) {
            el.classList.remove('active');
        }
      if (this.index >= 0 && this.index < resultLength) {
            const selectedItem = this.private_items[this.index];
            selectedItem.classList.add('active'); 
            this.input_el.value = this.result[this.index].name;
      } else if (this.index === resultLength) {
            const loadMoreItem = this.loadmore_items[0];
            loadMoreItem.classList.add('active'); 
            this.input_el.value = "";
      } else {
        this.input_el.value = "";
      }
    }

    setSuggestion(suggestions:Object[] , highlight?:string , has_more?:boolean) {
        this.result = [...suggestions];
        this.index = this.index;
        this.input_temp = this.input_el.value;
        console.log(this.input_temp)
        this.input_temp? this.show_empty = false : this.show_empty = true;
        this.has_more = has_more;
        if(this._private_slot_el) {
            for (let el of this.private_items)
            el.remove();
        }
        this.size = suggestions.length;
        for (let i of suggestions) {
            let tmp = this.template_slots[0].innerHTML;
            let temp = tmp.formatUnicorn(i);
            let el = document.createElement("div");
            el.slot = "__private-item";
            el.innerHTML = temp;
            this.appendChild(el);
            this._private_slot_el = true;
      }
      if(this._loadmore_item_el) {
            for(let el of this.loadmore_items)
                el.remove();
      }
      if(has_more) {
            let loadmore = document.createElement("div");
            loadmore.slot = "__loadmore-item";
            loadmore.innerHTML = "<div>loadmore</div>"
            this.appendChild(loadmore)
            this._loadmore_item_el = true;
      }
    }

    loadmoreentry() {
        console.log("loading more entry")
        const loadmore = new CustomEvent("loadmore",{
        bubbles:true,
      });
        this.dispatchEvent(loadmore);
    }
    appendSuggestion(suggestions:Object[], highlight:string, has_more:boolean) {
      this.result = [...this.result];
      this.result.push(suggestions);
      this.result = this.result.flat(Infinity)
      console.log(this.result.length)
      this.size = this.size + suggestions.length;
      this.has_more = has_more;
      console.log("Appendsuggestion - ", this.has_more);
      if (!this.has_more && this.loadmore_items.length) {
            this.loadmore_items[0].remove();
      }
      for(let i of suggestions) {
            let tmp = this.template_slots[0].innerHTML;
            let temp=tmp.formatUnicorn(i);
            let el = document.createElement("div")
            el.slot = "__private-item";
            el.innerHTML = temp;
            this.appendChild(el);
    }
  }
}
