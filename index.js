'use strict'

const { program } = require('commander')
const ParamHelper = require('./lib/param_helper')
const newman = require('newman')

program
  .name('cha-tests')
  .requiredOption('-e, --environment <environment>', 'environment to run tests against')

program.on('--help', () => {
  console.log('')
  console.log('Examples:')
  console.log('  $ npm start -- -e dev')
  console.log('  $ node index.js -e dev')
})

program.parse()

const args = ParamHelper.params(program)

newman.run(
  args,
  function (err) {
    if (err) { throw err }
    console.log('Collection run complete!')
  }
)
