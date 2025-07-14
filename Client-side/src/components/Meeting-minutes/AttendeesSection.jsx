import { useState } from 'react';
import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';
import { X, Plus, User } from 'lucide-react';

const AttendeesSection = ({ attendees, onAttendeesChange }) => {
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '', role: '' });

  const addAttendee = () => {
    console.log('Adding attendee:', newAttendee);
    if (newAttendee.email.trim()) {
      const attendee = {
        email: newAttendee.email.trim()
      };
      onAttendeesChange([...attendees, attendee]);
      setNewAttendee({ email: '' });
    }
  };

  const removeAttendee = (id) => {
    onAttendeesChange(attendees.filter(attendee => attendee.id !== id));
  };



  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-gray-600" />
        <Label className="text-lg font-semibold">Attendees</Label>
      </div>

      {/* Add new attendee */}
      <div className="flex justify-between gap-2">
        <div className='w-full'>
          <Label htmlFor="attendee-email">Email *</Label>
          <Input
            id="attendee-email"
            type="email"
            value={newAttendee.email}
            onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
            placeholder="Enter email"
          />
        </div>
        <div className="flex items-end gap-2">
          <Button
            type="button"
            onClick={addAttendee}
            disabled={!newAttendee.email.trim()}
            className="px-3"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Attendees list */}
      {attendees.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Attendees List</Label>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {attendees.map((attendee) => (
              <div
                key={attendee.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex-1">
                  <div className="font-medium">{attendee.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAttendee(attendee.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 

export { AttendeesSection };