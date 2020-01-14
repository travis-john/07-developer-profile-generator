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

//inquirer function
function askUser() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'What is your Name?',
      answers: 'name'
    },
    {
      type: 'input',
      name: 'What is your Github username?',
      answers: 'username'
    },
    {
      type: 'list',
      name: 'Pick a profile color',
      answers: 'color',
      choices: [
        'green',
        'blue',
        'pink',
        'red',
      ]
    }
  ]);
}

async function init() {
  try {
    const answers = await askUser();
    const queryURL = `https://api.github.com/users/${answers.username}`;
    const queryURLStar = `https://api.github.com/users/${answers.username}/starred`;
    const response = await axios.get(queryURL);
    const responseStar = await axios.get(queryURLStar);
  }
  catch (err) {
    console.log(err);
  }
}

init()
