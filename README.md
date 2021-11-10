# ABOUT HMARCamino
HMARCamino (previously known as HACCamino) is an online reporting platform that helps Hawai’i Marine Animal Response (or HMAR) volunteers and staff members in organizing and collecting sighting reports from the general public. 

Currently, the organization’s only means of collecting information on sightings and/or animals in distress is through a hotline number. However, this system comes with issues including getting calls for reports involving other animals, getting multiple calls for similar sightings, some locations having poor connectivity leading to poor communication between observer and dispatcher, and many more. 

Our idea focuses on making an online platform that will help condense reports made by the general public. We will use google maps to help the volunteers find the exact location of these animals/species to get help as soon as possible. This application will also give volunteers a better understanding of what they will be dealing with since we are giving the public the ability to upload photos of the animal and surrounding area. 

## Links
* Deployed Application: [HMARCamino](https://hmar-camino.meteorapp.com/)
* GitHub Repository: [HACCamino](https://github.com/HACC2021/HACCamino)
* DevPost: [HACCamino](https://devpost.com/software/projectcamino)
* Youtube Link: []()



# HOW TO USE HMARCamino (HACCamino)
## Using the deployed version:
For the existing implementation of the app, the user may use any device they have as long as there is a web browser, such as Google Chrome, Mozilla Firefox, or Safari, installed on the chosen device. The user may then go to https://hmar-camino.meteorapp.com/ to access the application.
* To test the application as a general public user (i.e, not a member of the HMAR organization), they can click on the ‘Report Animal In Distress’ or the ‘Report Sighting' buttons depending on the distress level of the animal they are reporting. They will then be redirected to the reporting page, a hotline number, or the resources page based on the response they give.
* To test as a staff member/volunteer, they must first log-in using the following test credentials (format: email | password)
  * Staff Member: admin1@hacc21.org | adminCamino1234 
  * Volunteer: volunteer1@hacc21.org | volunteerCamino1234
* As staff members/volunteers, they will be able to review reports and approve them before sending a ticket and the details to the volunteer/s. Staff members or administrators will also be able to access other administrator features such as user creation, viewing a list of volunteers and staff members, as well as, user activity on the application.

## From the source code/GitHub repository:
Developers’ note: The Google API and AWS Access keys are only activated for the deployed version of this application at this moment. This means that users might not be able to use the map and upload image features on this application when running the local version. Please use the deployed version of the app for a full experience. 

For the existing implementation of the app, the user must have a web browser, such as Google Chrome, Mozilla Firefox, or Safari, installed on their computer. 
1. Install the following:
  1.1. Node.js LTS version (https://nodejs.dev/)
  1.2. Meteor 2.5 (https://www.meteor.com/developers/install) 
2. Download the repository from GitHub: https://github.com/HACC2021/HACCamino 
  2.1. If the user has a GitHub application on their machine, they can choose ‘Open with GitHub Desktop’
  2.2. Otherwise, they can download the ZIP file version of the source code and unzip the contents on their machine
3. Download the settings.production.json file from: https://drive.google.com/file/d/1Lf15WX10UcVEzwxQNfr8kWn7jZN2eBCU/view?usp=sharing 
4. Copy the downloaded file inside the directory/folder: HACCamino/config
5. On the Terminal/Command Prompt, use command cd to navigate to the app directory in the cloned repository (e.g., If the user saved the repository on their desktop, they can use the command: `cd Desktop/HACCamino/app`)
6. Make sure that all meteor packages are updated by running the command: `meteor update --all-packages`
7. Install the third party libraries or npm packages needed to run the application by running the command: `meteor npm install`
8. Launch the app by running the command: `meteor npm run start`
9. Open http://localhost:3000 using any web browser of your choice
---
* Template: [Meteor Application Template React Production](https://github.com/ics-software-engineering/meteor-application-template-react-production)
* By: [ICS Software Engineering](https://github.com/ics-software-engineering)
