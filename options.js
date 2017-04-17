// tooling
const cwd = process.cwd();
const path = require('path');

// package, gulp configuration
const pkg = require(
	path.resolve(
		cwd,
		'package.json'
	)
);
const cfg = pkg.gulpConfig || {};

// paths for html, js, css
const pathHTML = cfg.html !== undefined ? cfg.html : pkg.template;
const pathJS   = cfg.js   !== undefined ? cfg.js   : pkg.style;
const pathCSS  = cfg.css  !== undefined ? cfg.css  : pkg.main;

const paths = {
	html: pathHTML === false ? pathHTML : path.resolve(cwd, pathHTML || `${ pkg.name }.html`),
	js:   pathJS   === false ? pathJS   : path.resolve(cwd, pathJS   || `${ pkg.name }.js`),
	css:  pathCSS  === false ? pathCSS  : path.resolve(cwd, pathCSS  || `${ pkg.name }.css`),
	files: path.resolve(cwd, cfg.files || 'placeholders')
};

// whether sass or css are used
const useSass = cfg['use-sass'] === false ? false : true; // eslint-disable-line no-unneeded-ternary
const usePostCSS = cfg['use-postcss'] === false ? false : true; // eslint-disable-line no-unneeded-ternary

const uses = {
	sass:    useSass,
	postcss: usePostCSS
};

// whether css or js are compressed
const compressCSS = cfg['compress-css'] === false ? false : Object({
	autoprefixer: false,
	normalizeUrl: false,
	svgo: false,
	sass: {
		outputStyle: 'compressed'
	}
}, cfg['compress-css']);
const compressJS  = cfg['compress-js']  === false ? false : Object({}, cfg['compress-js']);

const compresses = {
	css: compressCSS,
	js:  compressJS
};

// server options
const server = Object.assign({
	host: 'localhost',
	livereload: true,
	name: pkg.name,
	port: 8080,
	openBrowser: true,
	root: 'dist'
}, cfg['server']);

// return configuration
module.exports = {
	compresses,
	server,
	paths,
	uses
};