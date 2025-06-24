import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';

function Calendar({
  value,
  onChange,
  label = 'Select date',
  ...props
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
      label={label}
      value={value}
      onChange={onChange}
      renderInput={(params)=><TextField {...params} fullWidth />}
      {...props}
      />
    </LocalizationProvider>
  );
}
export { Calendar };
