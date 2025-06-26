import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { authFetch } from '../../utils/authFetch';
import './TreeView.css';
import Header from '../../components/Header';
export default function TreeView() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    authFetch('http://localhost:4000/api/notes')
      .then(res => res.json())
      .then(setNotes)
      .catch(err => console.error('노트 로딩 실패:', err));
  }, []);

  const handleCreateNote = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
  
    const title = prompt('노트 제목을 입력하세요:', '');
    if (title === null) return;
  
    const finalTitle = title.trim() || `노트 ${notes.length + 1}`;
    const res = await authFetch('http://localhost:4000/api/notes', {
      method: 'POST',
      body: JSON.stringify({ title: finalTitle, nodes: [], edges: [] })
    });
  
    const data = await res.json();
    navigate(`/tree/${data.id}`);
  };

  return (
    <>
    <Header />
    <div className="treeview-container">
      {notes.length === 0 ? (
        <div className="no-notes">
          <p>아직 노트가 없습니다.</p>
          <button onClick={handleCreateNote}>새 노트 만들기</button>
        </div>
      ) : (
        <div className="note-list">
          {notes.map((note) => (
            <div key={note.id} className="note-card" onClick={() => navigate(`/tree/${note.id}`)}>
              <h3>{note.title}</h3>
              <p>{note.nodeCount}개의 노드</p>
            </div>
          ))}
          <button onClick={handleCreateNote}>새 노트</button>
        </div>
      )}
    </div>
    </>
  );
}
