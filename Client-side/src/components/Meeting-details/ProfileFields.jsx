import React from "react";
import { Input } from "../UI/Input";
import { Label } from "../UI/Label";

const ProfileFields = ({
  name,
  organization,
  onNameChange,
  onOrganizationChange,
  isInternalUser,
  disabled
}) => {
  if (isInternalUser) {
    // For internal users, show read-only fields
    return (
      <>
        <div>
          <Label className="text-sm font-medium">Name</Label>
          <Input
            type="text"
            value={name || 'Loading from profile...'}
            disabled
            className="bg-gray-100"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Organization</Label>
          <Input
            type="text"
            value="Consyst"
            disabled
            className="bg-gray-100"
          />
        </div>
      </>
    );
  }

  // For external users, show editable fields
  return (
    <>
      <div>
        <Label htmlFor="attendee-name" className="text-sm font-medium">
          Name
        </Label>
        <Input
          id="attendee-name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter attendee name"
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor="attendee-organization" className="text-sm font-medium">
          Organization
        </Label>
        <Input
          id="attendee-organization"
          type="text"
          value={organization}
          onChange={(e) => onOrganizationChange(e.target.value)}
          placeholder="Enter organization"
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default ProfileFields; 