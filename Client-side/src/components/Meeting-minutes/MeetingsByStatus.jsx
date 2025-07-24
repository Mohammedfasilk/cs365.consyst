import React from 'react';
import MeetingGrid from './MeetingGrid';

const MeetingsByStatus = ({
  meetings,
  onEditMeeting,
  onDeleteMeeting,
  refresh
}) => {
  const upcomingMeetings = meetings.filter(m => m.status === 'upcoming');
  const inProgressMeetings = meetings.filter(m => m.status === 'in-progress');
  const completedMeetings = meetings.filter(m => m.status === 'completed');

  const StatusSection = ({ 
    title, 
    meetings, 
    statusColor 
  }) => {
    if (meetings.length === 0) return null;
    
    return (
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-3 h-3 rounded-full`}></div>
          <h2 className="text-xl font-semibold text-gray-800">
            {title} ({meetings.length})
          </h2>
        </div>
        <MeetingGrid
          meetings={meetings}
          onEditMeeting={onEditMeeting}
          onDeleteMeeting={onDeleteMeeting}
          refresh={refresh}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <StatusSection 
        title="In Progress" 
        meetings={inProgressMeetings}
        statusColor="bg-green-500"
      />
      <StatusSection 
        title="Upcoming" 
        meetings={upcomingMeetings}
        statusColor="bg-blue-500"
      />
      <StatusSection 
        title="Completed" 
        meetings={completedMeetings}
        statusColor="bg-gray-500"
      />
    </div>
  );
};

export default MeetingsByStatus;