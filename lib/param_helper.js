'use strict'

const fs = require('fs')

const params = (program) => {
  return {
    collection: collectionFile(program.environment),
    environment: environmentFile(program.environment),
    reporters: parseReporters(program.reporters),
    // It does not matter if the user does not specify the html reporter. Newman will simply ignore the htmlextra
    // section. But we must specify the `reporter:` property else the htmlextra reporter package fails
    reporter: {
      htmlextra: {
        browserTitle: 'Charging Module API',
        title: 'Charging Module API',
        skipSensitiveData: true
      }
    }
  }
}

const collectionFile = (environment) => {
  let collectionFile = 'cha.postman_collection.json'
  if (environment === 'example') {
    collectionFile = 'ci.postman_collection.json'
  }

  return require(`../${collectionFile}`)
}

const environmentFile = (environment) => {
  const file = fs.readdirSync('./environments', { withFileTypes: true })
    .filter(item => !item.isDirectory())
    .map(item => item.name)
    .find(item => item.startsWith(environment))

  if (!file) {
    console.log(`Sorry, we can't find a matching 'environments/${environment}.postman_environment.json'`)
    process.exit(1)
  }

  return require(`../environments/${file}`)
}

/**
 * Parse the array of selected reporters passed via the command line
 *
 * The main purpose of this method is to handle a user selecting `html` on the command line and us needing to convert
 * that to `htmlextra`.
 *
 * The Postman maintained `html` reporter is pretty pants so we are using newman-reporter-htmlextra instead. It's
 * recognised reporter name is `htmlextra` but we want users of this project to not have to worry about this
 * distinction; if they select `html` they want the output from htmlextra.
 *
 * In addition to this the parser ensures all values are lowercase and removes any accidental duplicates.
 *
 * @param {String[]} reporters Array of strings
 */
const parseReporters = (reporters) => {
  const lowercased = reporters.join('|').toLowerCase().split('|')
  const unique = [...new Set(lowercased)]

  const indexOfHtml = unique.indexOf('html')
  console.log(`parser ${indexOfHtml}`)
  if (indexOfHtml !== -1) {
    console.log('BOOOOOO')
    unique[indexOfHtml] = 'htmlextra'
  }
  console.log(unique)
  return unique
}

module.exports = { params }
