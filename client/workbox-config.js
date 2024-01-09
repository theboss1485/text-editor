module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{css,png,js}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};