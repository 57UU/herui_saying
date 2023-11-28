import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { useState } from 'react';


const textPath = "https://57uu.github.io/herui_saying_text/";
function App() {
  const [ruiSayingList, ruiSayingList_setter] = useState([]);
  const [saying, saying_setter] = useState("人类永远不行");
  const [pageIndex, pageIndexSetter] = useState(0);
  parseText(ruiSayingList_setter);
  return (
    <div>
      {Banner()}
      {getPage(pageIndex, pageIndexSetter, ruiSayingList, saying, saying_setter)}
      {footer()}
    </div>
  );
}
function getPage(index, pageIndexSetter, ruiSayingList, saying, saying_setter) {
  if (index == 0) {
    return Body(ruiSayingList, saying, saying_setter, pageIndexSetter);
  } else if (index == 1) {
    return SayingDetail(ruiSayingList, pageIndexSetter)

  }
}
function SayingDetail(ruiSayingList, pageIndexSetter) {
  var sayings=ruiSayingList.map((x)=>{return <p>{x}</p>});
  return (
    <div className="container-fluid p-4  text-center">
    <button type="button" className="btn btn-primary btn-lg p-2" onClick={() => pageIndexSetter(0)}>Back</button>
    {sayings}
    </div>
  )
}
function Banner() {
  return (
    <>
      <div className="container-fluid p-4 bg-primary text-white text-center">
        <h1>锐言睿语</h1>
        <p class="  text-end">
          <a class="text-white" href="https://github.com/57UU/herui_saying" target="_blank">About</a>
        </p>
      </div>
    </>
  )
}
function popup() {
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
          {hypeLink("API", "https://github.com/57UU/herui_saying_text/tree/main/API")}
          {hypeLink("Data_Source/Contribute", "https://github.com/57UU/herui_saying_text")}
        </div>
      </div>
    </>
  )
}
function hypeLink(text, url) {
  return (<a href={url} className="p-2" target="_blank">{text}</a>)
}

function Body(ruiSayingList, saying, saying_setter, pageIndexSetter) {
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
        <div className="border p-3  ">
          <p>{saying}</p>
        </div>
        <br />
        <br />
        <div className='d-flex justify-content-end'>
          <button type="button" className="btn btn-primary btn-lg p-2" onClick={() => ButtonClick(ruiSayingList, saying_setter)}>来一句</button>
        </div>
        <div className='d-flex justify-content-end p-4'>
          <button type="button" className="btn btn-primary btn-lg p-2" onClick={() => pageIndexSetter(1)}>查看全部</button>
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
  var list = text.split('\n').filter(item => item != '');
  setter(list);
  isFetched = true;
}


export default App;
