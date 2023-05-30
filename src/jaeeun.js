import './jaeeun.css';
import React from 'react';
import { useState } from 'react';

function Nav(navprops) {
  const lis = []
  for (let i = 0; i < navprops.ntopics.length; i++) {
    let t = navprops.ntopics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
        navprops.onChangeMode(Number(event.target.id));
      }}>{t.title}</a></li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(artiprops) {
  return <article>
    <h2>{artiprops.title}</h2>
    {artiprops.body}
  </article>
}
function Header(headerprops) {
  return <header>
    <h1><a href="/" onClick={(event) => {
      event.preventDefault();
      headerprops.onChangeMode();
    }}>{headerprops.title}</a></h1>
  </header>
}
function Create(createprops) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const creatTitle = event.target.inputtitle.value;
      const creatBody = event.target.inputbody.value;
      createprops.onCreate(creatTitle, creatBody); //함수호출
    }}>
      <p><input type="text" name="inputtitle" placeholder='title' /></p>
      <p><textarea name="inputbody" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}
function Update(updateprops) {
  const [upuptitle,setTitle]=useState(updateprops.title);
  const [upupbody,setBody]=useState(updateprops.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const upTitle = event.target.inputtitle.value;
      const upBody = event.target.inputbody.value;
      updateprops.onUpdate(upTitle, upBody); //함수호출
    }}>
      <p><input type="text" name="inputtitle" value={upuptitle} onChange={event=>{
        setTitle(event.target.value); //리액트에서 onChange는 값이 변경 될 때 마다
      }}/></p>
      <p><textarea name="inputbody" value={upupbody} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
}
function App() {
  /*const _mode=useState('WELCOME') //상태를 만들어서 _mode에 리턴
  //useState의 인자 : 초기값
  //useState - 상태의 값을 읽을 때 쓰는 데이터 / 변경할 때 사용하는 함수
  const mode=_mode[0] // 상태의 값을 읽을 수 있다
  const setMode=_mode[1] // setMode를 통해서 값을 바꿀 수 있다
  */
  const [mode, setMode] = useState('WELCOME'); //위에 내용 축약형
  const [useId, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([ //객체에 담기
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ])
  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title="welcome" body="Hello,Web"></Article>
  } else if (mode === 'READ') {
    let artTitle, artBody = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === useId) {
        artTitle = topics[i].title;
        artBody = topics[i].body;
      }
    }
    content = <Article title={artTitle} body={artBody}></Article>
    contextControl = <li><a href={'/update/' + topics.id} onClick={event => {
      event.preventDefault();
      setMode('UPDATE'); //클릭하면 UPDATE로 이동
    }}>Update</a>
    </li> // update는 read일때만 보이게
  }//content변수?
  else if (mode === 'CREATE') {
    content = <Create onCreate={(creTitle, creBody) => {
      const newTopic = { id: nextId, title: creTitle, body: creBody }
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics)
      setMode('READ')
      setId(nextId);
      setNextId(nextId + 1)
    }}></Create>
  } else if (mode === 'UPDATE') {
    let upTitle, upBody = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === useId) {
        upTitle = topics[i].title;
        upBody = topics[i].body;
      }
    }
    content = <Update title={upTitle} body={upBody} onUpdate={(upTitle, upBody) => {
      const newTopics=[...topics]
      const updatedTopic={id:useId, title:upTitle, body:upBody}
      for(let i=0; i<newTopics.length;i++){
        if(newTopics[i].id===useId){
          newTopics[i]=updatedTopic;
          break;
        }
      }
      setTopics(newTopics)
    }}></Update>
  }
  return (
   <body> 
    <div id="all">
      <div id="top">
        <div id="topLeft">
          <div id="avatar"></div>
          <div id="topFont">
            <div id="instarId">jeng_ni</div>
            <div id="dot">•</div>
            <div id="day">1일</div>
          </div> 
        </div>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav ntopics={topics} onChangeMode={(navid) => {
        setMode('READ');
        setId(navid)
      }}></Nav>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={event => {
            event.preventDefault();
            setMode('CREATE');
          }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  </body>
  );
}

export default App;