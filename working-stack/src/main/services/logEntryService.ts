import dbApi from '../database/api'
import { LogTodayEntry } from '../database/api'
import queries from '../database/queries'
import timeUtils from '../../utils/time-utils'

function getLogEntries(): InputData[] {
  let db = dbApi.loadDB()
  let logEntries: any[] = db.prepare(queries.GET_LOG_ENTRIES).all()
  db.close()

  console.log(`${logEntries.length} entries selected`)

  return logEntries
}

function addOrUpdateLog(input: LogTodayEntry) {
  let TODAY_DATE = timeUtils.todayFormatted()
  let { content, level, activityType } = input

  let db = dbApi.loadDB()
  dbApi.insertOrUpdateLogEntry(db, TODAY_DATE, content, level, activityType)
}

export default { getLogEntries, addOrUpdateLog }
