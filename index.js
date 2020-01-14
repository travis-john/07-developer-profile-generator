// global variables
const fs = require('fs'),
      util = require('util'),
      axios = require('axios'),
      inquirer = require('inquirer'),
      htmlPDF = require('html-pdf'),
      generateHTML = require('./assets/js/generate-html.js'),
      writeFileAsync = util.promisify(fs.writeFile),
      readFileAsync = util.promisify(fs.readFile);

//inquirer function
function askUser() {
  return inquirer.prompt([
    {
      type: 'input',
      message: 'What is your Name?',
      name: 'name'
    },
    {
      type: 'input',
      message: 'What is your Github username?',
      answers: 'username'
    },
    {
      type: 'list',
      message: 'Pick a profile color',
      name: 'color',
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
    const html = generateHTML(answers, response, responseStar);
  }
  catch (err) {
    console.log(err);
  }
}

init()
