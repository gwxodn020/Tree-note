import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap, Controls, Background,
  applyNodeChanges, applyEdgeChanges, addEdge
} from 'react-flow-renderer';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';
import CustomNode from './CustomNode';
import { authFetch } from '../utils/authFetch';
import './TreeEditor.css';

const nodeTypes = { custom: CustomNode };

export default function TreeEditor() {
  const { newNoteId } = useParams();
  const [title, setTitle] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, parentId: null });
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  useEffect(() => {
    authFetch(`https://port-0-tree-mcn00wcv7d3cdfae.sel5.cloudtype.app/api/notes/${newNoteId}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setNodes(data.nodes);
        setEdges(data.edges);
      });
  }, [newNoteId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      authFetch(`https://port-0-tree-mcn00wcv7d3cdfae.sel5.cloudtype.app/api/notes/${newNoteId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, nodes, edges })
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [title, nodes, edges, newNoteId]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, id: uuidv4(), type: 'smoothstep', animated: true }, eds));
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, []);

  const handleNodeClick = (_, node) => setSelectedNodeId(node.id);

  const handleAddChildNode = (parentId, position) => {
    const newNode = {
      id: uuidv4(),
      type: 'custom',
      data: { label: '자식 노드', content: '', isEditing: true, onRightClick },
      position: { x: position.x + 100, y: position.y + 100 },
    };
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, { id: `e${parentId}-${newNode.id}`, source: parentId, target: newNode.id }]);
  };

  const onRightClick = (id, x, y) => {
    setContextMenu({ visible: true, x, y, parentId: id });
  };

  const handleEditToggle = (id) => {
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, isEditing: !n.data.isEditing } } : n));
  };

  const handleContentChange = (id, content) => {
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, content } } : n));
  };

  const handleTitleChange = (id, label) => {
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, label } } : n));
  };

  const handleDeleteNode = () => {
    if (!selectedNodeId) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
    setSelectedNodeId(null);
  };

  useEffect(() => {
    const closeMenu = () => setContextMenu({ visible: false, x: 0, y: 0, parentId: null });
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="tree-editor-container">
      <div className="tree-editor-main">
        <ReactFlow
          nodes={nodes.map((n) => ({ ...n, data: { ...n.data, onRightClick } }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        {contextMenu.visible && (
          <div className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}
               onClick={() => {
                 const parentNode = nodes.find((n) => n.id === contextMenu.parentId);
                 handleAddChildNode(contextMenu.parentId, parentNode.position);
                 setContextMenu({ visible: false, x: 0, y: 0, parentId: null });
               }}>
            ➕ 자식 노드 생성
          </div>
        )}
      </div>

      {isPanelOpen ? (
        <div className="side-panel">
          <div className="panel-header">
            <h3>노드 관리</h3>
            <button onClick={() => setIsPanelOpen(false)}>▷</button>
          </div>
          <button onClick={handleDeleteNode} disabled={!selectedNodeId}>삭제</button>
          {selectedNode && (
            <div className="node-editor">
              <h4>제목</h4>
              <input
                className="node-title-input"
                placeholder="제목을 입력하세요"
                value={selectedNode.data.label}
                onChange={(e) => handleTitleChange(selectedNode.id, e.target.value)}
              />
              <h4>내용</h4>
              {selectedNode.data.isEditing ? (
                <>
                  <textarea
                    value={selectedNode.data.content}
                    onChange={(e) => handleContentChange(selectedNode.id, e.target.value)}
                    rows={10}
                  />
                  <button onClick={() => handleEditToggle(selectedNode.id)}>미리보기</button>
                </>
              ) : (
                <>
                  <ReactMarkdown>{selectedNode.data.content}</ReactMarkdown>
                  <button onClick={() => handleEditToggle(selectedNode.id)}>수정하기</button>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="side-panel-collapsed">
          <button onClick={() => setIsPanelOpen(true)}>◁</button>
        </div>
      )}
    </div>
  );
}