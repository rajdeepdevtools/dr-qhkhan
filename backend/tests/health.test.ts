import assert from 'assert';
import { getKeepAliveTargetUrl } from '../src/services/keepAliveService';

console.log('🧪 Running Health Check & Keep-Alive Unit Tests...\n');

const testKeepAliveUrlResolution = () => {
  const targetUrl = getKeepAliveTargetUrl();
  assert.ok(typeof targetUrl === 'string' && targetUrl.length > 0, 'Target URL should be a valid string');
  assert.ok(targetUrl.endsWith('/health/ping'), `Target URL should end with /health/ping, got: ${targetUrl}`);
  console.log(`✅ Passed: Keep-Alive URL resolution test (${targetUrl})`);
};

try {
  testKeepAliveUrlResolution();
  console.log('\n🎉 ALL HEALTH CHECK & KEEP-ALIVE TESTS PASSED SUCCESSFULLY!');
} catch (err: any) {
  console.error('\n❌ Health Test Failure:', err.message);
  process.exit(1);
}
