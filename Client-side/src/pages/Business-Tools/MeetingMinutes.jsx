import React, { useState, useRef, useEffect } from "react";
import {Button} from '../../components/UI/Button'
import {Plus} from "lucide-react"
import SearchAndFilterSection from "../../components/Meeting-minutes/SearchAndFilterSection";
import MeetingDialogs from "../../components/Meeting-minutes/MeetingDialogs";
import EmptyMeetingsState from "../../components/Meeting-minutes/EmptyMeetingsState";
import MeetingsByStatus from "../../components/Meeting-minutes/MeetingsByStatus";
import axios from "axios";
import { useSelector } from "react-redux";
import { useMsal } from "@azure/msal-react";
import { setDayOfYear } from "date-fns";

function MeetingMinutes() {
  const {accounts} = useMsal()
  const [filteredMeetings,setFilteredMeetings] = useState([])
  const [roleFilters,setRoleFilters] = useState([])

  const [meetingDialog,setMeetingDialog] = useState(false)
  const filteredQuery = {
    host:accounts[0]?.name,
    attendee:accounts[0]?.username,
    search:'',
  }

  const fetchMeetings = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/meeting`,
        filteredQuery
      );

      const meetings = res.data;
      
      if (!roleFilters.length) {
        setFilteredMeetings([]);
        return;
      }

      const filtered = meetings.filter((meeting) => {
        const isHost = roleFilters.includes("host") && meeting.host === accounts[0]?.name;  
  
              
        const isAttendee =
          roleFilters.includes("attendees") &&
          Array.isArray(meeting.attendees) &&
          meeting.attendees.some((a) => a.email === accounts[0]?.username); // ← double check this email check

        return isHost || isAttendee;
      });

      setFilteredMeetings(filtered);

      
    } catch (err) {
      console.log("Error fetching meetings", err);
    }
  };

  useEffect(() => {
  fetchMeetings();
}, [roleFilters]);

  // Placeholder functions for now
  const handleEditMeeting = (meeting) => {
    console.log('Edit meeting:', meeting);
  };
  
  const handleDeleteMeeting = (meeting) => {
    console.log('Delete meeting:', meeting);
  };
  
  return (
     <div className="min-h-screen bg-gradient-to-br mt-12 from-blue-50 to-indigo-100">
      {/* <LoadingOverlay 
        isVisible={isAnyOperationInProgress} 
        // message={getLoadingMessage()} 
      />
       */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Meetings</h1>
            <p className="text-gray-600 mt-2">Manage and track your meeting minutes</p>
          </div>
          <Button 
            onClick={() => setMeetingDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
            // disabled={isAnyOperationInProgress}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Meeting
          </Button>
        </div>

        <SearchAndFilterSection
          // searchQuery={searchQuery}
          // onSearchChange={setSearchQuery}
          roleFilters={roleFilters}
          onRoleFiltersChange={setRoleFilters}
          // showCompleted={showCompleted}
          // onShowCompletedChange={setShowCompleted}
        />

        {filteredMeetings.length === 0 ? (
          <EmptyMeetingsState
            // searchQuery={searchQuery}
            // roleFilters={roleFilters}
            onCreateMeeting={() => setMeetingDialog(true)}
          />
        ) : (
          <MeetingsByStatus
            meetings={filteredMeetings}
            onEditMeeting={handleEditMeeting}
            onDeleteMeeting={handleDeleteMeeting}
          />
        )}

        <MeetingDialogs
          isOpen={meetingDialog}
          // isEditDialogOpen={isEditDialogOpen}
          // selectedMeeting={selectedMeeting}
          onCloseDialog={() => setMeetingDialog(false)}
          // onCloseEditDialog={handleCloseEditDialog}
          onCreateMeeting={fetchMeetings}
          // onUpdateMeeting={handleUpdateMeeting}
          // isUpdating={isUpdating}
        />
      </div>
    </div>
  );
}

export default MeetingMinutes;



