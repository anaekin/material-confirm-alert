import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';

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
			copy({
				targets: [
					{
						src: 'src/components/MaterialConfirmAlert/index.d.ts',
						dest: 'dist',
					},
				],
			}),
		],
	},
];
