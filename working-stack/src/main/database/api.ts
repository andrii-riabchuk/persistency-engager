import { app } from 'electron'
import path from 'path'

import Database from 'better-sqlite3'
import queries from './queries'

export interface LogTodayEntry {
  content: string
  level: number
  activityType: number
}

const getDbPath = () => path.join(app.getPath('userData'), 'userdata.db')

function loadDB(): Database {
  return new Database(getDbPath())
}

function getLogEntryByDate(db: Database, date: string) {
  return db.prepare(queries.GET_LOG_ENTRY_BY_DATE).get(date)
}

function insertLogEntry(
  db: Database,
  date: string,
  content: string,
  level: number,
  activityTypeId: number
) {
  db.prepare(queries.INSERT_LOG_ENTRY).run(date, content, level, activityTypeId)
}

function updateLogEntry(db, date, content, level) {
  // SET (Content, Level) WHERE (DateTime)
  db.prepare(queries.UPDATE_LOG_ENTRY).run(content, level, date)
}

function insertOrUpdateLogEntry(db, date, content, level, activityTypeId) {
  const today_entry = getLogEntryByDate(db, date)
  if (today_entry) {
    updateLogEntry(db, date, content, level)
  } else {
    insertLogEntry(db, date, content, level, activityTypeId)
  }
}

export default { loadDB, getLogEntryByDate, insertOrUpdateLogEntry }
