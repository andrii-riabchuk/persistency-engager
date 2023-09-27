import dbApi from '../database/api'
import { LogTodayEntry } from '../database/api'
import queries from '../database/queries'
import timeUtils from '../../utils/time-utils'

interface Cache {
  [key: string]: any[]
}

export class LogEntryService {
  _logEntriesCache: Cache = {}

  getLastYearLogEntries(reloadCache: boolean = false) {
    let lastYearRange: [string, string] = timeUtils.lastYearRangeFormatted()
    // "'2023-09-11','2023-09-13"
    let key = lastYearRange.toString()

    if (!this._logEntriesCache[key] || reloadCache)
      this._logEntriesCache[key] = this.getLogEntriesForDateRange(...lastYearRange)

    console.log('retrieved from cache')
    return this._logEntriesCache[key]
  }

  getLogEntriesForDateRange(from: string, to: string) {
    let db = dbApi.loadDB()
    let logEntries: any[] = db.prepare(queries.GET_LOG_ENTRIES_FOR_DATE_RANGE).all(from, to)
    db.close()

    console.log(`${logEntries.length} entries selected`)
    return logEntries
  }

  addOrUpdateLog(input: LogTodayEntry) {
    let TODAY_DATE = timeUtils.todayFormatted()
    let { content, level, activityType } = input

    let db = dbApi.loadDB()
    dbApi.insertOrUpdateLogEntry(db, TODAY_DATE, content, level, activityType)

    // reload for cache
    this.getLastYearLogEntries(true)
  }
}
