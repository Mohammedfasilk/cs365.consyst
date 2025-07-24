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
  const [showCompleted,setShowCompleted] = useState()
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const [meetingDialog,setMeetingDialog] = useState(false)
  const filteredQuery = {
    host:accounts[0]?.name,
    attendee:accounts[0]?.username,
    search:searchQuery,
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
  const email = accounts[0]?.username;

  const isHost =
    roleFilters.includes("host") &&
    meeting.attendees.some((a) => a.email === email && a.role === "host");

  const isAttendee =
    roleFilters.includes("participant") &&
    meeting.attendees.some((a) => a.email === email && a.role !== "host");

  const matchesRole = isHost || isAttendee;
  const matchesStatus = showCompleted
    ? meeting.status === "completed"
    : meeting.status !== "completed";

  const matchesSearch = searchQuery
    ? meeting.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.description?.toLowerCase().includes(searchQuery.toLowerCase())
    : true;

  return matchesRole && matchesStatus && matchesSearch;
});
      setFilteredMeetings(filtered);

      
    } catch (err) {
      console.log("Error fetching meetings", err);
    }
  };

  useEffect(() => {
  fetchMeetings();
}, [roleFilters,showCompleted,searchQuery]);

  // Placeholder functions for now
  const handleEditMeeting = (meeting) => {
  };
  
  const handleDeleteMeeting = (meeting) => {
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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          roleFilters={roleFilters}
          onRoleFiltersChange={setRoleFilters}
          showCompleted={showCompleted}
          onShowCompletedChange={setShowCompleted}
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
            onDeleteMeeting={handleDeleteMeeting}
            refresh={fetchMeetings}
            onEditMeeting={(meeting) => {
              setIsEditDialogOpen(true);
              setSelectedMeeting(meeting);
            }}
          />
        )}

        <MeetingDialogs
          isOpen={meetingDialog}
          isEditDialogOpen={isEditDialogOpen}
          selectedMeeting={selectedMeeting}
          onCloseDialog={() => setMeetingDialog(false)}
          onCloseEditDialog={() => setIsEditDialogOpen(false)}
          onCreateMeeting={fetchMeetings}
          // onUpdateMeeting={handleUpdateMeeting}
          // isUpdating={isUpdating}
        />
      </div>
    </div>
  );
}

export default MeetingMinutes;



