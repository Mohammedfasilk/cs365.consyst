import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
 
} from '../UI/Dialog'
import { MeetingForm } from './MeetingForm';
import { X } from 'lucide-react';

function CreateMeetingDialog({ isOpen, onClose, onCreateMeeting }) {
    // const { isCreating } = useMeetings();


  return (
       <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-white overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Meeting</DialogTitle>
        </DialogHeader>
        
        <MeetingForm 
          onCancel={onClose} 
          fetchMeetings={onCreateMeeting}
        //   isSubmitting={isCreating}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CreateMeetingDialog