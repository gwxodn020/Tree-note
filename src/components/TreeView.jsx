import { ReactFlowProvider } from 'react-flow-renderer';
import Header from './Header';
import TreeEditor from './TreeEditor';

export default function TreeView() {
  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <Header />
        <div style={{ flex: 1 }}>
          <TreeEditor />
        </div>
      </div>
    </ReactFlowProvider>
  );
}