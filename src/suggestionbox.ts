import { LitElement,html,css } from "lit";
import { customElement,property,state } from "lit/decorators.js";

@customElement("aalam-sgn-box")
export class AalamSuggestionBoxElement extends LitElement {
    constructor() {
        super();
        this.input.addEventListener("keydown",this.handlearrow.bind(this));
    }
    static styles = css`
    :host {
      display: grid;
      justify-content:center;
      align-items:center; 
      margin:50px;  
    }
    li{
      list-style:none;
      cursor: pointer;
      padding:15px;
      margin-top:-20px;
      margin-left:-10px;
    }
    ::slotted(input)
    {
      width:320px;
      height:30px;
      border-radius:10px;
      border:1.5px solid gray;
      outline:none;
      padding:5px;
      font-size:15px;
      box-shadow: 2px 2px 3px #c4c3c3;
      border: 2px solid #c4c4c4;
    }
    
  `;

    @property()
    countheight:number = 0;

    @property()
    result:any[] = []

    @property()
    input:any = document.getElementById('inputbox');

    @state()
    minchar:any = this.input.getAttribute('minchar')

    @state()
    state:boolean = true;

    @property()
    currentindex:number = 0;

    @property()
    listkey:any = [];

    @property({type:Array, attribute: false})
    list : object[];

    @property({type:String, attribute:false})
    listKey:string;

    @state()
    loadmore_index:number = 0;

    @state()
    empty_sgn:boolean=false;

    render() {
      return html `
      <div style="position:relative">
      <div part="sgn-input">
          <slot name="sgn-input" ><input @input=${this.unslottedInputEvent}/></slot>
      </div>
      <template>
         <slot name="sgn-item"></slot>
      </template>
      <div part="sgn-container">
          <div style="display:${this.show_empty?'block':'none'}"><slot name="sgn-empty"></slot></div>
          <div style="display:${!this.show_empty?'block':'none'}">
              <slot name="__private-item"></slot>
              ${this.has_more?html`<div part="sgn-load-more" @click=${this.loadMore}>Load More</div>`:''}
          </div>
       </div>`;
      
    }
    handlearrow(e:KeyboardEvent){
     if(this.input.value.length >= this.minchar) {
      if (e.key === 'ArrowUp') {
        if(this.currentindex === 0) {
            this.currentindex = (this.loadmore_index+ 5 );
        }
        else {
            this.currentindex -= 1;
        }
        this.fillinputarrow(this.currentindex);
      }
      else if(e.key === "ArrowDown") {
          if(this.currentindex > this.result.length - 1) {
              this.currentindex = 0;
            }
            else {
              this.currentindex += 1;
            }
            this.fillinputarrow(this.currentindex);
        }
        else if(e.key === 'Enter') {
            e.preventDefault();
            if (this.currentindex == this.loadmore_index)
              this.appendsuggestion();
          }
      }
    }
    appendsuggestion() {
        this.loadmore_index += 5;
        this.currentindex = this.loadmore_index;
        this.countheight++;
    }
    handleInput(e:Event) {
        e.preventDefault();
        this.empty_sgn=true;
        this.result = [];
        if(this.input.value.length >= this.minchar) {
            this.result = this.list.filter((key:any) => {
            this.state = true;
            for(let i = 0;i < this.input.value.length; i++) {
                if(typeof key === "object") { 
                    if(((key[this.listKey]).charAt(i).toLowerCase() != this.input.value.charAt(i).toLowerCase())) {
                        this.state = false;
                       }
                 }
                else if(key.charAt(i).toLowerCase() != this.input.value.charAt(i).toLowerCase()) {
                    this.state = false;
                 }
            }
            return this.state;
         })
       }
       if(this.input.value.length < 3) {
           this.loadmore_index = 0;
           this.currentindex = 0;
       }
       if(this.input.value.length ===0 )
        {
          this.result=[];
          this.empty_sgn=false;
        }
    }
    fillInput(event:Event) {
        event.preventDefault()
        let temp = event.target as HTMLInputElement;
        if ( this.loadmore_index !== this.loadmore_index + 5 ) {
            this.input.value = temp.innerText;
         }
        else {
            this.appendsuggestion.bind(this);
        }
    }
    fillinputarrow(currentindex:number) {
        if( this.currentindex === this.loadmore_index + 5 + 1 ) {
            this.currentindex = this.currentindex -5 -1;
        }
        else if( this.currentindex !=( this.result.length ) % 5 - 4 ) {
            if( typeof this.result[ currentindex -1 ] === "object" ) {
                this.input.value = this.result[ currentindex - 1 ][ this.listKey ];
             }
            else if( typeof this.result[ currentindex-1 ] === "string" ) {
                this.input.value = this.result[ currentindex - 1 ];
             }
         }
       }
    }