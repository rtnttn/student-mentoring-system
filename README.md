# Student Mentoring System - Docs



## Introduction

Welcome to the Student Mentoring System (SMS) documentation.
This page is intended to serve as a reference for onboarding and completing common use-cases, as well as shedding light on design decisions where appropriate.

## Key Concepts

### Users

There are 2 broad classes of users, each with 2 privilege levels.
Students have limited access to the system, and may be granted mentor privileges.
Staff are involved in the system as supervisors, but may be granted coordinator privileges, allowing them to create groups and subjects etc.

The SMS was designed to allow students to create their own accounts. During registration, they would supply their name and email address and set a password, and also declare which course they were enrolled in from a generated list, and indicate how far they had progressed into the course.

Once enrolled, students would be responsible for submitting applications and availability, as well as logging their attendance throughout semester. Mentors are additionally responsible for setting session dates ahead of time.

> !!! note Mentors can also apply to be mentees

Staff accounts, on the other hand, are created by the course coordinator. A staff member should change their password when they log in for the first time. Having the coordinator create staff accounts is an easy means of preventing unauthorized access. Staff accounts require a name, email and password.

### Applications

Once authenticated, students can submit applications. There are 3 types of applications: applications to run a mentor group (mentor applications), applications to join a mentor group (mentee applications) and applications to become a mentor (mentorship applications).

When a mentorship application is approved by a coordinator, the student account receives mentor privileges, and can then submit mentor applications.

Once mentor applications are approved by a coordinator, that application can be used to assign mentees through group creation.

Mentee applications are deleted once the student is assigned to a group for that subject, but mentor applications remain so that other groups may be created.

### Groups

A group consists of two or more students (one mentor and up to five mentees), with a staff member assigned as a supervisor. The scope of a group is one subject, and they are expected to meet once a week for at least an hour.

Groups are created by the coordinator by pairing mentor and mentee applications. Existing groups can also have mentees added to them.

> !!! Students should act as a mentor for no more than 2 groups concurrently. Group sessions should have 5 mentees max

Mentors can see the names of mentees in their group, but mentees


## Getting Started

There are a few steps to complete before students can be paired up into groups. Students and staff will need accounts to be created, subjects will need to be entered into the database and the timeslot table needs to be populated.

> !!! These steps detail workflows for the coordinator only

### Creating User Accounts

Staff and student accounts can be created by following links from the dashboard
->![User creation links](https://i.imgur.com/DAgqgVP.png)<-

Coordinators can grant students mentor privileges on account creation. By default this flag is set to false.
![Student account registration](https://i.imgur.com/mb393T4.pnga)

Staff registration allows staff members to be allocated to groups as supervisors
![Staff account registration](https://i.imgur.com/DQhuT4J.png)

### Creating Subjects

The subjects page can be reached from the group panel in the dashboard.
->![Manage Subjects link](https://i.imgur.com/XWnzxwD.png)<-

This page contains a page to add new subjects
![Add Subjects form](https://i.imgur.com/kP27A7h.png)

As well as a dynamically generated list of existing subjects, with links to delete them
![Subjects list](https://i.imgur.com/p5yphEq.png)

> !!! danger A subject named 'Mentor Application' is used for students to apply for mentorship. The database should contain one subject with this name to function properly, which is why it doesn't show a delete link.

### Timeslot Seed Data

> !!! This step is important when working with a new database file, but can otherwise be ignored

In order for student availabilities to function properly, the database needs to be seeded with timeslot data. This can be done while the server is running by sending an API request. Note that the request points to the port the server is running on, which differs from the client.

->![Timeslots API call](https://i.imgur.com/GJwopdU.png)<-

Sending a post request with flag: true in the body will populate the timeslots table with data if it is empty. The results are displayed below.

->![Timeslots data](https://i.imgur.com/7CY710I.png)<-


### Creating Applications

With the initial setup completed we can work on the core functionality of the SMS -- Applications. The form to create them can be reached directly from the dash.

![Application form](https://i.imgur.com/cTbuES5.png)

For expressions of interest in mentoring/being mentored for a particular subject, simply choose the relevant information from the dropdown menus. For general mentorship applications, select mentor application in the subject dropdown.



### Filling Applications

->![Application example](https://i.imgur.com/gF1R2Mb.png)<-

There are links to fill applications in both the coordinator dashboard and student detail pages (also accessible from the dashboard)

> !!! note Hover over an icon for a description of its function

The Fill Application form is split into two halves. The top will allow creating a new group, displaying a list of mentors that are approved to run sessions for that subject. Multiple mentees can be added upon creation.

![Create new group](https://i.imgur.com/f4Wucda.png)

 A staff supervisor must also be chosen at this stage.

If there are existing groups for that subject with space for another mentor, these will be displayed in the second half of the form. Availabilities for all students are listed to ensure scheduling compatibility.

![Add to existing group](https://i.imgur.com/KEkXMUc.png)

## Installation Guide
- Install node.js https://nodejs.org/en/
- Clone the repository from https://github.com/rtnttn/student-mentoring-system
- Open the server folder
- Make a copy of 'mentor_systemINIT.sqlite' called 'mentor_system.sqlite'
- Open a terminal in the server folder
- enter 'npm i' and wait for it to complete
- enter 'npm run server' and leave the terminal open. This is the node.js server backend
- Open another terminal in the client folder
- enter 'npm i' again and wait for it to complete
- enter 'npm run start' and leave the terminal open. This is the react app that provides the interface
- A browser window should open and display the program
- Create staff, student and subject records before creating applications as detailed in the sections above

> !!! info The INIT database provides only timeslot data and a 'Mentor Application' subject to ensure smooth operation
