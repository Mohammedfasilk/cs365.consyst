
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../UI/Dialog";
import { MeetingForm } from "./MeetingForm";


const EditMeetingDialog = ({ isOpen, onClose, onUpdateMeeting, meeting, isSubmitting = false }) => {


  const handleSubmit = (meetingData) => {
    onUpdateMeeting(meeting.id, meetingData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Meeting
            {meeting.status == 'completed' && (
              <span className="ml-2 text-sm font-normal text-orange-600">(Completed - Cannot Edit)</span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {meeting.status == 'completed' ? (
          <div className="text-center py-8">
            <p className="text-gray-600">This meeting is completed and cannot be edited.</p>
            <p className="text-sm text-gray-500 mt-2">Ask the meeting owner to reopen it first.</p>
          </div>
        ) : (
          meeting && (
            <MeetingForm 
              onSubmit={handleSubmit} 
              onCancel={onClose} 
              initialData={meeting}
              isSubmitting={isSubmitting}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditMeetingDialog;
