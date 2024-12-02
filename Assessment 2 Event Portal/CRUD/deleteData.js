import { config } from "../dbConfig.js";
import sql from 'mssql'

export const deleteRowById = async function(id) {
    try {
      await sql.connect(config);
      const query = 'DELETE FROM dbo.events WHERE id = @id'; //select by id
      const request = new sql.Request();
      request.input('id', sql.Int, id);
      await request.query(query);
    } catch (err) {
      throw err;
    } finally {
      await sql.close();
    }
  }
  