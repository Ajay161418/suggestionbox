export async function handleInput(el) {
    let resp = await fetch("https://reqres.in/api/users?page=2");
    let data=[{
      suggestion:"Hello"
    },
    {
      suggestion:"hai"
    },
    {
      suggestion:"String"
    },
  ]

    el.setSuggestion(data, data.length > 15?true:false);
  
}

export async function loadMoreEntries(el) {
  let resp = await fetch("from/server/more/entries");
  let data =[
    {
      data:"Aalam"
    },
    {
      data:"product based company"
    },
    {
      data:"Happy to work"
    },
  ]

  el.appendSuggesion(data, data.length > 15?true:false);
}

let el = document.getElementById('sgnbox')
    el.listKey = 'suggestion';
    el.list = [
      {id:1, suggestion:"smart-phone", image:""},
      {
        id:2,
        suggestion:"smart-home",
        image:""
      },
      {
        id:3,
        suggestion:"Smartphone",
      },
      {
        suggestion:"Laptop"
      },
      {
        suggestion:"Tablet"
      },
      {
        suggestion:"Smartwatch"
      },
      {
        suggestion:"Headphones"
      },{
        suggestion:"Smart TV"
      },{
        suggestion:"Router"
      },{
        suggestion:"Fitness Tracker"
      },
      {
        suggestion:"Television"
      },
      {
        suggestion:"Tractor"
      },
      {
        suggestion:"Traders"
      },
      {
        suggestion:"Tlex"
      },{
        suggestion:"Travis head"
      },
      {
        suggestion:"Terrioritt"
      },
      {
        suggestion:"Telescope"
      },
      {
        suggestion:"Tree"
      } 
      ,{
        suggestion:"Telephoto"
      },
      {
        suggestion:"Target"
      },
     
    ]