import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
// import commonjs from 'rollup-plugin-commonjs';

import packageJson from './package.json';
export default [
	{
		input: 'src/index.js',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
			},
			{
				file: packageJson.module,
				format: 'esm',
			},
		],
		external: Object.keys(packageJson.peerDependencies || {}),
		plugins: [
			babel({
				exclude: 'node_modules/**',
				presets: ['@babel/preset-react'],
			}),
			external(),
			resolve(),
		],
	},
];
