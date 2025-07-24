import React, { useState } from "react";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";
import ProfileFields from "./ProfileFields";
import { Button } from "../UI/Button";
import { X } from "lucide-react";
import axios from "axios";

const AddAttendeeForm = ({ meetingId, onSuccess, onCancel,onRefresh }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState(""); 

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) setEmailError("");
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setEmailError("");

  if (!email.trim()) return setEmailError("Email is required");

  try {
    const payload = {
      meetingId,
      email,
      name,
      organization,
    };

    const res = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/add-attendee`, payload);
    onSuccess?.();
    onRefresh?.();
  } catch (err) {
    console.error("Error adding attendee:", err);
    setError(err.response?.data?.error);
    setEmailError("Failed to add attendee");
  }
};

  return (
    <div className="border rounded-lg p-3 bg-blue-50 border-blue-200">
      <form onSubmit={handleSubmit} className="space-y-3">
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
            required
          />
          {emailError && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <ProfileFields
          name={name}
          organization={organization}
          onNameChange={setName}
          onOrganizationChange={setOrganization}
          // isInternalUser={isInternalUser}
          // disabled={loading}
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
            // disabled={loading}
          >
            Add Attendee
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onCancel}
            // disabled={loading}
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
