import './Home.css';
import Header from '../../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="wrapwper">
          <div className="hero">
            <h1 className="hero-title">
              트리노트
            </h1>
            <p className="hero-text">
              아이디어를 트리 구조로 깔끔하게 정리하세요
            </p>
            <button className="start-button" onClick={() => window.location.href = '/mytree'}>
              시작하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}