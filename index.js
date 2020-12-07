'use strict'

const { program } = require('commander')
const ParamHelper = require('./lib/param_helper')
const newman = require('newman')

program
  .name('cha-tests')
  .requiredOption('-e, --environment <environment>', 'environment to run tests against')
  .option('-r, --reporters [reporters...]', 'reporters you wish newman to use', 'cli')

program.on('--help', () => {
  console.log('')
  console.log('Examples:')
  console.log('  $ npm start -- -e dev')
  console.log('  $ npm start -- -e dev -r cli,json')
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
