import { Calendar, Clock, Users } from "lucide-react";
import { formatDateTimeInTimezone, getUserTimezone, TIMEZONES } from "../../utils/timezoneUtils";
import { Card, CardHeader, CardTitle } from "../UI/Card";

const MeetingInfoCard = ({ title, date, time, attendeeCount, timezone }) => {
  // Format the date and time in user's local timezone
  const userTimezone = getUserTimezone();
  const meetingTimezone = timezone || 'UTC';
  
  // Get timezone display name
  const timezoneInfo = TIMEZONES.find(tz => tz.value === meetingTimezone);
  const timezoneDisplay = timezoneInfo ? timezoneInfo.label.split(' ')[0] : meetingTimezone;
  
  // Format date in a more detailed way with error handling
  const formatDetailedDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string:', dateStr);
        return dateStr; // Return original string if invalid
      }
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting detailed date:', error, dateStr);
      return dateStr; // Return original string on error
    }
  };

  // Safe timezone formatting with error handling
  const getFormattedDateTime = () => {
    try {
      const { date: localDate, time: localTime } = formatDateTimeInTimezone(
        date, 
        time, 
        meetingTimezone, 
        userTimezone
      );
      return { localDate, localTime };
    } catch (error) {
      console.error('Error formatting date/time in timezone:', error);
      // Return original values if timezone conversion fails
      return { localDate: date, localTime: time };
    }
  };

  const { localDate, localTime } = getFormattedDateTime();

  const detailedDate = formatDetailedDate(date);
  const userTimezoneInfo = TIMEZONES.find(tz => tz.value === userTimezone);
  const userTimezoneDisplay = userTimezoneInfo ? userTimezoneInfo.label.split(' ')[0] : userTimezone;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {detailedDate}
              {meetingTimezone !== 'UTC' && (
                <span className="text-xs text-gray-500 ml-1">
                  ({timezoneDisplay})
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {time}
              {userTimezone !== meetingTimezone && localTime !== time && (
                <span className="text-xs text-gray-500 ml-1">
                  (Your time: {localTime} {userTimezoneDisplay})
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {attendeeCount} participants
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default MeetingInfoCard;
