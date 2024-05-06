import { LitElement,html,css } from "lit";
import { customElement,property,state } from "lit/decorators.js";


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
                  console.log("formatUnicorn - key ", key, ", str ", str)
              }
          }

          return str;
        };

@customElement("aalam-sgn-box")
export class AalamSuggestionBoxElement extends LitElement {

    @property({type : Array , attribute: false})
    result: object;
   
    @property()
    index_value:number=0;

    @property()
    el:any;

    @property({ type: Object }) 
    jsonData;

    @property()
    template:any;

    @state()
    _item_template_html:any;
    
    @property()
    _slot_input=null;

    @property()
    _el=null;

    constructor()
    {
        super();
        this.attachShadow({mode:"open"})
        this.shadowRoot?.addEventListener("slotchange" , (e) => this.slotchanged(e))
        //this.attachShadow({mode:"open"});
       
        //this.shadowRoot?.addEventListener("slotchange" ,(e) => this.slotChangedCallback(e))
        
    }

    slotchanged(e)
    {
        console.log(e.target.name)
       if(e.target.name == "sgn-input"){
            this._slot_input=e.target;
            console.log(this._slot_input);  
       }
    }

    render()
    {
        //this.templateitem= this.el.text;
        // console.log(this.templateitem.formatUnicorn(this.result))


        return html `
        <slot name="sgn-input"></slot>
        <slot name="sgn-item" ></slot>
        <slot name="sgn-empty"></slot>
        
        
        <!-- <slot name="__private-item"></slot> -->
        `
    }

    setSuggestion(suggestions:object[] ,suggestion?:string, highlight?:string , hasmore?:boolean) {
        this.result;
        // this.index_value=0;
        // suggestions.map((data)=>{
        //     this.result[this.index_value]=data[suggestion]
            
        //     this.index_value += 1;
        // })
        // console.log(this.index_value, " from setsuggestion")
        // console.log(this.result)
        // this.result=suggestions;
        // for (let suggestion of suggestions) {
        //     let fmt = this._item_template_html.formatUnicorn(suggestion);
        //     let el = document.createElement("div");
        //     el.innerHTML = fmt;
        //     el.slot = "__private-item";
        //     this.appendChild(el);
        // }
        
    }
    appendSuggestion(suggestions:object[],suggestion:string,highlight?:string, hasMore?:boolean) {
        // this.result=[...this.result];
        // suggestions.map((data)=>{
        //     this.result[this.index_value]=data[suggestion];
        //     this.index_value +=1;
        // })
        // console.log(this.index_value, " from appendsuggestion", this.result)
    }
}

