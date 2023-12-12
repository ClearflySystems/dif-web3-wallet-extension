import initSqlJs, { Database } from 'sql.js';
//import localforage from 'localforage';
import {Entities, migrations} from "@veramo/data-store";
import {CreateDatabaseBugFix} from '../migration_temp';
import {DataSource} from "typeorm";

const all_migrations = [CreateDatabaseBugFix].concat(migrations);

/**
 * Setup Our Local Database for storage of Accounts/Credentials
 * Using TypeOrm SQL JS with localforage for persistent storage.
 *
 * Note:
 * LocalForage module needs to be included as an externally loaded module and not within the main bundle.
 * index includes: /node_modules/localforage/dist/localforage.js
 */
const initializeDatabase = async () => {

  // Init SQL JS WASM
  const SQL = await initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.9.0/sql-wasm.wasm`
  });

  // Create New DB in Memmory
  const db: Database = new SQL.Database();

  // Define DB Options
  const dbOptions: any = {
    type: 'sqljs',
    driver: SQL,
    database: db.export(),
    useLocalForage: true,
    location: 'browser',
    synchronize: false,
    all_migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities
  }

  // Create DB Connection
  const dbConnection = new DataSource(dbOptions);

  // wrap in try/catch as Veramo Migrations fail currently
  try {
    // Init db Connection
    await dbConnection.initialize();
  }catch(e){
    console.log(e);
  }

  return dbConnection;
}

export const dbConnection = initializeDatabase();