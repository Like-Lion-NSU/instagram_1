import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div class="body">
            <div class="create">
                <div class="crate-top">
                    <i class="fa-solid fa-arrow-left"></i>
                    <p>새 게시물 만들기</p>
                    <button>공유하기</button>
                </div>
                <div class="create-middle">
                    <div class="create-middle-img"></div>
                    <div class="crate-middle-input">
                        <div class="create-middle-profil">
                            <div class="create-middle-profil-img"></div>
                            <div class="create-middle-profil-name"></div>
                        </div>
                        <div class="create-middle-write">
                            <textarea placeholder="문구 입력..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default App;
