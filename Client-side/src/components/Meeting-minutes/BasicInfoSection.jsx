import { Input } from '../UI/Input';
import {Label} from '../UI/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../UI/Select';
import { TIMEZONES, getDefaultTimezone } from '../../utils/timezoneUtils';

 const BasicInfoSection = ({
  title,
  date,
  time,
  duration,
  timezone,
  onTitleChange,
  onDateChange,
  onTimeChange,
  onDurationChange,
  onTimezoneChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Meeting Title *</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter meeting title"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => onDurationChange(e.target.value)}
            placeholder="60"
            min="15"
            step="15"
          />
        </div>

        <div>
          <Label htmlFor="timezone">Timezone *</Label>
          <Select value={timezone} onValueChange={onTimezoneChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              {TIMEZONES.map(tz => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export { BasicInfoSection };