import { useNavigate, useParams } from "react-router-dom";
import MeetingDetailHeader from '../../components/Meeting-details/MeetingDetailHeader'
import { useEffect, useState } from "react";
import axios from "axios";

const MeetingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // const { meeting, loading, refetch } = useMeetingDetailData(id || "");
  // const { startMeeting, closeMeeting, loading: statusLoading } = useMeetingStatus();
  const [meeting,setMeeting] = useState([])
  // const {
  //   handleAddAgreement,
  //   handleUpdateAgreement,
  //   handleDeleteAgreement,
  //   handleGeneratePDF,
  //   handleMoveToPending,
  //   handleMoveToAgenda,
  //   handleAddAgendaItem,
  //   handleUpdateAgendaItem,
  //   handleDeleteAgendaItem,
  //   agreementLoading,
  //   emailLoading,
  //   agendaLoading
  // } = useMeetingDetailHandlers(meeting, refetch);

  useEffect(()=>{
      const fetchMeetingsbyId = async ()=>{
        try {
          const res = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/id`,{id:id})

          if(res.data){
            setMeeting(res.data)
          }
          console.log(res.data);
          
    } catch (error) {
      console.error('MeetingDetailPage - Error starting meeting:', error);
    }
      }

      fetchMeetingsbyId();
  },[])
  // const handleStartMeeting = async () => {
  //   if (!meeting) return;
  //   console.log('MeetingDetailPage - Starting meeting:', meeting.id);
  //   try {
  //     await startMeeting(meeting.id);
  //     console.log('MeetingDetailPage - Meeting started, refreshing data');
  //     await refetch();
  //   } catch (error) {
  //     console.error('MeetingDetailPage - Error starting meeting:', error);
  //   }
  // };

  // const handleCloseMeeting = async () => {
  //   if (!meeting) return;
  //   console.log('MeetingDetailPage - Closing meeting:', meeting.id);
  //   try {
  //     await closeMeeting(meeting.id);
  //     console.log('MeetingDetailPage - Meeting closed, refreshing data');
  //     await refetch();
  //   } catch (error) {
  //     console.error('MeetingDetailPage - Error closing meeting:', error);
  //   }
  // };

  // if (loading) {
  //   return <MeetingDetailLoading />;
  // }

  // if (!meeting) {
  //   return <MeetingNotFound onNavigateBack={() => navigate("/")} />;
  // }

  // console.log('MeetingDetail - Rendering with meeting status:', meeting.status, 'statusLoading:', statusLoading);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-none">
        <MeetingDetailHeader 
          // status={meeting.status} 
          // ownerId={meeting.owner_id}
          // attendees={meeting.attendees}
          // onBack={() => navigate("/")}
          // onStartMeeting={handleStartMeeting}
          // onCloseMeeting={handleCloseMeeting}
          // statusLoading={statusLoading}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - expands to fill available space */}
          <div className="flex-1 min-w-0 lg:w-2/3">
           {/* <MeetingDetailContent
              meeting={meeting}
              // onRefresh={refetch}
              // onEdit={() => {}} // TODO: Implement edit functionality
              // onAddAgreement={handleAddAgreement}
              // onEditAgreement={handleUpdateAgreement}
              // onDeleteAgreement={handleDeleteAgreement}
              // onStartMeeting={handleStartMeeting}
              // onCloseMeeting={handleCloseMeeting}
              // onAddAgendaItem={handleAddAgendaItem}
              // onUpdateAgendaItem={handleUpdateAgendaItem}
              // onDeleteAgendaItem={handleDeleteAgendaItem}
              // onMoveToPending={handleMoveToPending}
              // onMoveToAgenda={handleMoveToAgenda}
              // agreementLoading={agreementLoading}
              // agendaLoading={agendaLoading}
              // statusLoading={statusLoading}
            /> */}
          </div>

          {/* Sidebar - fixed at 33% width on larger screens */}
          <div classNa me="w-full lg:w-1/3 lg:max-w-md lg:min-w-80">
            {/* <MeetingDetailSidebar
              meeting={meeting}
              refetch={refetch}
              handleGeneratePDF={handleGeneratePDF}
              emailLoading={emailLoading}
              statusLoading={statusLoading}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailPage;