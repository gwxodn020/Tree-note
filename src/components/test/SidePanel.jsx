// import { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';

// export default function SidePanel({ node, onUpdate }) {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (node) {
//       setTitle(node.title);
//       setContent(node.content);
//       setIsEditing(false);
//     }
//   }, [node]);

//   if (!node) return <div style={{ flex: 1, padding: '2rem' }}>노드를 선택하세요</div>;

//   const handleSave = () => {
//     onUpdate(node.id, { title, content });
//     setIsEditing(false);
//   };

//   return (
//     <div
//       style={{
//         flex: 1,
//         padding: '2rem',
//         borderLeft: '1px solid #ddd',
//         backgroundColor: '#fafafa',
//         minHeight: '100vh',
//       }}
//     >
//       <h2 style={{ marginBottom: '1rem' }}>
//         {isEditing ? '노드 수정' : node.title}
//       </h2>

//       {isEditing ? (
//         <>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
//             placeholder="제목 입력"
//           />
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             style={{ width: '100%', height: '200px', padding: '0.5rem' }}
//             placeholder="Markdown 형식으로 작성"
//           />
//           <button onClick={handleSave} style={{ marginTop: '1rem' }}>
//             저장
//           </button>
//         </>
//       ) : (
//         <>
//           <ReactMarkdown>{content || '_내용 없음_'}</ReactMarkdown>
//           <button onClick={() => setIsEditing(true)} style={{ marginTop: '1rem' }}>
//             수정하기
//           </button>
//         </>
//       )}
//     </div>
//   );
// }