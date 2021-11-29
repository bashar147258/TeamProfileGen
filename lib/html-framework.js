

module.exports = {
     createHTML(teamMembers) {
        const htmlElements=[];
        const headerEl =
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link rel = "stylesheet" href = "../src/style.css">
                <title>Team Profile</title>
            </head>
            <body>
                <header>
                    <h1>Team Profile</h1>
                </header>

                <div class="container">
        `;
        htmlElements.push(headerEl);
      
        
        for (let i =0; i < teamMembers.length; i++){
         
            let teamHTML=`
            <div class="card">
                <div class="card_top">
                    <h3>${teamMembers[i].getName()}</h3>
            `;
            if (teamMembers[i].getRole()==="Manager") {
                teamHTML+=`<h4>⛵ Manager</h4>  `;
            } else if (teamMembers[i].getRole()==="Engineer") {
                teamHTML+=`<h4>🚀 Engineer</h4> `;
            } else {
                teamHTML+=`<h4>🎓 Intern</h4>`;
            };

            teamHTML+=`
            </div>
            <div class="card_bot">
                <p><b>Empoyee ID:</b> ${teamMembers[i].getID()} </p>
                <p><b>Email:</b>${teamMembers[i].getEmail()}</p>
                `
                if (teamMembers[i].getRole()==="Manager") {
                    teamHTML+=`<p><b>Office Number:</b> ${teamMembers[i].getOffice()} </p> `;
                } else if (teamMembers[i].getRole()==="Engineer") {
                    teamHTML+=`<p><b>Github:</b> ${teamMembers[i].getGithub()} </p>`;
                } else {
                    teamHTML+=`<p><b>School Name:</b> ${teamMembers[i].getSchool()} </p>`;
                };
                teamHTML+=`
                    </div>
                </div>
                `;
                htmlElements.push(teamHTML)
        };
        const footerEl =`
        </body>

        </html>
        `;
        htmlElements.push(footerEl)
       

      return htmlElements
    }
};
