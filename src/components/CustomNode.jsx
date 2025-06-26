import { Handle, Position } from 'react-flow-renderer';

export default function CustomNode({ id, data }) {
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        data.onRightClick(id, e.clientX, e.clientY);
      }}
      style={{
        padding: '10px',
        border: '1px solid #888',
        borderRadius: '8px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        textAlign: 'center',
        minWidth: '100px',
        position: 'relative',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </div>
  );
}