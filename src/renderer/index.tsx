import { createRoot } from 'react-dom/client';
import App from './App';

// Roboto 폰트 로드 (Material UI 권장)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// DOM에 앱 마운트
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// 기본 IPC 테스트
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  console.log('IPC example response:', arg);
});

window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);