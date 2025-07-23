import { useNavigate, useParams } from "react-router-dom";
import MeetingDetailHeader from '../../components/Meeting-details/MeetingDetailHeader'
import { useEffect, useState } from "react";
import axios from "axios";
import MeetingDetailContent from "../../components/Meeting-details/MeetingDetailContent";
import MeetingDetailSidebar from "../../components/Meeting-details/MeetingDetailSidebar";

const MeetingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // const { meeting, loading, refetch } = useMeetingDetailData(id || "");
  // const { startMeeting, closeMeeting, loading: statusLoading } = useMeetingStatus();
  const [meeting,setMeeting] = useState([])
  const [emailLoading,setEmailLoading] = useState()
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


      const fetchMeetingsbyId = async ()=>{
        try {
          const res = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/id`,{id:id})

          if(res.data){            
            setMeeting(res.data)
          }
          
    } catch (error) {
      console.error('MeetingDetailPage - Error starting meeting:', error);
    }
      }
  useEffect(()=>{
      fetchMeetingsbyId();
  },[])
  const handleStartMeeting = async () => {
    if (!meeting) return;
    try {
      await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/handle-status`,{
        id:meeting?._id,
        action:'start'
      })

      // toast({
      //         title: "Agreement Created",
      //         description: "The agreement has been added.",
      //         icon: <CircleCheckIcon className="mr-4" color="green" />,
      //       });
      
      await fetchMeetingsbyId();
    } catch (error) {
      console.error('MeetingDetailPage - Error starting meeting:', error);
    }
  };

  const handleCloseMeeting = async () => {
    if (!meeting) return;
    try {
      await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/handle-status`,{
        id:meeting?._id,
        action:'close'
      })

      // toast({
      //         title: "Agreement Created",
      //         description: "The agreement has been added.",
      //         icon: <CircleCheckIcon className="mr-4" color="green" />,
      //       });
      
      await fetchMeetingsbyId();
    } catch (error) {

      console.error('MeetingDetailPage - Error closing meeting:', error);
    }
  };

  const handleGeneratePDF = async () => {
  if (!meeting?._id) return;

  setEmailLoading(true);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_CS365_URI}/api/meeting/generate-pdf`,
      { meetingId: meeting._id },
      { responseType: 'blob' }
    );

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');

    if (newWindow) {
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      toast.success('PDF report generated successfully');
    } else {
      toast.error('Unable to open PDF report. Please check your browser popup settings.');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Failed to generate PDF report');
  } finally {
    setEmailLoading(false);
  }
};


  return (
    <div className="min-h-screen ml-14 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-none">
        <MeetingDetailHeader 
          status={meeting.status} 
          // ownerId={meeting.owner_id}
          attendees={meeting?.attendees}
          onBack={() => navigate("/business-tools/meeting-minutes")}
          onStartMeeting={handleStartMeeting}
          onCloseMeeting={handleCloseMeeting}
          // statusLoading={statusLoading}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - expands to fill available space */}
          <div className="flex-1 min-w-0 lg:w-2/3">
           <MeetingDetailContent
              meeting={meeting}
              onRefresh={fetchMeetingsbyId}
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
            />
          </div>

          {/* Sidebar - fixed at 33% width on larger screens */}
          <div classNa me="w-full lg:w-1/3 lg:max-w-md lg:min-w-80">
            <MeetingDetailSidebar
              meeting={meeting}
              refetch={''}
              handleGeneratePDF={handleGeneratePDF}
              // emailLoading={emailLoading}
              // statusLoading={statusLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailPage;