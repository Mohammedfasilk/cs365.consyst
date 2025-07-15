import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
// import { useAttendeeProfile } from "../../Hooks/useAttendeeProfile";
// import { useAttendeeActions } from "../../Hooks/useAttendeeActions";
// import AttendeeActionButtons from "./AttendeeActionButtons";
// import EditAttendeeDialog from "./EditAttendeeDialog";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "../UI/Tooltip";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "../UI/Alert_Dialog";

const AttendeeListItem = ({ 
  attendee, 
  index, 
  meetingStatus, 
  onRefresh, 
  meetingOwnerId, 
  totalHosts 
}) => {
  const { accounts } = useMsal();
  const user = accounts[0]?.name;
  const [isHovered, setIsHovered] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  
  const isEditable = meetingStatus === 'in-progress';
  const isInternalUser = attendee?.email?.toLowerCase().endsWith('@consyst.biz');
  const isCurrentUserHost = user && (user === meetingOwnerId || attendee?.role === 'host');
  const canPromoteToHost = isCurrentUserHost && isInternalUser && attendee?.role === 'participant' && meetingStatus !== 'completed';
  const canDemoteToParticipant = isCurrentUserHost && attendee?.role === 'host' && totalHosts > 1 && meetingStatus !== 'completed';
  const canRemoveAttendee = isCurrentUserHost && meetingStatus !== 'completed' && 
    (attendee?.role !== 'host' || totalHosts > 1);
  const canAddDetails = isCurrentUserHost && !isInternalUser && meetingStatus !== 'completed';

  const profileData = (attendee?.email, isInternalUser);
  
  const {
    isPromoting,
    isDemoting,
    isRemoving,
    handlePromoteToHost,
    handleDemoteToParticipant,
    handleRemoveAttendee,
  } =({
    attendeeId: attendee?.id,
    attendeeName: attendee?.name,
    attendeeEmail: attendee?.email,
    onRefresh,
  });

  const displayName = isInternalUser 
    ? (profileData?.full_name || attendee?.name || 'Loading...')
    : attendee?.name;
  
  const displayOrganization = isInternalUser 
    ? 'Consyst'
    : attendee?.organization;

  const handleEditClick = () => {
    if (isEditable && !isInternalUser) {
      setIsEditDialogOpen(true);
    }
  };

  const handleAddDetailsClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleRemoveClick = () => {
    setIsRemoveConfirmOpen(true);
  };

  const confirmRemove = () => {
    handleRemoveAttendee();
    setIsRemoveConfirmOpen(false);
  };

  const formatParticipant = () => {
    const name = displayName || 'Unknown';
    if (isInternalUser) {
      return `${attendee?.email} (${name})`;
    } else {
      const org = displayOrganization || 'Unknown';
      return `${attendee?.email} (${name}, ${org})`;
    }
  };

  const getTooltipContent = () => {
    return (
      <div className="space-y-1 text-sm">
        <div><strong>Email:</strong> {attendee?.email}</div>
        <div><strong>Name:</strong> {displayName || 'Not specified'}</div>
        {!isInternalUser && (
          <div><strong>Organization:</strong> {displayOrganization || 'Not specified'}</div>
        )}
      </div>
    );
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className="relative py-1 px-2 hover:bg-gray-50 rounded transition-colors text-sm cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-start gap-2">
                <span className="text-xs text-gray-500 font-medium mt-0.5 flex-shrink-0 w-4">
                  {index + 1}.
                </span>
                
                <div className="flex-1 min-w-0">
                  <div 
                    className={`text-xs text-gray-900 ${
                      isEditable && !isInternalUser ? 'hover:text-blue-600' : ''
                    }`}
                    onClick={handleEditClick}
                    title={isEditable && !isInternalUser ? 'Click to edit' : ''}
                  >
                    {formatParticipant()}
                  </div>
                </div>
              </div>
              
              {/* Overlay buttons - centered and positioned absolutely */}
              {isHovered && (canPromoteToHost || canDemoteToParticipant || canRemoveAttendee || canAddDetails) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/90 rounded transition-opacity duration-200">
                  {/* <AttendeeActionButtons
                    canPromoteToHost={canPromoteToHost}
                    canDemoteToParticipant={canDemoteToParticipant}
                    canRemoveAttendee={canRemoveAttendee}
                    canAddDetails={canAddDetails}
                    isPromoting={isPromoting}
                    isDemoting={isDemoting}
                    isRemoving={isRemoving}
                    onPromoteToHost={handlePromoteToHost}
                    onDemoteToParticipant={handleDemoteToParticipant}
                    onRemoveAttendee={handleRemoveClick}
                    onAddDetails={handleAddDetailsClick}
                    isHovered={true}
                  /> */}
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {getTooltipContent()}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* {!isInternalUser && (
        <EditAttendeeDialog
          attendee={attendee}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onRefresh={onRefresh}
        />
      )} */}

      <AlertDialog open={isRemoveConfirmOpen} onOpenChange={setIsRemoveConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Attendee</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {displayName || attendee?.email} from this meeting? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove} disabled={isRemoving}>
              {isRemoving ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AttendeeListItem;
