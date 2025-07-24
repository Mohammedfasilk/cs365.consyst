import React from 'react';
import MeetingCard from './MeetingCard'; // Adjust the import path if needed

const MeetingGrid = ({
  meetings,
  onEditMeeting,
  onDeleteMeeting,
  refresh
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {meetings.map((meeting) => (
        <MeetingCard 
          key={meeting.id || meeting._id} 
          meeting={meeting}
          onEditMeeting={onEditMeeting}
          refresh={refresh}
          onDeleteMeeting={onDeleteMeeting}
          onUpdateStatus={() => {}} // Placeholder for status updates
        />
      ))}
    </div>
  );
}; 

export default MeetingGrid;