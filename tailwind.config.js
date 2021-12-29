module.exports = {
	purge: [ './src/**/*.{js,jsx,ts,tsx}', './public/index.html' ],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			gridTemplateColumns: {
				'14': 'repeat(14, minmax(0, 1fr))',
				'13': 'repeat(13, minmax(0, 1fr))'
			},
			gridColumn: {
				'span-14': 'span 14 / span 14',
				'span-13': 'span 13 / span 13'
			},
			colors: {
				'blue-line': '#D5FFF1'
			},
			fontFamily: {
				ARIANLTLBOLD: [ 'ARIANLTLBOLD' ],
				POPPINSRE: [ 'POPPINSRE' ],
				DRUKWIDEBOLD: [ 'DRUKWIDEBOLD' ],
				DINALTER: [ 'DINALTER' ]
			},
			spacing: {
				'1/5': '20%',
				'1/6': '16.66%'
			},
			maxWidth: {
				'22': '22rem'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
