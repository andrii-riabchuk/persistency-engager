import dbApi from '../database/api'
import { LogTodayEntry } from '../database/api'
import queries from '../database/queries'
import timeUtils from '../../utils/time-utils'

export interface ActivityType {
  id: number
  name: string
}
export class LogEntryService {
  getActivities(): ActivityType[] {
    let db = dbApi.loadDB()
    let activities = dbApi.getActivities(db).map((x) => ({ id: x['Id'], name: x['Name'] }))

    return activities
  }

  getActivityName(): string {
    let db = dbApi.loadDB()
    let activities = dbApi.getActivities(db)
    db.close()

    return activities[0]['Name']
  }

  updateActivityName(newName: any): any {
    let db = dbApi.loadDB()

    db.prepare(`UPDATE ActivityType SET [Name] = '${newName}' WHERE [Id] = 1`).run()
    db.close()
  }

  getLastYearLogEntries() {
    let lastYearRange: [string, string] = timeUtils.lastYearRangeFormatted()

    let res = this.getLogEntriesForDateRange(...lastYearRange)

    return res
  }

  getLogEntriesForDateRange(from: string, to: string) {
    let db = dbApi.loadDB()
    let logEntries: any[] = db.prepare(queries.GET_LOG_ENTRIES_FOR_DATE_RANGE).all(from, to)
    db.close()

    let activityTypes = new Set(logEntries.map((x) => x['ActivityTypeId']))
    let activityName = this.getActivities().reduce((res, cur) => {
      res[cur.id] = cur.name
      return res
    }, {})

    // console.log(logEntries)
    let grouped = logEntries.reduce((res, cur) => {
      let groupName = activityName[cur.ActivityTypeId]
      ;(res[groupName] = res[groupName] || []).push(cur)
      return res
    }, {})

    grouped['activityTypes'] = this.getActivities()

    return grouped
  }

  addOrUpdateLog(input: LogTodayEntry) {
    let TODAY_DATE = timeUtils.todayFormatted()
    let { content, level, activityType } = input

    let db = dbApi.loadDB()
    dbApi.insertOrUpdateLogEntry(db, TODAY_DATE, content, level, activityType)

    db.close()
  }
}
