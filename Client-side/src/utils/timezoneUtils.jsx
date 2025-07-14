export const TIMEZONES = [
  // UTC
  { value: 'UTC', label: 'UTC (Coordinated Universal Time) GMT+0:00' },
  
  // North America
  { value: 'America/New_York', label: 'Eastern Time (New York, Toronto) GMT-5:00/-4:00' },
  { value: 'America/Chicago', label: 'Central Time (Chicago, Mexico City) GMT-6:00/-5:00' },
  { value: 'America/Denver', label: 'Mountain Time (Denver, Phoenix) GMT-7:00/-6:00' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (Los Angeles, Vancouver) GMT-8:00/-7:00' },
  { value: 'America/Anchorage', label: 'Alaska Time (Anchorage) GMT-9:00/-8:00' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (Honolulu) GMT-10:00' },
  
  // South America
  { value: 'America/Sao_Paulo', label: 'Brazil Time (São Paulo, Rio de Janeiro) GMT-3:00/-2:00' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Argentina Time (Buenos Aires) GMT-3:00' },
  
  // Europe
  { value: 'Europe/London', label: 'Greenwich Mean Time (London, Dublin) GMT+0:00/+1:00' },
  { value: 'Europe/Paris', label: 'Central European Time (Paris, Berlin, Rome) GMT+1:00/+2:00' },
  { value: 'Europe/Berlin', label: 'Central European Time (Berlin, Amsterdam) GMT+1:00/+2:00' },
  { value: 'Europe/Rome', label: 'Central European Time (Rome, Madrid) GMT+1:00/+2:00' },
  { value: 'Europe/Madrid', label: 'Central European Time (Madrid, Barcelona) GMT+1:00/+2:00' },
  { value: 'Europe/Stockholm', label: 'Central European Time (Stockholm, Oslo) GMT+1:00/+2:00' },
  { value: 'Europe/Athens', label: 'Eastern European Time (Athens, Helsinki) GMT+2:00/+3:00' },
  { value: 'Europe/Moscow', label: 'Moscow Time (Moscow, St. Petersburg) GMT+3:00' },
  
  // Asia - Fixed India timezone mapping
  { value: 'Asia/Dubai', label: 'Gulf Standard Time (Dubai, Abu Dhabi) GMT+4:00' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (Mumbai, Delhi, Bangalore) GMT+5:30' },
  { value: 'Asia/Colombo', label: 'Sri Lanka Time (Colombo) GMT+5:30' },
  { value: 'Asia/Dhaka', label: 'Bangladesh Time (Dhaka) GMT+6:00' },
  { value: 'Asia/Bangkok', label: 'Indochina Time (Bangkok, Ho Chi Minh City) GMT+7:00' },
  { value: 'Asia/Singapore', label: 'Singapore Time (Singapore, Kuala Lumpur) GMT+8:00' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (Beijing, Shanghai) GMT+8:00' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong Time (Hong Kong) GMT+8:00' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (Tokyo, Osaka) GMT+9:00' },
  { value: 'Asia/Seoul', label: 'Korea Standard Time (Seoul) GMT+9:00' },
  
  // Africa
  { value: 'Africa/Cairo', label: 'Eastern European Time (Cairo) GMT+2:00' },
  { value: 'Africa/Johannesburg', label: 'South Africa Time (Johannesburg, Cape Town) GMT+2:00' },
  { value: 'Africa/Lagos', label: 'West Africa Time (Lagos, Accra) GMT+1:00' },
  
  // Oceania
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (Sydney, Melbourne) GMT+10:00/+11:00' },
  { value: 'Australia/Perth', label: 'Australian Western Time (Perth) GMT+8:00' },
  { value: 'Pacific/Auckland', label: 'New Zealand Time (Auckland, Wellington) GMT+12:00/+13:00' },
];

// Enhanced function to get user's timezone with better detection and validation
export const getUserTimezone = () => {
  try {
    // Method 1: Use Intl.DateTimeFormat - most reliable
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (detectedTimezone) {
      // Handle legacy timezone names and normalize
      const normalizedTimezone = normalizeTimezone(detectedTimezone);
      return normalizedTimezone;
    }
  } catch (error) {
    console.warn('Error detecting timezone via Intl.DateTimeFormat:', error);
  }

  // Fallback to UTC if all methods fail
  return 'UTC';
};

// Function to normalize timezone names for consistency
const normalizeTimezone = (timezone) => {
  // Handle legacy and alternative timezone names
  const timezoneMap = {
    'Asia/Calcutta': 'Asia/Kolkata',
    'US/Eastern': 'America/New_York',
    'US/Central': 'America/Chicago',
    'US/Mountain': 'America/Denver',
    'US/Pacific': 'America/Los_Angeles',
    'Europe/Kiev': 'Europe/Kyiv',
  };

  return timezoneMap[timezone] || timezone;
};

// Enhanced function to find the best matching timezone with strict validation
export const getDefaultTimezone = () => {
  const detectedTimezone = getUserTimezone();
  
  // First, check if the detected timezone exists exactly in our supported list
  const exactMatch = TIMEZONES.find(tz => tz.value === detectedTimezone);
  
  if (exactMatch) {
    return detectedTimezone;
  }

  // If no exact match, try to find a safe regional fallback
  const regionalFallbacks = {
    // India region - always use Kolkata for IST
    'Asia/Calcutta': 'Asia/Kolkata',
    'Asia/Kolkata': 'Asia/Kolkata',
    
    // Gulf region - use Dubai as primary
    'Asia/Dubai': 'Asia/Dubai',
    'Asia/Kuwait': 'Asia/Dubai',
    'Asia/Qatar': 'Asia/Dubai',
    'Asia/Bahrain': 'Asia/Dubai',
    
    // US regions
    'America/New_York': 'America/New_York',
    'America/Detroit': 'America/New_York',
    'America/Chicago': 'America/Chicago',
    'America/Denver': 'America/Denver',
    'America/Los_Angeles': 'America/Los_Angeles',
    
    // Europe regions
    'Europe/London': 'Europe/London',
    'Europe/Paris': 'Europe/Paris',
    'Europe/Berlin': 'Europe/Berlin',
    'Europe/Rome': 'Europe/Rome',
    
    // Asia Pacific
    'Asia/Singapore': 'Asia/Singapore',
    'Asia/Tokyo': 'Asia/Tokyo',
  };

  // Check if we have a regional fallback
  if (regionalFallbacks[detectedTimezone]) {
    const fallbackTimezone = regionalFallbacks[detectedTimezone];
    return fallbackTimezone;
  }

  // For any timezone that doesn't have an exact match or fallback, use UTC
  return 'UTC';
};

// Function to validate if a timezone is supported
export const isTimezoneSupported = (timezone) => {
  const supportedTimezones = TIMEZONES.map(tz => tz.value);
  return supportedTimezones.includes(timezone);
};

// Function to format date/time in user's timezone with better error handling
export const formatDateTimeInTimezone = (date, time, timezone, userTimezone) => {
  try {
    const targetTimezone = userTimezone || getUserTimezone();


    // Validate input date and time
    if (!date || !time) {
      console.warn('formatDateTimeInTimezone - Missing date or time:', { date, time });
      return { date: date || '', time: time || '' };
    }

    // Create a proper datetime string for parsing
    let dateTimeString;
    
    // Handle different time formats
    if (time.includes(':')) {
      // Time is in HH:MM or HH:MM:SS format
      const timeParts = time.split(':');
      if (timeParts.length >= 2) {
        const hours = timeParts[0].padStart(2, '0');
        const minutes = timeParts[1].padStart(2, '0');
        const seconds = timeParts[2] || '00';
        dateTimeString = `${date}T${hours}:${minutes}:${seconds}`;
      } else {
        console.warn('formatDateTimeInTimezone - Invalid time format:', time);
        return { date, time };
      }
    } else {
      console.warn('formatDateTimeInTimezone - Time does not contain colon:', time);
      return { date, time };
    }


    // Create a Date object from the meeting date and time
    const meetingDateTime = new Date(dateTimeString);
    
    // Validate the created date
    if (isNaN(meetingDateTime.getTime())) {
      console.error('formatDateTimeInTimezone - Invalid date created from:', dateTimeString);
      return { date, time };
    }

    
    // Format the date and time in the target timezone
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: targetTimezone,
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const parts = formatter.formatToParts(meetingDateTime);
    const formattedDate = `${parts.find(p => p.type === 'day')?.value} ${parts.find(p => p.type === 'month')?.value} ${parts.find(p => p.type === 'year')?.value}`;
    const formattedTime = `${parts.find(p => p.type === 'hour')?.value}:${parts.find(p => p.type === 'minute')?.value}`;
    

    return {
      date: formattedDate,
      time: formattedTime
    };
  } catch (error) {
    console.error('formatDateTimeInTimezone - Error formatting date/time in timezone:', error);
    console.error('formatDateTimeInTimezone - Input values were:', { date, time, timezone, userTimezone });
    return { date, time };
  }
}; 