import React from "react";
import MeetingActions from "./MeetingActions";
import AttendeesList from "./AttendeesList";


const MeetingDetailSidebar = ({
  meeting,
  refetch,
  handleGeneratePDF,
  emailLoading,
  statusLoading
}) => {
  return (
    <div className="space-y-6">
      <AttendeesList 
        meeting={meeting}
        attendees={meeting.attendees} 
        meetingStatus={meeting.status}
        meetingId={meeting._id}
        meetingOwnerId={meeting.host}
        onRefresh={refetch}
      />
      <MeetingActions
        meetingId={meeting.id}
        meetingStatus={meeting.status}
        ownerId={meeting.owner_id}
        attendees={meeting.attendees}
        onGeneratePDF={handleGeneratePDF}
        emailLoading={emailLoading}
        statusLoading={statusLoading}
      />
    </div>
  );
};

export default MeetingDetailSidebar; 