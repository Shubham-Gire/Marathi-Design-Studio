// Node.js script to reliably start all 7 Marathi Design Studio backend microservices
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import net from 'net';

const rootDir = process.cwd();
const logsDir = path.join(rootDir, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const services = [
  { name: 'identity-service', port: 8081, jar: path.join(rootDir, 'services', 'identity-service', 'target', 'identity-service-1.0.0-SNAPSHOT.jar') },
  { name: 'template-service', port: 8082, jar: path.join(rootDir, 'services', 'template-service', 'target', 'template-service-1.0.0-SNAPSHOT.jar') },
  { name: 'project-service',  port: 8083, jar: path.join(rootDir, 'services', 'project-service', 'target', 'project-service-1.0.0-SNAPSHOT.jar') },
  { name: 'media-service',    port: 8084, jar: path.join(rootDir, 'services', 'media-service', 'target', 'media-service-1.0.0-SNAPSHOT.jar') },
  { name: 'ai-service',       port: 8085, jar: path.join(rootDir, 'services', 'ai-service', 'target', 'ai-service-1.0.0-SNAPSHOT.jar') },
  { name: 'billing-service',  port: 8086, jar: path.join(rootDir, 'services', 'billing-service', 'target', 'billing-service-1.0.0-SNAPSHOT.jar') },
  { name: 'api-gateway',      port: 8080, jar: path.join(rootDir, 'services', 'api-gateway', 'target', 'api-gateway-1.0.0-SNAPSHOT.jar') },
];

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      resolve(false);
    });
    socket.connect(port, '127.0.0.1');
  });
}

async function startAll() {
  console.log('🚀 Starting Marathi Design Studio Microservices Cluster...\n');

  for (const s of services) {
    const active = await isPortOpen(s.port);
    if (active) {
      console.log(`ℹ️ [ALREADY RUNNING] ${s.name} on port ${s.port}`);
      continue;
    }

    if (!fs.existsSync(s.jar)) {
      console.error(`❌ [JAR NOT FOUND] Missing ${s.jar}. Please run "mvn clean package -DskipTests" first.`);
      continue;
    }

    console.log(`⏳ Starting ${s.name} on port ${s.port}...`);
    const outLog = fs.openSync(path.join(logsDir, `${s.name}.log`), 'a');
    const errLog = fs.openSync(path.join(logsDir, `${s.name}-err.log`), 'a');

    const child = spawn('java', ['-jar', s.jar], {
      detached: true,
      stdio: ['ignore', outLog, errLog],
      windowsHide: true,
    });
    child.unref();
  }

  console.log('\n⏳ Waiting for services to initialize and bind ports (checking up to 25s)...');

  for (let attempt = 1; attempt <= 25; attempt++) {
    await new Promise((r) => setTimeout(r, 1000));
    const statuses = await Promise.all(services.map(async (s) => ({ name: s.name, port: s.port, ready: await isPortOpen(s.port) })));
    const allReady = statuses.every((s) => s.ready);

    if (allReady) {
      console.log('\n🎉 ALL 7 MICROSERVICES ARE ONLINE AND READY!');
      for (const s of statuses) {
        console.log(`   ✅ ${s.name.padEnd(20)} -> http://localhost:${s.port}`);
      }
      return;
    }

    const readyCount = statuses.filter((s) => s.ready).length;
    process.stdout.write(`   Attempt ${attempt}/25: ${readyCount}/${services.length} services listening...\r`);
  }

  console.log('\n⚠️ Some services took longer than 25 seconds to start. Current status:');
  for (const s of services) {
    const ready = await isPortOpen(s.port);
    console.log(`   ${ready ? '✅' : '⏳'} ${s.name.padEnd(20)} (port ${s.port}): ${ready ? 'ONLINE' : 'STARTING/INITIALIZING'}`);
  }
}

startAll();
