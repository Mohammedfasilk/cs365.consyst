import React, { useState, useRef } from "react";
import {Button} from '../../components/UI/Button'
import {Plus} from "lucide-react"
import SearchAndFilterSection from "../../components/Meeting-minutes/SearchAndFilterSection";
import MeetingDialogs from "../../components/Meeting-minutes/MeetingDialogs";

function MeetingMinutes() {
  
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
            // onClick={() => setIsCreateDialogOpen(true)}
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
          // roleFilters={roleFilters}
          // onRoleFiltersChange={setRoleFilters}
          // showCompleted={showCompleted}
          // onShowCompletedChange={setShowCompleted}
        />

        {/* {filteredMeetings.length === 0 ? (
          <EmptyMeetingsState
            searchQuery={searchQuery}
            roleFilters={roleFilters}
            // onCreateMeeting={() => setIsCreateDialogOpen(true)}
          />
        ) : (
          <MeetingsByStatus
            meetings={filteredMeetings}
            onEditMeeting={handleEditMeeting}
            onDeleteMeeting={handleDeleteMeeting}
          />
        )} */}

        <MeetingDialogs
          // isCreateDialogOpen={isCreateDialogOpen}
          // isEditDialogOpen={isEditDialogOpen}
          // selectedMeeting={selectedMeeting}
          // // onCloseCreateDialog={() => setIsCreateDialogOpen(false)}
          // onCloseEditDialog={handleCloseEditDialog}
          // onCreateMeeting={handleCreateMeeting}
          // onUpdateMeeting={handleUpdateMeeting}
          // isUpdating={isUpdating}
        />
      </div>
    </div>
  );
}

export default MeetingMinutes;



