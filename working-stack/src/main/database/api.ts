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

function getLogEntries(): [InputData[], LogTodayEntry | undefined] {
  let db = loadDB()
  let logEntries: any[] = db.prepare(queries.GET_LOG_ENTRIES).all()
  console.log('select from logentry', logEntries)
  // let map = logEntries.map()
  function formatUnixDate(datetimestamp: number) {
    return new Date(datetimestamp * 1000).toISOString().slice(0, 10)
  }

  let res = logEntries.map((row) => {
    return { [formatUnixDate(row.DateTime)]: { level: row.Level } }
  })
  console.log(`${res.length} entries selected`)

  db.close()
  let entriesTransformed = logEntries.map((row) => {
    return { ...row, DateTime: formatUnixDate(row.DateTime) }
  })
  let todayEntry = entriesTransformed.find(
    (log) => log.DateTime == new Date().toISOString().slice(0, 10)
  )

  return [res, todayEntry]
}

function addOrUpdateLog(input: LogTodayEntry): boolean {
  let db
  try {
    db = loadDB()

    //LogEntry - (DateTime, Content, Level, ActivityTypeId)
    let today_unix = Math.floor(new Date().setUTCHours(0, 0, 0, 0) / 1000)
    let content = input.content
    let level = input.level
    let activityType = input.activityType

    let today_entry = db.prepare(queries.GET_LOG_ENTRY_BY_DATE).get(today_unix)
    if (today_entry) {
      // SET (Content, Level) WHERE (DateTime)
      db.prepare(queries.UPDATE_LOG_ENTRY).run(content, level, today_unix)
    } else {
      db.prepare(queries.INSERT_LOG_ENTRY).run(today_unix, content, level, activityType)
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
