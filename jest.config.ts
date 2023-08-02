import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	bail: 1,
	testEnvironment: 'jsdom',
};

export default config;
