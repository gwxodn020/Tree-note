// import React, { useEffect } from 'react';

// export default function ContextMenu({ position, onAddChild, onClose }) {
//   useEffect(() => {
//     const handleClickOutside = () => onClose();
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   return (
//     <div
//       style={{
//         position: 'absolute',
//         top: position.y,
//         left: position.x,
//         backgroundColor: '#fff',
//         border: '1px solid #ccc',
//         padding: '0.5rem',
//         borderRadius: '5px',
//         zIndex: 1000,
//       }}
//     >
//       <button onClick={onAddChild}>자식 노드 생성</button>
//     </div>
//   );
// }