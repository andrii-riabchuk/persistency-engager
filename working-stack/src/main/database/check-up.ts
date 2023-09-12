import Database from 'better-sqlite3'

import { app } from 'electron'
import fs from 'fs'
import path from 'path'

let getDbPath = () => path.join(app.getPath('userData'), 'userdata.db')

export function dbCheckup() {
  let dbPath = getDbPath()
  let db
  try {
    db = new Database(dbPath, { fileMustExist: true })
    console.log('DB already exists')
  } catch (err) {
    db = initDb(dbPath)
  }
  if (db) db.close()
}

function initDb(dbPath: string) {
  console.log('Creating new db', dbPath)

  let db = new Database(dbPath)
  fs.readFile(
    path.join(__dirname, '..', '..', 'db', 'schema.sql'),
    'utf-8',
    (err, sql_create_schema) => {
      if (err) console.log('Failed to read schema.sql')
      else
        db.exec(sql_create_schema, (err) => {
          if (err) console.log('Failed to execute schema.sql')
        })
    }
  )

  return db
  // db.each('SELECT * FROM sqlite_master', (err, row)=>{
  //   console.log('row', row);
  // });
}
