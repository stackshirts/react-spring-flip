const npsUtils = require('nps-utils')
const series = npsUtils.series
const rimraf = npsUtils.rimraf

module.exports = {
  scripts: {
    build: {
      description: 'Clean lib directory and run build',
      default: series(
        rimraf('lib'),
        'nps build.babel',
      ),
      babel: 'babel src -d lib',
      watch: 'babel src -d lib -w',
    },
  },
}