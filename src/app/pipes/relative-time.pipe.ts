import { Pipe } from '@angular/core'
import { DatePipe } from '@angular/common'

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe {

  constructor(private datePipe: DatePipe) {}

  transform(value: number): string {
    const now = new Date()
    const date = new Date(value)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'right now'
    if (diffInSeconds < 120) return 'a minute ago'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 5400) return `an hour ago`
    if (now.toDateString() == date.toDateString()) return `today ${this.datePipe.transform(date, 'HH:mm') ?? date.toLocaleDateString('he-IL')}`
    let yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toDateString()
    if (yesterday == date.toDateString()) return `yesterday ${this.datePipe.transform(date, 'HH:mm') ?? date.toLocaleDateString('he-IL')}`
    if (date.getFullYear()==now.getFullYear()) return this.datePipe.transform(date, 'dd/MM HH:mm') ?? date.toLocaleDateString('he-IL')
    return date.toLocaleDateString('he-IL')
  }

}
