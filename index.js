'use strict'

const fs = require('fs')
const newman = require('newman')

const environment = process.argv.slice(2)[0]

if (!environment) {
  console.log("You didn't say which environment file to use!")
  process.exit(1)
}

const enviromentFile = fs.readdirSync('./environments', { withFileTypes: true })
  .filter(item => !item.isDirectory())
  .map(item => item.name)
  .find(item => item.startsWith(environment))

if (!enviromentFile) {
  console.log(`Sorry, we can't find a matching '${environment}' environment file.`)
  process.exit(1)
}

let collectionFile = 'cha.postman_collection.json'
if (environment === 'example') {
  collectionFile = 'ci.postman_collection.json'
}

newman.run({
  collection: require(`./${collectionFile}`),
  environment: require(`./environments/${enviromentFile}`),
  reporters: 'cli'
}, function (err) {
  if (err) { throw err }
  console.log('Collection run complete!')
})
