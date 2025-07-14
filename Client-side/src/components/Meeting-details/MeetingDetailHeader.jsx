import React from 'react';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { ArrowLeft, Play, Square } from 'lucide-react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../UI/Alert-dialog';
// import { useAuth } from '../../hooks/useAuth'; // Adjust path as needed
// import { getStatusColor } from '../../utils/getStatusColor'; // Adjust path as needed

const MeetingDetailHeader = ({ 
  status, 
  ownerId,
  attendees = [],
  onBack, 
  onStartMeeting, 
  onCloseMeeting, 
  statusLoading = false 
}) => {
  const isHost = true
  // const { user } = useAuth();
  
  // Check if user is the original owner or any host
  // const isOriginalOwner = user && ownerId === user.id;
  // const isHost = isOriginalOwner || attendees.some(attendee => 
  //   attendee.user_id === user?.id && attendee.role === 'host'
  // ) || attendees.some(attendee => 
  //   attendee.email?.toLowerCase() === user?.email?.toLowerCase() && attendee.role === 'host'
  // );

  const handleStartMeeting = async () => {
    console.log('MeetingDetailHeader - Start Meeting button clicked');
    if (onStartMeeting) {
      try {
        await onStartMeeting();
        console.log('MeetingDetailHeader - Meeting started successfully');
      } catch (error) {
        console.error('MeetingDetailHeader - Error starting meeting:', error);
      }
    }
  };

  const handleCloseMeeting = async () => {
    console.log('MeetingDetailHeader - Close Meeting button clicked');
    if (onCloseMeeting) {
      try {
        await onCloseMeeting();
        console.log('MeetingDetailHeader - Meeting closed successfully');
      } catch (error) {
        console.error('MeetingDetailHeader - Error closing meeting:', error);
      }
    }
  };

  return (
    <div className="flex items-center ml-20 mt-16 justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button 
          onClick={onBack} 
          variant="outline" 
          size="sm"
          className="flex items-center bg-white gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Meetings
        </Button>
        <Badge >
          upcoming
        </Badge>
      </div>

      {isHost && (
        <div className="flex items-center gap-3">
          {status === "upcoming" && onStartMeeting && (
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleStartMeeting}
              disabled={statusLoading}
            >
              <Play className="w-4 h-4 mr-2" />
              {statusLoading ? "Starting..." : "Start Meeting"}
            </Button>
          )}
          {status === "in-progress" && onCloseMeeting && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  disabled={statusLoading}
                >
                  <Square className="w-4 h-4 mr-2" />
                  {statusLoading ? "Closing..." : "Close Meeting"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Close Meeting</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to close this meeting? This will mark the meeting as completed and you won't be able to edit it afterwards.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleCloseMeeting}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={statusLoading}
                  >
                    Close Meeting
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      )}
    </div>
  );
};

export default MeetingDetailHeader;
