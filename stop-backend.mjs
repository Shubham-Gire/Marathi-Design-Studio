// Node.js script to stop all Marathi Design Studio backend microservices
import { exec } from 'child_process';

const ports = [8080, 8081, 8082, 8083, 8084, 8085, 8086];

console.log('🛑 Stopping Marathi Design Studio microservices on ports:', ports.join(', '));

// On Windows, find and kill processes on these ports
exec('netstat -ano -p tcp', (err, stdout) => {
  if (err) {
    console.error('Failed to run netstat:', err);
    return;
  }

  const lines = stdout.split('\n');
  const pids = new Set();

  for (const line of lines) {
    for (const port of ports) {
      if (line.includes(`:${port}`) && line.includes('LISTENING')) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && !isNaN(pid) && pid !== '0') {
          pids.add(pid);
        }
      }
    }
  }

  if (pids.size === 0) {
    console.log('ℹ️ No active backend services found listening on ports', ports.join(', '));
    return;
  }

  for (const pid of pids) {
    console.log(`Killing process PID ${pid}...`);
    exec(`taskkill /F /PID ${pid}`, (killErr) => {
      if (killErr) {
        console.error(`Could not kill PID ${pid}:`, killErr.message);
      } else {
        console.log(`✅ Killed PID ${pid}`);
      }
    });
  }
});
