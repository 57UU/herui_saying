import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useState } from 'react';
import {  Route,Routes,  Link,useNavigate } from 'react-router-dom';
import {Herui_saying_card} from "./herui_saying_card"


const textPath = "https://the-brotherhood-of-scu.github.io/herui_saying_text/";
var length=0;
function App() {
  const [ruiSayingList, ruiSayingList_setter] = useState([]);
  const [saying, saying_setter] = useState("人类永远不行");
  parseText(ruiSayingList_setter);
  


  return (
    <div>
      {Banner()}
      <Routes >
        <Route path="/sayings"  element={SayingDetail(ruiSayingList)} />
        <Route path="/card/:content" element={<Herui_saying_card/>} />
        <Route path="/" element={Body(ruiSayingList, saying, saying_setter)} />
      </Routes>
      {footer()}
    </div>
  );
}

function SayingDetail(ruiSayingList) {
  var sayings = ruiSayingList.map((x,index) => { return <Link to={`/card/${x.replace("\\","%5C")}`}><p>{index}:{x}</p></Link> });
  return (
    <div className="container-fluid p-4  text-center">
      <Link to="/">
        <button type="button" className="btn btn-primary btn-lg p-2" >Back</button>
      </Link>

      {sayings}
      <br />
      <br />
      <br />
      <br />
    </div>

  )
}
function Banner() {
  return (
    <>
      <div className="container-fluid p-4 bg-primary text-white text-center">
        <h1>锐评</h1>
        <p class="  text-end">
          <a class="text-white" href="https://github.com/The-Brotherhood-of-SCU/herui_saying" target="_blank">About</a>
        </p>
      </div>
    </>
  )
}
function popup(content) {
  return (
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">


          <div class="modal-header">
            <h4 class="modal-title">模态框标题</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>


          <div class="modal-body">
            模态框内容..
          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">关闭</button>
          </div>

        </div>
      </div>
    </div>
  )
}

function footer() {
  return (
    <>
      <div class="my-footer">
        <div className=" container-fluid p-4  bg-dark text-white text-center ">
          
          {hypeLink("API/Data_Source/Contribute", "https://github.com/The-Brotherhood-of-SCU/herui_saying_text")}
        </div>
      </div>
    </>
  )
}
function hypeLink(text, url) {
  return (<a href={url} className="p-2" target="_blank">{text}</a>)
}

function Body(ruiSayingList, saying, saying_setter) {
  if (ruiSayingList.length == 0) {
    return (
      <div >
        <div className="spinner-border text-primary"></div>
        <p>Loading</p>
      </div>
    );
  }
  return (
    <div className="p-3 m-auto">
      <div className="container p-5 my-5 ">
        <div className="text-center">
          <p>HR数据库当前共{length}字，{ruiSayingList.length}条</p>
        </div>
        <div className="border p-3  ">
          <p>{saying}</p>
        </div>
        <br />
        <br />
        <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-primary btn-lg p-2" onClick={() => ButtonClick(ruiSayingList, saying_setter)}>来一句</button>
        </div>
        <div className='d-flex justify-content-end p-4'>
          <Link to="/sayings">
            <button type="button" className="btn btn-primary btn-lg p-2" >查看全部</button>
          </Link>

        </div>

      </div>



    </div>
  );
}
function ButtonClick(ruiSayingList, saying_setter) {
  var index = Math.random() * ruiSayingList.length;
  saying_setter(ruiSayingList[Math.trunc(index)]);
}




var isFetched = false;
async function parseText(setter) {
  if (isFetched) {
    return;
  }
  var text = await (await fetch(textPath)).text();
  length=text.length;
  var list = text.split('\n').filter(item => item != '');
  setter(list);
  isFetched = true;
}


export default App;
