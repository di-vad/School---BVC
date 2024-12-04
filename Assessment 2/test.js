app.get('/events', async (req, res) => {
    try {

        const events = await readData();
        //console.log(events);


        const filePath = path.join(__dirname, 'public', 'view.html');
        const html = await fs.promises.readFile(filePath, 'utf-8');


        const modifiedHtml = html.replace('<script id="eventsData"></script>', `
            <script id="eventsData">
                window.events = ${JSON.stringify(events)};
            </script>
        `);


        res.send(modifiedHtml);
    } catch (err) {
        res.status(500).send('Error fetching events');
    }
});