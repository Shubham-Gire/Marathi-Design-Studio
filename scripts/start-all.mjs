import { spawn } from 'child_process';
import net from 'net';
import path from 'path';

const SERVICES = [
  { name: 'identity-service', port: 8081, jar: 'backend/services/identity-service/target/identity-service-1.0.0-SNAPSHOT.jar' },
  { name: 'template-service', port: 8082, jar: 'backend/services/template-service/target/template-service-1.0.0-SNAPSHOT.jar' },
  { name: 'project-service', port: 8083, jar: 'backend/services/project-service/target/project-service-1.0.0-SNAPSHOT.jar' },
  { name: 'media-service', port: 8084, jar: 'backend/services/media-service/target/media-service-1.0.0-SNAPSHOT.jar' },
  { name: 'ai-service', port: 8085, jar: 'backend/services/ai-service/target/ai-service-1.0.0-SNAPSHOT.jar' },
  { name: 'billing-service', port: 8086, jar: 'backend/services/billing-service/target/billing-service-1.0.0-SNAPSHOT.jar' },
  { name: 'api-gateway', port: 8080, jar: 'backend/services/api-gateway/target/api-gateway-1.0.0-SNAPSHOT.jar' },
];

const NODE_SERVICES = [
  { name: 'tools-service', port: 8087, script: 'backend/services/tools-service/server.js' }
];

function isPortListening(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(800);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });
    socket.connect(port, '127.0.0.1');
  });
}

async function startAll() {
  console.log('🚀 Marathi Design Studio: Verifying and Starting Microservices...\n');

  for (const svc of SERVICES) {
    const active = await isPortListening(svc.port);
    if (active) {
      console.log(`✅ ${svc.name} is already ONLINE on port ${svc.port}`);
    } else {
      console.log(`⏳ Starting ${svc.name} on port ${svc.port}...`);
      const child = spawn('java', ['-jar', path.resolve(svc.jar)], {
        detached: true,
        stdio: 'ignore'
      });
      child.unref();
    }
  }

  // Node.js tools service check
  for (const svc of NODE_SERVICES) {
    const active = await isPortListening(svc.port);
    if (active) {
      console.log(`✅ ${svc.name} is already ONLINE on port ${svc.port}`);
    } else {
      console.log(`⏳ Starting ${svc.name} on port ${svc.port}...`);
      const child = spawn('node', [path.resolve(svc.script)], {
        detached: true,
        stdio: 'ignore'
      });
      child.unref();
    }
  }

  // Frontend preview check
  const frontendActive = await isPortListening(5173);
  if (frontendActive) {
    console.log(`✅ Frontend preview is ONLINE on port 5173`);
  } else {
    console.log(`⏳ Starting frontend preview on port 5173...`);
    const child = spawn('npm', ['--prefix', 'frontend', 'run', 'preview', '--', '--port', '5173'], {
      detached: true,
      stdio: 'ignore',
      shell: true
    });
    child.unref();
  }

  console.log('\n✨ System ready. Access at http://localhost:5173');
}

startAll();
