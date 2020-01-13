// global variables
const fs = require('fs'),
      util = require('util'),
      axios = require('axios'),
      inquirer = require('inquirer'),
      htmlPDF = require('html-pdf'),
      githubScraper = require('github-scraper'),
      generateHTML = require('./assets/js/generate-html.js'),
      writeFileAsync = util.promisify(fs.writeFile),
      githubAsync = util.promisify(githubScraper);
