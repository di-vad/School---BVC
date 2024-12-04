**The program allows for:**
- Basic CRUD Opertions, with regards to the "events" being added, updated, read, and deleted.
- A frontend interface to perform these CRUD operations.
- A connection to an MSSQL server, and the CRUD operations perform the appropriate functions as done in the web interface.

**In detail:**
- Can upload files(Images in this case) using the multer.js api. Upload to the "uploads" folder.
- Send Email(s) to recipients using mail.js (nodemailer).
- Establish a connection with an SQL server database with dbConfig.js(mssql).

**CRUD**:
- **Add** new events via the "/" directory, will server the form.html(Assessment 2\public\form.html). 
    - The form.html uses input elements and the form element to collect user input, and POST to the database & the "/event" api. 
    - Input Fields can be null, except for the "Title". It also creats a "created at" column, taken from the current time & date.
    - The Email sign-up field can be null. If given a valid email address, it will send a customized message to the address, with the user-given info about the event.
        - The res.send() message is different depending on if an email address was provided or not.

- **Read** the events via the "/events" directory, accessed from the form.html via the top right button. It will serve the view.html(Assessment 2\public\view.html).
    - It reads the data from the database via the insertData.js(Assessment 2\CRUD\insertData.js) api, and injects the row of data/event to the corresponding element in the view.html.
        - The script.js(Assessment 2\public\script.js) handles the display logic for the events. 
            - Specifically: displayEvents function.
                - It populates the table element by creating "cells/'td'" per corresponding column/field.
        - It modifies the html(view.html) by first reading the html file using fs.readFile, reads from the database using the readData.js(Assessment 2\CRUD\readData.js), and replaces the designated script tag(id:eventsData) in the html, 
        passing the events collected from the readData.js api to the displayEvents function.  

- **Update** events using the "update" button in the view.html(Assessment 2\public\view.html). 
    - It will update the data for the events in both the frontend/web interface(view.html), and the SQL database.
    - The script.js(Assessment 2\public\script.js) handles the update logic for the events. 
        - It utilizes the built-in prompt function to ask the user for the new input(s).
    - There is a limitation where images cannot be updated. The images submitted are still kept in the uploads folder(Assessment 2\uploads).

- **DELETE** events using the deleteData.js(Assessment 2\CRUD\deleteData.js) using the "delete" button in the view.html.
    - It will delete the data row in both the frontend/web interface(view.html), and the SQL database.
    - The script.js(Assessment 2\public\script.js) handles the deletion logic for the events. 
        - It utilizes the built-in prompt function to ask the user for confirmation.
    - The webpage gets refreshed after a deletion showing the new data.