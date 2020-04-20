import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'test/src/main.js',
	output: {
		sourcemap: true,
		format: 'umd',
		name: 'app',
		file: 'test/public/build/bundle.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('test/public/build/bundle.css');
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		babel({
			babelrc: false,
			runtimeHelpers: true,
			extensions: ['.js', '.mjs', '.html', '.svelte'],
			exclude: ['node_modules/@babel/**'],
			presets: [['@babel/preset-env', {
				targets: ['> 1%', 'last 2 versions', 'ie >= 9'],
				useBuiltIns: 'entry',
				corejs: 3
			}]
			],
			plugins: [
				["@babel/plugin-transform-runtime", {
					"regenerator": true
				}]
			]
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('test/public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}