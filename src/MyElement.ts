import { LitElement,html,css } from "lit";
import { customElement,property,state } from "lit/decorators.js";


@customElement("my-element")

export class MyElement extends LitElement
{
  constructor()
  {
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
    .list-items{
      display:grid;
      
    }
    li{
      list-style:none;
      margin-top:10px;
      padding:5px;
      margin-left:-30px;

    }
    ::slotted(input){
      height:40px;
     width:300px;
     padding-left:30px;
     outline:none;
     border:2px solid gray;
     border-radius:10px;
    }
    
   
  `;
   @property()
   load_id:any=document.getElementById("load_id");
   
    @property()
    result:any[]=[]

    @property()
    input:any=document.getElementById('inputbox');

    @state()
    minchar:any=this.input.getAttribute('minchar')

    @state()
    input1=''
    
    @property()
    arrow_list:any=this.shadowRoot?.querySelector('list-items') as HTMLElement;

    @state()
    state:boolean=true;

    @property()
    currentindex:number= 0;
    @property()
    listkey:any=[];
   

    @property({type:Array, attribute: false})
    list : object[];

    @property({type:String, attribute:false})
    listKey:string;

    @property()
    result_list=document.querySelector('.result_list');
    
    @state()
    loadmore_index:number=0;
    
    render()
    {
     
      return html `
      <slot name="input" @input=${this.handleInput}></slot>    
      <slot name="list-item" class="list-items">
     
      </slot>   
      
      <ul>
        
        ${
          
          
          this.result.map((items,i)=>{
            
            if(i<this.loadmore_index+5){
              
              return html `
            <slot name="slotcontainer">
              <li @click=${this.fillInput} >${ ( typeof items === "object" ) ?  items.suggestion : items}</li>
            </slot>
             `
            }
             else if(i === this.loadmore_index+5 ) {
            
              return html `
              
              <li @click=${this.loadmore} id="load_id">Load more... </li>
             
            ` 
            }
            
          }
        )
        }
      </ul>
     
       `
    }

    handlearrow(e:KeyboardEvent)
    {
     
     if(this.input1.length>=this.minchar){
      
      if(e.key ==='ArrowUp')
      {
        if(this.currentindex===0)
          {
            this.currentindex=(this.loadmore_index+ this.result.length % 5);
          }
          else{
            this.currentindex-=1
           
          }
          this.fillinputarrow(this.currentindex);
      }

      else if(e.key ==="ArrowDown")
        {
          if(this.currentindex>this.result.length-1)
            {
              this.currentindex=0;
            }
            else{
             
              this.currentindex+=1;
            }

            this.fillinputarrow(this.currentindex);
            
        }

        else if(e.key === 'Enter')
          {
            e.preventDefault();
            if (this.currentindex == this.loadmore_index)
              this.loadmore();
          }
         
      }

    }


    loadmore()
    {
      this.loadmore_index+=5;
      this.currentindex=this.loadmore_index;
      
    }


    handleInput(e:Event)
    {
     
     e.preventDefault();
     this.result=[]
     this.input1=this.input.value;
     
     if(this.input1.length>=this.minchar)
      {
        this.result=this.list.filter((key:any)=>{
          // return key.suggestion.toLowerCase().includes(this.input1.toLowerCase());
          this.state=true;
          for(let i=0;i<this.input1.length;i++)
            {
            if(typeof key ==="object")
            { 
            if(((key[this.listKey]).charAt(i) != this.input1.charAt(i)))
            {
              this.state=false;
            }
            }
            else if(key.charAt(i) != this.input1.charAt(i)){
              this.state=false;
            }

          }
          return this.state;
          
        })
       
        
      }
      if(this.input1.length <3)
        {
          this.loadmore_index=0;
          this.currentindex=0;
        }
    
    }

    fillInput(event:Event)
    {
      event.preventDefault()
      let temp=event.target as HTMLInputElement;
      if( this.loadmore_index !== this.loadmore_index+5 )
        {

      
          this.input.value=temp.innerText;
        }
      else
        this.loadmore.bind(this);
      
    }
    
    fillinputarrow(currentindex:number)
    {
    if( this.currentindex === this.loadmore_index+5+1)
      {
        
        this.currentindex=this.currentindex-5-1;
        
        
        
      }
   
      
   
     else if(this.currentindex !=(this.result.length)%5 -4){

      if(typeof this.result[currentindex -1] === "object")
      {

        this.input.value=this.result[currentindex-1][this.listKey];
        
      }
      else if(typeof this.result[currentindex-1] === "string") {
        this.input.value=this.result[currentindex-1];
      }
          
    }      
    }

}

//addEventListener("keydown",this.handlearrow.bind(this));