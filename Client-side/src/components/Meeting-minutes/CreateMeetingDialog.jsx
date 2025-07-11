import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
 
} from '../UI/Dialog'
import { MeetingForm } from './MeetingFrom';

function CreateMeetingDialog({ isOpen, onClose, onCreateMeeting }) {
    // const { isCreating } = useMeetings();

  const handleSubmit = async (meetingData) => {
    console.log('CreateMeetingDialog - Submitting meeting data:', meetingData);
    await onCreateMeeting(meetingData);
  };
  return (
       <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Meeting</DialogTitle>
        </DialogHeader>
        
        <MeetingForm 
          onSubmit={handleSubmit} 
          onCancel={onClose} 
        //   isSubmitting={isCreating}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CreateMeetingDialog