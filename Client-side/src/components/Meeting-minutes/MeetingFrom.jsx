import { useEffect, useState } from "react";
import { Button } from "../UI/Button";

export const MeetingForm = ({ onSubmit, onCancel, initialData, isSubmitting = false }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [timezone, setTimezone] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [agenda, setAgenda] = useState([]);
  

  // Initialize timezone when component mounts - always detect user's local timezone
  useEffect(() => {
    if (!initialData) {
      // Only auto-detect timezone for new meetings, not when editing
      const detectedTimezone = getUserTimezone();
      const defaultTimezone = getDefaultTimezone();
      
      console.log('MeetingForm - Browser detected timezone:', detectedTimezone);
      console.log('MeetingForm - Available timezones:', TIMEZONES.map(tz => tz.value));
      console.log('MeetingForm - Selected default timezone:', defaultTimezone);
      console.log('MeetingForm - Timezone exists in list:', TIMEZONES.some(tz => tz.value === defaultTimezone));
      console.log('MeetingForm - Timezone is supported:', isTimezoneSupported(defaultTimezone));
      
      // Validate the timezone before setting it
      if (isTimezoneSupported(defaultTimezone)) {
        setTimezone(defaultTimezone);
      } else {
        console.warn('MeetingForm - Default timezone not supported, falling back to UTC');
        setTimezone('UTC');
      }
    }
  }, [initialData]);

  // Set initial data when provided (for editing)
  useEffect(() => {
    if (initialData) {
      console.log('MeetingForm - Received initial data:', initialData);
      
      setTitle(initialData.title);
      setDate(initialData.date);
      setTime(initialData.time);
      
      // Validate timezone from initial data
      const initialTimezone = initialData.timezone || getDefaultTimezone();
      if (isTimezoneSupported(initialTimezone)) {
        setTimezone(initialTimezone);
      } else {
        console.warn('MeetingForm - Initial timezone not supported:', initialTimezone, 'using UTC');
        setTimezone('UTC');
      }
      
      setAttendees(initialData.attendeeEmails || []);
      setAgenda(initialData.agendaItems || []);
    }
  }, [initialData]);

  const resetForm = () => {
    setTitle("");
    setDate("");
    setTime("");
    setDuration("60");
    // Always reset to user's local timezone, but validate it
    const defaultTimezone = getDefaultTimezone();
    if (isTimezoneSupported(defaultTimezone)) {
      setTimezone(defaultTimezone);
    } else {
      setTimezone('UTC');
    }
    setAttendees([]);
    setAgenda([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !date || !time || !timezone || isSubmitting) {
      console.log('MeetingForm - Missing required fields or submitting:', { 
        title: !title.trim(), 
        date: !date, 
        time: !time, 
        timezone: !timezone,
        isSubmitting
      });
      return;
    }

    // Final timezone validation before submission
    if (!isTimezoneSupported(timezone)) {
      console.error('MeetingForm - Unsupported timezone selected:', timezone);
      // Force to UTC if somehow an unsupported timezone was selected
      setTimezone('UTC');
      return;
    }

    const meetingData = {
      title: title.trim(),
      date,
      time,
      timezone,
      attendees: attendees.map(email => ({ email })),
      agenda,
      attendeeEmails: attendees,
      agendaItems: agenda,
    };

    console.log('MeetingForm - Submitting meeting data:', {
      ...meetingData,
      attendeeCount: attendees.length,
      agendaCount: agenda.length,
      userDetectedTimezone: getUserTimezone(),
      timezoneSupported: isTimezoneSupported(timezone)
    });
    
    onSubmit(meetingData);
    if (!initialData) {
      resetForm();
    }
  };

  const handleCancel = () => {
    if (!initialData) {
      resetForm();
    }
    onCancel();
  };

  const isFormDisabled = isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset disabled={isFormDisabled} className="space-y-6">
        <BasicInfoSection
          title={title}
          date={date}
          time={time}
          duration={duration}
          timezone={timezone}
          onTitleChange={setTitle}
          onDateChange={setDate}
          onTimeChange={setTime}
          onDurationChange={setDuration}
          onTimezoneChange={setTimezone}
        />

        <AttendeesSection
          attendees={attendees}
          onAttendeesChange={setAttendees}
        />

        <AgendaSection
          agenda={agenda}
          onAgendaChange={setAgenda}
        />
      </fieldset>

      <div className="flex gap-3 pt-4">
        <Button 
          type="submit" 
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          disabled={!title.trim() || !date || !time || !timezone || isSubmitting || !isTimezoneSupported(timezone)}
        >
          {isSubmitting ? 'Processing...' : (initialData ? 'Update Meeting' : 'Create Meeting')}
        </Button>
        <Button 
          type="button" 
          onClick={handleCancel} 
          variant="outline" 
          className="flex-1"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
