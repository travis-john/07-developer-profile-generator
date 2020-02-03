// global variables
const fs = require('fs'),
      util = require('util'),
      axios = require('axios'),
      inquirer = require('inquirer'),
      htmlPDF = require('html-pdf'),
      generateHTML = require('./assets/js/generate-html.js'),
      options = {
        format: 'Letter',
        orientation: 'portrait',
        type: 'pdf'
      }
      writeFileAsync = util.promisify(fs.writeFile),
      readFileAsync = util.promisify(fs.readFile),
      htmlPath = './assets/html/',
      pdfPath = './assets/pdf/';

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
      name: 'username'
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

//function that is actually run in the terminal
async function init() {
  try {
    //storing answers from Inquirer as variable object
    const answers = await askUser();

    //using Inquirer response to make queryURLs
    const queryURL = `https://api.github.com/users/${answers.username}`;
    const queryURLStar = `https://api.github.com/users/${answers.username}/starred`;

    //using stored QueryURLs to make API calls using Axios
    const profile = await axios.get(queryURL);
    console.log(profile)
    const stars = await axios.get(queryURLStar);

    //storing all data variables as one large data object
    const data = {
      color: answers.color,
      answers: answers,
      profile: profile,
      stars: stars
    }
    // console.log(data)

    //calling generateHTML function from the outside JS file
    const html = generateHTML(data);

    //using the generated HTML to write HTML file and logging success
    await writeFileAsync(`./assets/html/${answers.username}.html`, html);
    console.log('Successfully wrote html file');

    //using html-pdf to use the generated HTML file to write a PDF file and logging success
    htmlPDF.create(html, options).toFile(`./assets/pdf/${answers.username}.pdf`, function(err, res){
      if(err){
        console.log(err)
      }
      console.log(`Successfully wrote PDF`);
    })
  }
  catch (err) {
    console.log(err);
  }
}

init()
