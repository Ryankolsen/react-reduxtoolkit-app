import { parseISO, formatDistanceToNow } from 'date-fns/esm'
import React from 'react'

export const TimeAgo = ({ timestamp }) => {
  let TimeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    TimeAgo = `${timePeriod} ago`
  }

  return (
    <span title={timestamp}>
      <i> {TimeAgo}</i>
    </span>
  )
}
