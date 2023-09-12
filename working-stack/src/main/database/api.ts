import { app } from 'electron'
import path from 'path'

import Database from 'better-sqlite3'
import queries from './queries'

import { ContributionCalendar } from 'react-contribution-calendar'

export interface LogTodayEntry {
  content: string
  level: number
  activityType: number
}

let getDbPath = () => path.join(app.getPath('userData'), 'userdata.db')

function getLogEntries(): InputData[] {
  let db = loadDB()
  let logEntries: any[] = db.prepare(queries.GET_LOG_ENTRIES).all()
  db.close()

  console.log(`${logEntries.length} entries selected`)

  //   let todayEntry = entriesTransformed.find(
  //     (log) => log.DateTime == new Date().toISOString().slice(0, 10)
  //   )

  return logEntries
}

function addOrUpdateLog(input: LogTodayEntry): boolean {
  let db
  try {
    db = loadDB()

    let dateTimeToday = new Date().toISOString().slice(0, 10)
    let content = input.content
    let level = input.level
    let activityType = input.activityType

    let today_entry = db.prepare(queries.GET_LOG_ENTRY_BY_DATE).get(dateTimeToday)
    if (today_entry) {
      // SET (Content, Level) WHERE (DateTime)
      db.prepare(queries.UPDATE_LOG_ENTRY).run(content, level, dateTimeToday)
    } else {
      //LogEntry - (DateTime, Content, Level, ActivityTypeId)
      db.prepare(queries.INSERT_LOG_ENTRY).run(dateTimeToday, content, level, activityType)
    }

    return true
  } catch (err) {
    if (db) db.close()
    console.log(err)
    return false
  }
}

function loadDB(): Database {
  return new Database(getDbPath())
}

export default { getLogEntries, addOrUpdateLog }
