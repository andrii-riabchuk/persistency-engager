import { Notification } from 'electron'

import { CronJob } from 'cron'

function CreateReminderNotification(): Notification {
  const NOTIFICATION_TITLE = 'Шухер'
  const NOTIFICATION_BODY = 'Ти гадину бачів? \nПісяти і логувати'

  let notification = new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY })
  return notification
}

function showReminderNotification(onClick: (event) => void) {
  let notification = CreateReminderNotification()
  notification.show()
  notification.on('click', onClick)
}

function createCronJob(fn, hour, minute): CronJob {
  return new CronJob(`00 ${minute} ${hour} * * *`, fn, null, true)
}

export function scheduleReminder(onWindowRequested: () => void) {
  let fn = () => showReminderNotification((_) => onWindowRequested())

  createCronJob(fn, 10, 0) // 12: 00 am
  createCronJob(fn, 23, 30) // 23:30
}
