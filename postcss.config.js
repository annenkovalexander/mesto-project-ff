const autoprefixier = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    plugins: [
        autoprefixier,
        cssnano({
            preset: 'default'
        })
    ]
};