import { config } from 'dotenv'

config()

export default {
  INSTANCE_IP: '0.0.0.0',
  EUREKA_IP: '192.168.0.117',
  EUREKA_PORT: 8761,
  INSTANCE_PORT: 80,
  PORT: 3004,
  LOG_LEVEL: 'debug',
  APPLICATION_LOG_PATH: '/logs/application.log',
  MONGO_URL: 'mongodb://localhost:27017/fsj-mw-pedidos',
  REDIS_URL: 'localhost',
  REDIS_PORT: 6379,
  BULLMQ_QUEUE: 'POC',
  INTEGRACAO_URL: 'http://localhost:8081',
  INTEGRACAO_TOKEN:
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcHBmc2pAZmFybWFjaWFzc2Fvam9hby5jb20uYnIiLCJzY29wZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfQ09OU1VMVEFFU1RPUVVFX1JFREUiLCJST0xFX0NPTlNVTFRBRVNUT1FVRV9MT0pBUFJEVVRPIiwiUk9MRV9DT05TVUxUQVBST0RVVE8iLCJST0xFX0NPTlNVTFRBTE9KQV9WQVJFSk8iLCJST0xFX0NPTlNVTFRBRVNUT1FVRUxPSkFfTE9DQUwiLCJST0xFX0NPTlNVTFRBQ0FUQUxPR09fQ0FURUdPUklBIiwiUk9MRV9DT05TVUxUQUNBVEFMT0dPX1BST0RVVE8iLCJST0xFX1JFRlJFU0hfVklFVyIsIlJPTEVfQ09OU1VMVEFDQVRBTE9HT19QUkVDTyIsIlJPTEVfQ09OU1VMVEFDQVRBTE9HT19QUkVDT19FWENMVVNJVk8iLCJST0xFX1JFQ0VQQ0lPTkFSX05VTUVST19QRURJRE8iLCJST0xFX0lOU0VSSVJfUFJPRFVUT19QRURJRE9fV0VCIiwiUk9MRV9JTlNFUklSX0hJU1RPUklDT19QRURJRE9fV0VCIiwiUk9MRV9JTlNFUklSX1BFRElET19XRUIiLCJST0xFX1BFRElET1NfTE9KQSIsIlJPTEVfQ09OU1VMVEFSX1BFRElET19TSVRVQUNBTyIsIlJPTEVfQVRVQUxJWkFSX1NUQVRVU19QRURJRE9fV0VCIiwiUk9MRV9DT05TVUxUQUVTVE9RVUVMT0pBQ0VTVEFfTE9DQUwiXSwiaGFzaCI6Ijk4YzE0NjIzNmZiYzY3YTM5OWFhYWUxYjJiZjY1OThhYjhjYmUzZGEiLCJpc3MiOiJodHRwOi8vc2Fvam9hb2Zhcm1hY2lhcy5jb20uYnIiLCJpYXQiOjE1OTYyMjAxNDN9.0kXA8wQMxYCtYu4ADuLQgeKTzEbbc-fReA1J9AGnyqopeFHSDruER541kOkoY2prfIBT2OVJ0elBR5OycyZeMQ',
  TZ: 'America/Buenos_Aires',
  ...process.env,
}
