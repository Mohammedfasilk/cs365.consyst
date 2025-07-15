import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import AttendeeInfo from "./AttendeeInfo";
// import { useAttendeeOperations } from "../../Hooks/useAttendeeOperations";
// import { useAttendeeProfile } from "../../Hooks/useAttendeeProfile";
// import { useAttendeeActions } from "../../Hooks/useAttendeeActions";
// import AttendeeRoleHeader from "./AttendeeRoleHeader";
// import AttendeeActionButtons from "./AttendeeActionButtons";
// import AttendeeInfo from "./AttendeeInfo";
// import EditAttendeeDialog from "./EditAttendeeDialog";

const AttendeeCard = ({ attendee, meetingStatus, onRefresh, meetingOwnerId, totalHosts }) => {
  const { updateName, updateOrganization, loading } = ''
  const { accounts } = useMsal();
  const user = accounts[0]?.name;
  const [isHovered, setIsHovered] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const isEditable = meetingStatus === 'in-progress';
  const isInternalUser = attendee?.email?.toLowerCase().endsWith('@consyst.biz');
  const isCurrentUserHost = user && (user === meetingOwnerId || attendee?.role === 'host');
  const canPromoteToHost = isCurrentUserHost && isInternalUser && attendee?.role === 'participant' && meetingStatus !== 'completed';
  const canDemoteToParticipant = isCurrentUserHost && attendee?.role === 'host' && totalHosts > 1 && meetingStatus !== 'completed';
  const canRemoveAttendee = isCurrentUserHost && meetingStatus !== 'completed' && 
    (attendee?.role !== 'host' || totalHosts > 1); // Can't remove last host
  const canAddDetails = isCurrentUserHost && !isInternalUser && meetingStatus !== 'completed';

  const profileData = (attendee?.email, isInternalUser);
  
  const {
    isPromoting,
    isDemoting,
    isRemoving,
    handlePromoteToHost,
    handleDemoteToParticipant,
    handleRemoveAttendee,
  } = ({
    attendeeId: attendee?.id,
    attendeeName: attendee?.name,
    attendeeEmail: attendee?.email,
    onRefresh,
  });

  const handleNameSave = async (name) => {
    await updateName(attendee?.id, name);
    onRefresh();
  };

  const handleOrganizationSave = async (organization) => {
    await updateOrganization(attendee?.id, organization);
    onRefresh();
  };

  const handleAddDetailsClick = () => {
    setIsEditDialogOpen(true);
  };

  // For internal users, use profile data or fallback to attendee data
  const displayName = isInternalUser 
    ? (profileData?.full_name || attendee?.name || 'Loading...')
    : attendee?.name;
    
    
  
  const displayOrganization = isInternalUser 
    ? 'Consyst'
    : attendee?.organization;

  return (
    <div 
      className="border rounded-lg p-3 bg-gray-50 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Only show role header for participants, not hosts */}
      {attendee?.role !== 'host' && (
        <div className="flex items-center justify-between mb-2">
          {/* <AttendeeRoleHeader role={attendee.role} /> */}
          
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
            onRemoveAttendee={handleRemoveAttendee}
            onAddDetails={handleAddDetailsClick}
            isHovered={isHovered}
          /> */}
        </div>
      )}

      {/* For hosts, show action buttons in the top right without role header */}
      {attendee?.role === 'host' && (canPromoteToHost || canDemoteToParticipant || canRemoveAttendee || canAddDetails) && (
        <div className="absolute top-3 right-3">
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
            onRemoveAttendee={handleRemoveAttendee}
            onAddDetails={handleAddDetailsClick}
            isHovered={isHovered}
          /> */}
        </div>
      )}
      
      <AttendeeInfo
        email={attendee.email}
        displayName={displayName}
        displayOrganization={displayOrganization}
        isInternalUser={isInternalUser}
        isEditable={isEditable}
        loading={loading}
        onNameSave={handleNameSave}
        onOrganizationSave={handleOrganizationSave}
        role={attendee.role}
      />

      {/* {!isInternalUser && (
        <EditAttendeeDialog
          attendee={attendee}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onRefresh={onRefresh}
        />
      )} */}
    </div>
  );
};

export default AttendeeCard;
