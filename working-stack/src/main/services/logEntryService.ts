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
    const lastYearRange: [string, string] = timeUtils.lastYearRangeFormatted()
    // "'2023-09-11','2023-09-13"
    const key = lastYearRange.toString()

    if (!this._logEntriesCache[key] || reloadCache)
      this._logEntriesCache[key] = this.getLogEntriesForDateRange(...lastYearRange)

    console.log('retrieved from cache')
    return this._logEntriesCache[key]
  }

  getLogEntriesForDateRange(from: string, to: string) {
    const db = dbApi.loadDB()
    const logEntries: any[] = db.prepare(queries.GET_LOG_ENTRIES_FOR_DATE_RANGE).all(from, to)
    db.close()

    console.log(`${logEntries.length} entries selected`)

    return logEntries
  }

  getLogEntriesFromDB() {
    const db = dbApi.loadDB()
    const logEntries: any[] = db.prepare(queries.GET_LOG_ENTRIES).all()
    db.close()

    console.log(`${logEntries.length} entries selected`)

    return logEntries
  }

  addOrUpdateLog(input: LogTodayEntry) {
    const TODAY_DATE = timeUtils.todayFormatted()
    const { content, level, activityType } = input

    const db = dbApi.loadDB()
    dbApi.insertOrUpdateLogEntry(db, TODAY_DATE, content, level, activityType)

    // reload for cache
    this.getLastYearLogEntries(true)
  }
}
