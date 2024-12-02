import { config } from "../dbConfig.js";
import sql from 'mssql';

export const updateRowById = async function(id, updatedData) {
  try {
    //connect to the database
    await sql.connect(config);

    //define the SQL query to update the row with the correct columns
    const query = `
      UPDATE dbo.events
      SET 
        title = @title,
        description = @description,
        start_date = @start_date,
        end_date = @end_date,
        location = @location,
        image_path = @image_path,
        created_at = @created_at
      WHERE id = @id
    `;

    //create a new request object
    const request = new sql.Request();

    //add parameters to the request
    request.input('id', sql.Int, id);
    request.input('title', sql.NVarChar, updatedData.title);
    request.input('description', sql.NVarChar, updatedData.description);
    request.input('start_date', sql.DateTime, updatedData.start_date);
    request.input('end_date', sql.DateTime, updatedData.end_date);
    request.input('location', sql.NVarChar, updatedData.location);
    request.input('image_path', sql.NVarChar, updatedData.image_path);
    request.input('created_at', sql.DateTime, updatedData.created_at);

    //execute the query
    await request.query(query);

    console.log('Data updated successfully');
  } catch (err) {
    console.error('Error updating data:', err);
    throw err;
  } finally {
    //ALWAYS EXECUTES
    //close the database connection
    await sql.close();
  }
};
