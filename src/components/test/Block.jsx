// import React, { useState } from 'react';
// import ContextMenu from './ContextMenu';

// export default function Block({ block, addChildBlock, onSelect }) {
//   const [showMenu, setShowMenu] = useState(false);
//   const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

//   const handleRightClick = (e) => {
//     e.preventDefault();
//     setMenuPos({ x: e.pageX, y: e.pageY });
//     setShowMenu(true);
//   };

//   const handleClick = () => {
//     onSelect();
//   };

//   return (
//     <div
//       onClick={handleClick}
//       onContextMenu={handleRightClick}
//       style={{
//         border: '1px solid #ccc',
//         margin: '1rem',
//         padding: '1rem',
//         borderRadius: '8px',
//         backgroundColor: '#f9f9f9',
//         cursor: 'pointer',
//       }}
//     >
//       <h3>{block.title}</h3>
//       {showMenu && (
//         <ContextMenu
//           position={menuPos}
//           onClose={() => setShowMenu(false)}
//           onAddChild={() => {
//             addChildBlock(block.id);
//             setShowMenu(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }