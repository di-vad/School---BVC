import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from './multer.js';
import { insertData } from './CRUD/insertData.js';
import { readData } from './CRUD/readData.js';
import { deleteRowById } from './CRUD/deleteData.js';
import { updateRowById } from './CRUD/updateData.js';
import { sendEmail } from './mail.js';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve image files from the 'uploads' folder
//This took me way too long...........
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'public')));

//serve the form (HTML page)
//DONE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

//route to serve the view.html and inject event data
//DONE
app.get('/events', (req, res) => {
    //get events from the database
    readData().then(events => {
        //read the HTML file
        const filePath = path.join(__dirname, 'public', 'view.html');
        
        fs.readFile(filePath, 'utf-8', (err, html) => {
            if (err) {
                return res.status(500).send('Error reading HTML file');
            }

            //inject the event data into the HTML
            //replace the script tag with the specified id = eventsData in the view.html
            const modifiedHtml = html.replace('<script id="eventsData"></script>', `
                <script id="eventsData">
                    window.events = ${JSON.stringify(events)};
                </script>
            `);

            //send the modified HTML
            res.send(modifiedHtml);
        });
    }).catch(err => {
        res.status(500).send('Error fetching events');
    });
});



//DONE
app.post('/event', upload.single('eventImage'), async function (req, res) {
    const event = { 
        title: req.body.eventTitle, 
        description: req.body.eventDescription, 
        start_date: req.body.eventStart, 
        end_date: req.body.eventEnd, 
        location: req.body.eventLocation, 
        image_path: req.file ? req.file.filename : null,
        created_at: new Date(), //created_at to current date and time
    };

    try {
        //insert the event into the database
        await insertData(event);
        //res.send('Event added successfully');

        if (req.body.recipient) {
            const recipientEmail = req.body.recipient;
            await sendEmail(recipientEmail, event);
            res.send('Event added successfully, and Email sign-up successful.');
        }
        else {
            res.send('Event added successfully.')
        }

    } catch (err) {
        res.status(500).send('Error adding event');
        console.error('Error adding event:', err);
    }
});

//DONE
//update event
app.put('/update-event/:id', async (req, res) => {
    const eventId = parseInt(req.params.id);
    const updatedData = req.body;

    try {
        await updateRowById(eventId, updatedData);
        res.json({ success: true });
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ success: false });
    }
});

//delete event
app.delete('/delete-event/:id', async (req, res) => {
    const eventId = parseInt(req.params.id);

    try {
        await deleteRowById(eventId);
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ success: false });
    }
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Internal Server Error');
});

// Start the server
// http://localhost:3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
