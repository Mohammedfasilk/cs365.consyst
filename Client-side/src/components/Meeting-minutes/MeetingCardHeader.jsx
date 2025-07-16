import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../UI/Alert-dialog';
// Adjust path as needed

const MeetingCardHeader = ({ meeting, onEditMeeting, onDeleteMeeting }) => {
  const  user  = true
  const  isAdmin  = ''
  const canEdit = meeting.status !== "completed" && !meeting.is_completed;
  // Check if user is host by role, not just owner_id
  const isHost = user && (
    meeting.owner_id === user.id ||
    (meeting.attendees?.some(attendee => 
      attendee.user_id === user.id && attendee.role === 'host'
    ))
  );
  
  // Determine if user can delete the meeting
  const canDelete = (isHost && !meeting.is_completed) || (meeting.is_completed && isAdmin);

  return (
    <div className="mb-4">
      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-3">{meeting.title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge>
            {meeting.status}
          </Badge>
          {meeting.is_completed && (
            <Badge variant="outline" className="text-orange-600 border-orange-600">
              Completed
            </Badge>
          )}
        </div>
        {isHost && (
          <div className="flex gap-1 flex-shrink-0">
            {canEdit && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEditMeeting(meeting)}
                className="h-8 w-8"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {canDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Meeting</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{meeting.title}"? This action cannot be undone and will remove all associated data including attendees, agenda items, and agreements.
                      {meeting.is_completed && !isAdmin && (
                        <span className="block mt-2 text-red-600 font-medium">
                          Only administrators can delete completed meetings.
                        </span>
                      )}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onDeleteMeeting(meeting.id || meeting._id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingCardHeader; 