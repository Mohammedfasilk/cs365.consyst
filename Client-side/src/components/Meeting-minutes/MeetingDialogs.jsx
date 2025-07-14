import React from 'react'
import CreateMeetingDialog from './CreateMeetingDialog'

function MeetingDialogs({
  isOpen,
  isEditDialogOpen,
  selectedMeeting,
  onCloseDialog,
  onCloseEditDialog,
  onCreateMeeting,
  onUpdateMeeting,
  isUpdating
}) {
  return (
    <>
      <CreateMeetingDialog
        isOpen={isOpen}
        onClose={onCloseDialog}
        onCreateMeeting={onCreateMeeting}
      />

      {/* {selectedMeeting && (
        <EditMeetingDialog
          isOpen={isEditDialogOpen}
          onClose={onCloseEditDialog}
          onUpdateMeeting={onUpdateMeeting}
          meeting={selectedMeeting}
          isSubmitting={isUpdating}
        />
      )} */}
    </>
  )
}

export default MeetingDialogs