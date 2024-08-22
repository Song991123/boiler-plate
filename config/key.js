import devConfig from './dev.js';
import prodConfig from './prod.js';

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;