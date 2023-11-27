import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';


const textPath="https://57uu.github.io/herui_saying_text/";
function App() {
  const [ruiSayingList,ruiSayingList_setter]=useState([]);
  const [saying,saying_setter]=useState("");
  parseText(ruiSayingList_setter);
  return (
    <div>
      {Banner()}
      {Body(ruiSayingList,saying,saying_setter)}
    </div>
  );
}
function Banner(){
  return (
  <>
    <div className="container-fluid p-5 bg-primary text-white text-center">
      <h1>锐言睿语</h1>
      <p class="  text-end">
        <a class="text-white" href="https://github.com/57UU/herui_saying" target="_blank">About</a>
      </p>
    </div>
  </>
  )
}

function Body(ruiSayingList,saying,saying_setter){
  if(ruiSayingList==[]){return(
    <>
    <div className="spinner-border text-primary"></div>
    <p>Loading</p>
    </>
  );}
  return(
    <div className="p-3 m-auto" style={{width:"60%"}}>
      <br/>
      <br/>
      <div className="input-group input-group-lg mb-3">
        <input type="text" enabled="false" className="form-control" value={saying}/>
        <span className="input-group-text">@HeRui</span>
      </div>
      <br/>
      <br/>
      <div className='d-flex justify-content-end'>
        <button type="button" className="btn btn-primary btn-lg " onClick={()=>ButtonClick(ruiSayingList,saying_setter)}>来一句</button>
      </div>
      
    </div>
  );
}
function ButtonClick(ruiSayingList,saying_setter){
  var index=Math.random()*ruiSayingList.length;
  saying_setter(ruiSayingList[Math.trunc(index)]);
}
var  isFetched=false;
async function parseText(setter){
  if(isFetched){
    return;
  }
  var text=await (await fetch(textPath)).text();
  var list=text.split('\n').filter(item => item != '');
  setter(list);
  isFetched=true;
}


export default App;
