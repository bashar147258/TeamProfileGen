const inquirer = require('inquirer');
const fs =  require('fs');
const Manager = require('./lib/Manager');
const Engineer =require('./lib/Engineer');
const Intern =require('./lib/Intern');
const htmlGen = require('./lib/html-framework');


//An array to store team members
const teamMembers=[];

function init(){
    console.log("TEAM GENERATOR")
    managerQuestions();
}

const managerQuestions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "Enter Manager name...",
            name: 'managerName',
            validate:(response)=> {
                if (response != "") {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Manager name...");
                    
                }
            }
        },
        {
            type: 'input',
            message: "Enter Manager id...",
            name: 'managerID',
            validate: (response) => {
                const num=response.match(/^[1-9]\d*$/)
                if (num) {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Manager id...");
                }
            }
        },
        {
            type: 'input',
            message: "Enter Manager email...",
            name: 'managerEmail',
            validate: (response) => {
                const email = response.match(/\S+@\S+\.\S+/);
                if (email) {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Manager email...");
                }
            }
        },
        {
            type: 'input',
            message: "Enter Manager's office phone number...",
            name: 'managerOffice',
            validate: (response) => {
                const num = response.match(/^[1-9]\d*$/);
                if (num) {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Manager office phone number...");
                }
            }
        },
    ])
    .then((response) => {
        const managerName = response.managerName;
        const managerID = response.managerID;
        const managerEmail = response.managerEmail;
        const managerOffice = response.managerOffice;

        const manager = new Manager(managerName, managerID, managerEmail, managerOffice);

        teamMembers.push(manager);
        addMember();
    })
}

const engineerQuestions =() => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "Enter Engineer name...",
            name: 'engineerName',
            validate:(response)=> {
                if (response != "") {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Engineer name...");
                    
                }
            }
        },
        {
            type: 'input',
            message: "Enter Engineer id...",
            name: 'engineerID',
            validate: (response) => {
                const num=response.match(/^[1-9]\d*$/)
                if (num) {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Engineer id...");
                }
            }
        },
        {
            type: 'input',
            message: "Enter Engineer email...",
            name: 'engineerEmail',
            validate: (response) => {
                const email = response.match(/\S+@\S+\.\S+/);
                if (email) {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Engineer email...");
                }
            }
        },
        {
            type: 'input',
            message: "Enter Engineer's Github Username...",
            name: 'engineerGithub',
            validate:(response)=> {
                if (response != "") {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Engineer's Github Username...");
                }
            }
        },
    ])
    .then((response) => {
        const engineerName = response.engineerName;
        const engineerID = response.engineerID;
        const engineerEmail = response.engineerEmail;
        const engineerGithub = response.engineerGithub;

        const engineer = new Engineer(engineerName, engineerID, engineerEmail, engineerGithub);

        teamMembers.push(engineer);
        addMember();
    })
}

const internQuestions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "Enter Intern name...",
            name: 'internName',
            validate:(response)=> {
                if (response != "") {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Intern name...");
                    
                }
            }
        },
        {
            type: 'input',
            message: "Enter Intern id...",
            name: 'internID',
            validate: (response) => {
                const num=response.match(/^[1-9]\d*$/)
                if (num) {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Intern id...");
                }
            }
        },
        {
            type: 'input',
            message: "Enter Intern email...",
            name: 'internEmail',
            validate: (response) => {
                const email = response.match(/\S+@\S+\.\S+/);
                if (email) {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Intern email...");
                }
            }
        },
        {
            type: 'input',
            message: "Enter Intern School Name...",
            name: 'internSchool',
            validate:(response)=> {
                if (response != "") {
                    return true
                } else {
                    return console.error("PROHIBTED ACTION! Enter Intern School Name...");
                }
            }
        },
    ])
    .then((response) => {
        const internName = response.internName;
        const internID = response.internID;
        const internEmail= response.internEmail;
        const internSchool= response.internSchool;

        const intern = new Intern(internName, internID, internEmail, internSchool);

        teamMembers.push(intern);
        addMember()
    })
}

const addMember =() => {
    
   
    return inquirer.prompt([
        {
            type: "rawlist",
            message: "Enter employee position...",
            choices: [
                "Engineer",
                "Intern",
                "Finished Creating Profiles"
            ],
            name: "role"
        },
    ])
    .then(response => {
        switch (response.role) {
           case "Engineer":
               engineerQuestions();
               break;
            case "Intern":
                internQuestions();
                break;
            case "Finished Creating Profiles":
                generateHTML();
                break;
        }    
    })
}

function generateHTML() {
    const generatedHTML = htmlGen.createHTML(teamMembers)
    makeHTML(generatedHTML)
}

function makeHTML(generatedHTML) {
    fs.writeFile('./dist/index.html', generatedHTML.join(""), (err) => {
        err ? console.log(err) : console.log("index.html has been succesfully generated!");
    });
};




init();




