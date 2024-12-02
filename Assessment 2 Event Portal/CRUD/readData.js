import { config } from "../dbConfig.js";
import sql from 'mssql';

export const readData = async function() {
  try {

    await sql.connect(config);


    const query = 'SELECT * FROM dbo.events';


    const request = new sql.Request();


    const result = await request.query(query);


    const data = result.recordset;
    console.log('Data retrieved successfully:');
    return data;
  } catch (err) {
    console.error('Error reading data:', err);
  } finally {

    await sql.close();
  }
}

 
