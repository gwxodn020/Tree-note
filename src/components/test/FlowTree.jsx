// import { useState, useCallback } from 'react';
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
// } from 'react-flow-renderer';

// // 초기 노드
// const initialNodes = [
//   {
//     id: '1',
//     data: { label: 'Web Development' },
//     position: { x: 250, y: 0 },
//   },
//   {
//     id: '2',
//     data: { label: 'HTML' },
//     position: { x: 100, y: 100 },
//   },
//   {
//     id: '3',
//     data: { label: 'CSS' },
//     position: { x: 250, y: 100 },
//   },
//   {
//     id: '4',
//     data: { label: 'JavaScript' },
//     position: { x: 400, y: 100 },
//   },
//   {
//     id: '5',
//     data: { label: 'DOM' },
//     position: { x: 400, y: 200 },
//   },
// ];

// // 초기 연결선 (parentId 기반 연결)
// const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2' },
//   { id: 'e1-3', source: '1', target: '3' },
//   { id: 'e1-4', source: '1', target: '4' },
//   { id: 'e4-5', source: '4', target: '5' },
// ];

// export default function FlowTree() {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);

//   const onNodesChange = useCallback((changes) => {
//     setNodes((nds) => applyNodeChanges(changes, nds));
//   }, []);

//   const onEdgesChange = useCallback((changes) => {
//     setEdges((eds) => applyEdgeChanges(changes, eds));
//   }, []);

//   const onConnect = useCallback((params) => {
//     setEdges((eds) => addEdge(params, eds));
//   }, []);

//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// }