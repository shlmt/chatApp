import { DatePipe } from '@angular/common';
import { RelativeTimePipe } from './relative-time.pipe';

describe('RelativeTimePipe', () => {
  let pipe: RelativeTimePipe
  let datePipeMock: jasmine.SpyObj<DatePipe>

  beforeEach(() => {
    datePipeMock = jasmine.createSpyObj('DatePipe', ['transform']);
    pipe = new RelativeTimePipe(datePipeMock);
  });


  it('should create an instance', () => {
    expect(pipe).toBeTruthy()
  });

  it('should show right now', () => {
    const result = pipe.transform(new Date().getTime())
    expect(result).toBe('right now')
  });

  it('should show right now - before 50 seconds', () => {
    const now = Date.now()
    const result = pipe.transform(new Date(now-50*1000).getTime())
    expect(result).toBe('right now')
  });

  it('should show a minute ago', () => {
    const now = Date.now()
    const result = pipe.transform(new Date(now-119*1000).getTime())
    expect(result).toBe('a minute ago')
  });

  it('should show 2 minutes ago', () => {
    const now = Date.now()
    const result = pipe.transform(new Date(now-2*60*1000).getTime())
    expect(result).toBe('2 minutes ago')
  });

  it('should show 59 minutes ago', () => {
    const now = Date.now()
    const result = pipe.transform(new Date(now-59*60*1000).getTime())
    expect(result).toBe('59 minutes ago')
  });

  it('should show an hour ago', () => {
    const now = Date.now()
    const result = pipe.transform(new Date(now-60*60*1000).getTime())
    expect(result).toBe('an hour ago')
  });

  it('should show an hour ago, (an hour&half ago)', () => {
    const now = Date.now()
    const result = pipe.transform(new Date(now-89*60*1000).getTime())
    expect(result).toBe('an hour ago')
  });

  it('should show 2 hours ago', () => {
    const now = new Date()
    const earlierToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 2)
    datePipeMock.transform.and.returnValue('14:00')
    const result = pipe.transform(earlierToday.getTime())
    expect(result).toBe('today 14:00')
    expect(datePipeMock.transform).toHaveBeenCalledWith(earlierToday, 'HH:mm')
  });  

  it('should show today', () => {
    const now = new Date()
    const earlierToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 2)
    datePipeMock.transform.and.returnValue('14:00')
    const result = pipe.transform(earlierToday.getTime())
    expect(result).toBe('today 14:00')
    expect(datePipeMock.transform).toHaveBeenCalledWith(earlierToday, 'HH:mm')
  }); 
  
  it('should show yesterday when the date is from the previous day', () => {
    const now = new Date();
    const yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
      22 
    )
    datePipeMock.transform.and.returnValue('22:00')
    const result = pipe.transform(yesterday.getTime());
    expect(result).toBe('yesterday 22:00')
    expect(datePipeMock.transform).toHaveBeenCalledWith(yesterday, 'HH:mm')
  });
  
  it('should handle yesterday with an edge case of unexpected datePipe.transform result', () => {
    const now = new Date()
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22);
    datePipeMock.transform.and.returnValue(null)
    const result = pipe.transform(yesterday.getTime())
    expect(result).toBe(`yesterday ${yesterday.toLocaleDateString('he-IL')}`)
  });
  
  it('should return "dd/MM HH:mm" for a time this year', () => {
    const now = new Date()
    const earlierThisYear = new Date(now.getFullYear(), 5, 15, 12)
    datePipeMock.transform.and.returnValue('15/06 12:00')
    const result = pipe.transform(earlierThisYear.getTime())
    expect(result).toBe('15/06 12:00')
    expect(datePipeMock.transform).toHaveBeenCalledWith(earlierThisYear, 'dd/MM HH:mm')
  });

  it('should fallback to toLocaleDateString when datePipe.transform returns null', () => {
    const now = new Date()
    const earlierThisYear = new Date(now.getFullYear(), 5, 15, 12)
    datePipeMock.transform.and.returnValue(null)
    const result = pipe.transform(earlierThisYear.getTime())
    expect(result).toBe(earlierThisYear.toLocaleDateString('he-IL'))
  });
  
  it('should return a localized date string for a time in a previous year', () => {
    const previousYear = new Date(2020, 5, 15, 12).getTime()
    const result = pipe.transform(previousYear)
    expect(result).toBe(new Date(previousYear).toLocaleDateString('he-IL'))
  });

});
