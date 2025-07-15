import { useSessionUser } from "../../Hooks/useSessionUser";
import AgreementsSection from "./AgreementsSection";
import EditableAgendaSection from "./EditableAgendaSection";
import MeetingInfoCard from "./MeetingInfoCard";
import PendingTopicsSection from "./PendingTopicsSection";

const MeetingDetailContent = ({
  meeting,
  onRefresh,
  onEdit,
  onAddAgreement,
  onEditAgreement,
  onDeleteAgreement,
  onStartMeeting,
  onCloseMeeting,
  onAddAgendaItem,
  onUpdateAgendaItem,
  onDeleteAgendaItem,
  onMoveToPending,
  onMoveToAgenda,
  agreementLoading,
  agendaLoading,
  statusLoading
}) => {

  const user = useSessionUser();
  // Get attendee emails from meeting attendees
  const attendeeEmails = meeting?.attendees?.map(attendee => attendee.email);

    
  // Check if current user is host
  
  const isHost = user && ( // Original owner
    meeting.attendees?.some(attendee => 
      attendee.name === user && attendee.role === 'host'
    )
  );

  return (
    <div className="space-y-6">
      <MeetingInfoCard 
        title={meeting?.title}
        date={meeting?.date}
        time={meeting?.time}
        attendeeCount={meeting?.attendees?.length}
        timezone={meeting?.timezone}
      />
      
      <EditableAgendaSection
        agenda={meeting?.agenda}
        meetingId={meeting?._id}
        meetingStatus={meeting?.status}
        isHost={!!isHost}
        onRefresh={onRefresh}
        // onMoveToPending={onMoveToPending}
      />

      <AgreementsSection
        agreements={meeting?.agreement}
        // onAddAgreement={onAddAgreement}
        // onEditAgreement={onEditAgreement}
        // onDeleteAgreement={onDeleteAgreement}
        // agreementLoading={agreementLoading}
        onRefresh={onRefresh}
        meetingId={meeting._id}
        meetingStatus={meeting?.status}
        attendeeEmails={attendeeEmails}
      />

      <PendingTopicsSection
        pendingTopics={meeting?.pendingTopics}
        meetingStatus={meeting?.status}
        onMoveToAgenda={onMoveToAgenda}
      />
    </div>
  );
};

export default MeetingDetailContent;