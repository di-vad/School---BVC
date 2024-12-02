document.addEventListener('DOMContentLoaded', () => {
    if (window.events && window.events.length > 0) {
        displayEvents(window.events);  //pass the events to the display function
    } else {
        console.log('No events to display');
    }
});

function displayEvents(events) {
    const tableBody = document.querySelector('#tbodyProduct');
    tableBody.innerHTML = '';  //clear existing table rows

    events.forEach((event) => {
        const row = document.createElement('tr');

        const idBlock = document.createElement('td');
        idBlock.textContent = event.id;
        row.appendChild(idBlock);

        const titleBlock = document.createElement('td');
        titleBlock.textContent = event.title;
        row.appendChild(titleBlock);

        const descriptionBlock = document.createElement('td');
        descriptionBlock.textContent = event.description;
        row.appendChild(descriptionBlock);

        const startBlock = document.createElement('td');
        startBlock.textContent = new Date(event.start_date).toLocaleString();
        row.appendChild(startBlock);

        const endBlock = document.createElement('td');
        endBlock.textContent = new Date(event.end_date).toLocaleString();
        row.appendChild(endBlock);

        const locationBlock = document.createElement('td');
        locationBlock.textContent = event.location;
        row.appendChild(locationBlock);

        const imageBlock = document.createElement('td');
        if (event.image_path) {
            console.log(event.image_path);
            const img = document.createElement('img');
            img.src = `/uploads/${event.image_path}`;

            img.style.maxWidth = '70px'; //value optained by inspecting the image cell, could be bigger...
            img.style.maxHeight = '60px';
            imageBlock.appendChild(img);
        } else {
            imageBlock.textContent = 'No Image'; //display message if no image
        }
        //console.log(event);
        row.appendChild(imageBlock);

        const createdAtBlock = document.createElement('td');
        createdAtBlock.textContent = new Date(event.created_at).toLocaleString();
        row.appendChild(createdAtBlock);

        //add update and delete buttons
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => updateEvent(event.id);
        const updateBlock = document.createElement('td');
        updateBlock.appendChild(updateButton);
        row.appendChild(updateBlock);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteEvent(event.id);
        const deleteBlock = document.createElement('td');
        deleteBlock.appendChild(deleteButton);
        row.appendChild(deleteBlock);

        tableBody.appendChild(row);
    });
}

//DONE
async function updateEvent(eventId) {
    const title = prompt('Enter the event title:');
    if (!title) return; //if the title is empty, exit the function

    const description = prompt('Enter the event description:');
    if (!description) return; //if the description is empty, exit the function

    const start_date = prompt('Enter the event start date and time (YYYY MM DD HH:MM):');
    if (!start_date) return; //if the start date is empty, exit the function

    const end_date = prompt('Enter the event end date and time (YYYY MM DD HH:MM):');
    if (!end_date) return; //if the end date is empty, exit the function

    const location = prompt('Enter the event location:');
    if (!location) return; //if the location is empty, exit the function

    //create the updated event data object
    const updatedData = {
        id: eventId,
        title: title.trim(),
        description: description.trim(),
        start_date: new Date(start_date.trim()).toISOString(),
        end_date: new Date(end_date.trim()).toISOString(),
        location: location.trim(),
        created_at: new Date() //will be a new value 
    };

    try {
        const response = await fetch(`/update-event/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();
        if (data.success) {
            alert('Event updated successfully');
            location.reload(); //reload page to show updated data //TODO
        } else {
            alert('Failed to update event');
        }
    } catch (error) {
        console.error('Error updating event:', error);
    }
}



async function deleteEvent(eventId) {
    const confirmDelete = confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    try {
        const response = await fetch(`/delete-event/${eventId}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
            alert('Event deleted successfully');
            location.reload(); //reload page to remove deleted event
        } else {
            alert('Failed to delete event');
        }
    } catch (error) {
        console.error('Error deleting event:', error);
    }
}

