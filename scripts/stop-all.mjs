import { execSync } from 'child_process';

const PORTS = [8080, 8081, 8082, 8083, 8084, 8085, 8086, 8087, 5173];

console.log('🛑 Stopping Marathi Design Studio Microservices & Dev Servers...\n');

for (const port of PORTS) {
  try {
    const netstatOutput = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, { encoding: 'utf-8' });
    const lines = netstatOutput.trim().split('\n');
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== '0') {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
          console.log(`✅ Terminated process ${pid} on port ${port}`);
        } catch {}
      }
    }
  } catch {
    // Port not active
  }
}

console.log('\n✨ All processes stopped.');
