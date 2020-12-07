'use strict'

const fs = require('fs')

const params = (program) => {
  return {
    collection: collectionFile(program.environment),
    environment: environmentFile(program.environment),
    reporters: 'cli'
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

module.exports = { params }
