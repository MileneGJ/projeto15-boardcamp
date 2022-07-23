import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const user = 'postgres';
const password = '147MgJ';
const host = 'localhost';
const port = 5432;
const database = 'boardcamp';


const connection = new Pool({
  user,
  password,
  host,
  port,
  database
  });

  export default connection