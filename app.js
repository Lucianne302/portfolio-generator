//const fs = require ('fs'); 
const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');

const inquirer = require ('inquirer'); 

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`================= Add a New Project =================`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectInput => {
              if (projectInput){
                return true; 
              } else {
                console.log('Please enter your project name!');
                return false;
              }
            }
          },
          {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescriptionInput => {
              if (projectDescriptionInput){
                return true; 
              } else {
                console.log('Please enter your project description!');
                return false;
              }
            }
          },
          {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
              if (linkInput){
                return true; 
              } else {
                console.log('Please enter your GitHub link!');
                return false;
              }
            }
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
          }  
            
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    })
};

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
              if (nameInput){
                return true; 
              } else {
                console.log('Please enter your name!');
                return false;
              }
            }
        }, 
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username',
            validate: githubInput => {
              if (githubInput){
                return true; 
              } else {
                console.log('Please enter your Username!');
                return false;
              }
            }
        },
        {
          type: 'confirm',
          name: 'confirmAbout',
          message: 'Would you like to enter some information about yourself for an "About" section?',
          default: true
        },
        {
          type: 'input',
          name: 'about',
          message: 'Provide some information about yourself:',
          when: ({ confirmAbout }) => {
            if (confirmAbout) {
              return true;
            } else {
              return false;
            }
          }
        }
    ]);
};

 const mockData = {
   name: 'Lucianne',
   github: 'Lucianne302',
   projects: []
 }

const pageHTML = generatePage(mockData);
//const pageHTML = generatePage(portfolioData); 
 
 promptUser()
   .then(promptProject)
   .then(portfolioData => {

    // fs.writeFile('./dist/index.html', pageHTML, err => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   console.log('Page created! Check out index.html in this directory to see it!');
    
    // fs.copyFile('./src/style.css', './dist/style.css', err => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   console.log('Style sheet copied successfully!');
    //   });
      
    // });

    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

