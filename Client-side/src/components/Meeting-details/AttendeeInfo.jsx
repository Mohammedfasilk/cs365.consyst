import React from "react";
import EditableField from "./EditableField";

const AttendeeInfo = ({
  email,
  displayName,
  displayOrganization,
  isInternalUser,
  isEditable,
  loading,
  onNameSave,
  onOrganizationSave,
  role,
}) => {
  // For hosts, display in single line format: email (Display Name)
  if (role === 'host') {
    const hostDisplayText = `${email}${displayName ? ` (${displayName})` : ''}`;
    return (
      <div className="text-xs text-gray-900 truncate">
        {hostDisplayText}
      </div>
    );
  }

  // For participants, keep the existing multi-line format
  return (
    <div className="space-y-0.5">
      {email && (
        <div className="text-xs text-gray-900 truncate">{email}</div>
      )}
      
      {isInternalUser ? (
        <div className="text-xs text-gray-700 truncate">{displayName}</div>
      ) : (
        <>
          <div className="text-xs">
            <EditableField
              value={displayName}
              onSave={onNameSave}
              placeholder="Enter name"
              label=""
              isEditable={isEditable}
              loading={loading}
            />
          </div>

          <div className="text-xs">
            <EditableField
              value={displayOrganization}
              onSave={onOrganizationSave}
              placeholder="Enter organization"
              label=""
              isEditable={isEditable}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AttendeeInfo; 