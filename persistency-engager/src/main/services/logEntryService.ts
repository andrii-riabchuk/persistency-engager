import dbApi from '../database/api'
import { LogTodayEntry } from '../database/api'
import queries from '../database/queries'
import timeUtils from '../../utils/time-utils'

interface Cache {
  [key: string]: any[]
}

export class LogEntryService {
  _logEntriesCache: Cache = {}

  getActivityName(): string {
    console.log('LogEntryService: getting ActivityName')
    let db = dbApi.loadDB()
    let mainActivity = dbApi.getActivities(db)
    db.close()

    return mainActivity['Name']
  }

  updateActivityName(newName: any): any {
    let db = dbApi.loadDB()

    db.prepare(`UPDATE ActivityType SET [Name] = '${newName}' WHERE [Id] = 1`).run()
    db.close()
  }

  getLogEntry(selectedDate: string) {
    let key = Object.keys(this._logEntriesCache)[0]
    let logEntries = this._logEntriesCache[key]

    let selectedDayLog = logEntries.find((x) => x.DateTime == selectedDate)
    return selectedDayLog
    //     setSelectedDateContent({ ...selectedDateContent, content: selectedDayLog_?.Content })
  }

  getLastYearLogEntries(reloadCache: boolean = false) {
    let lastYearRange: [string, string] = timeUtils.lastYearRangeFormatted()
    // "'2023-09-11','2023-09-13"
    let key = lastYearRange.toString()

    // if (!this._logEntriesCache[key] || reloadCache)
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

    db.close()
  }
}
