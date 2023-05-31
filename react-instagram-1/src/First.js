import logo from './logo.svg';
import './First.css';

function App() {
  return (
    <div class="body">
      <div class="create">
        <div class="crate-top">
          <p>새 게시물 만들기</p>
        </div>
        <div class="create-middle">
          <div class="create-middle-menu">
            <div><i class="fa-solid fa-image"></i></div>
            <div>사진과 동영상을 여기에 끌어다 놓으세요</div>
            <div><button>컴퓨터에서 선택</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
