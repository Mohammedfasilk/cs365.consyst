import React from 'react'
import CreateMeetingDialog from './CreateMeetingDialog'

function MeetingDialogs({
  isCreateDialogOpen,
  isEditDialogOpen,
  selectedMeeting,
  onCloseCreateDialog,
  onCloseEditDialog,
  onCreateMeeting,
  onUpdateMeeting,
  isUpdating
}) {
  return (
    <>
      <CreateMeetingDialog
        isOpen={isCreateDialogOpen}
        onClose={onCloseCreateDialog}
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