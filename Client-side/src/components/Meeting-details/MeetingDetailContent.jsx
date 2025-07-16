import axios from "axios";
import { useSessionUser } from "../../Hooks/useSessionUser";
import AgreementsSection from "./AgreementsSection";
import EditableAgendaSection from "./EditableAgendaSection";
import MeetingInfoCard from "./MeetingInfoCard";
import PendingTopicsSection from "./PendingTopicsSection";
import { useMsal } from "@azure/msal-react";

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
  agreementLoading,
  agendaLoading,
  statusLoading
}) => {
  const {accounts} = useMsal()
  const user = accounts[0]?.username

  console.log(user);
  
  // Get attendee emails from meeting attendees
  const attendeeEmails = meeting?.attendees?.map(attendee => attendee.email);

    
  // Check if current user is host
  
  const isHost = user && meeting?.attendees?.some(
  attendee => attendee.email === user && attendee.role === 'host'
);

console.log(isHost);


  
    const onMoveToAgenda = async (index) => {
      if (!meeting) return;
      try {
        await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/handle-agenda`,{
          meetingId:meeting?._id,
          action:'moveToAgenda',
          index:index
        })
  
        // toast({
        //         title: "Agreement Created",
        //         description: "The agreement has been added.",
        //         icon: <CircleCheckIcon className="mr-4" color="green" />,
        //       });
        
        await onRefresh();
      } catch (error) {
  
        console.error('MeetingDetailPage - Error closing meeting:', error);
      }
    };

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
        pendingTopics={meeting?.pending}
        meetingStatus={meeting?.status}
        onMoveToAgenda={onMoveToAgenda}
      />
    </div>
  );
};

export default MeetingDetailContent;