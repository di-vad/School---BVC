import sql from 'mssql';
import { config } from '../dbConfig.js';

export const insertData = async function(event) {
  try {
    //connect to the database
    await sql.connect(config);

    //the data to insert
    const data = {
      title: event.title, 
      description: event.description, 
      start_date: event.start_date, 
      end_date: event.end_date, 
      location: event.location, 
      image_path: event.image_path,  
      created_at: event.created_at 
    };

    //the SQL query
    const query = `
      INSERT INTO dbo.events (title, description, start_date, end_date, location, image_path, created_at)
      VALUES (@title, @description, @start_date, @end_date, @location, @image_path, @created_at)
    `;

    //create a new request object
    const request = new sql.Request();

    //add parameters to the request
    request.input('title', sql.NVarChar, data.title);
    request.input('description', sql.NVarChar, data.description);
    request.input('start_date', sql.DateTime, data.start_date);
    request.input('end_date', sql.DateTime, data.end_date);
    request.input('location', sql.NVarChar, data.location);
    request.input('image_path', sql.NVarChar, data.image_path);
    request.input('created_at', sql.DateTime, data.created_at);

    //execute the query
    const result = await request.query(query);

    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    //close the database connection
    await sql.close();
  }
};
