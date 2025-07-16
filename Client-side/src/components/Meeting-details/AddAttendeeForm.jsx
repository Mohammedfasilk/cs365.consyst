import React, { useState } from "react";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";
import ProfileFields from "./ProfileFields";
import { Button } from "../UI/Button";
import { X } from "lucide-react";
// You must implement or import these hooks and components:
// import useProfileData from "../Hooks/useProfileData";
// import useAttendeeSubmission from "../Hooks/useAttendeeSubmission";
// import validateEmail from "../utils/validateEmail";
// import EmailInput from "./EmailInput";
// import ProfileFields from "./ProfileFields";
// import FormActions from "./FormActions";

const AddAttendeeForm = ({ meetingId, onSuccess, onCancel }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Replace with your actual hook paths
  const { name, setName, organization, setOrganization, isInternalUser } = (email);
  const { submitAttendee, loading } = ({ meetingId, onSuccess });

  const handleEmailChange = (value) => {
    setEmail(value);
    if (emailError) setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email.trim())) {
      setEmailError("Please enter a valid email address");
      return;
    }

    await submitAttendee(email, name, organization, isInternalUser);
  };

  return (
    <div className="border rounded-lg p-3 bg-blue-50 border-blue-200">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* <EmailInput
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          disabled={loading}
        /> */}
        <div>
      <Label htmlFor="attendee-email" className="text-sm font-medium">
        Email *
      </Label>
      <Input
        id="attendee-email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter attendee email"
        className={emailError ? "border-red-500" : ""}
        disabled={loading}
        required
      />
      {emailError && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>

        <ProfileFields
          name={name}
          organization={organization}
          onNameChange={setName}
          onOrganizationChange={setOrganization}
          isInternalUser={isInternalUser}
          disabled={loading}
        />

        {/* <FormActions
          loading={loading}
          onCancel={onCancel}
        /> */}
         <div className="flex gap-2 pt-2">
      <Button
        type="submit"
        size="sm"
        className="flex-1"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Attendee"}
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={onCancel}
        disabled={loading}
        className="px-2"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
      </form>
    </div>
  );
};

export default AddAttendeeForm; 