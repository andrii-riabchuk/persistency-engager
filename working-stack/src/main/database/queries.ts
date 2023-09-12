const GET_LOG_ENTRIES = 'SELECT * FROM LogEntry'
const GET_LOG_ENTRY_BY_DATE = 'SELECT * FROM LogEntry WHERE DateTime = ?'

const INSERT_LOG_ENTRY =
  'INSERT INTO LogEntry (DateTime, Content, Level, ActivityTypeId) VALUES (?, ?, ?, ?)'

const UPDATE_LOG_ENTRY = 'UPDATE LogEntry SET Content = ?, Level = ? WHERE DateTime = ?'
export default { GET_LOG_ENTRIES, GET_LOG_ENTRY_BY_DATE, INSERT_LOG_ENTRY, UPDATE_LOG_ENTRY }
