import { useState, useEffect } from "react";
import { BasicInfoSection } from "./BasicInfoSection";
import { AttendeesSection } from "./AttendeesSection";
import { AgendaSection } from "./AgendaSection";
import { Button } from "../UI/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/Card";

import {
  Calendar,
  Users,
  FileText,
  CheckCircle,
  CircleCheckIcon,
  CircleXIcon,
} from "lucide-react";
import { getDefaultTimezone } from "../../utils/timezoneUtils";
import axios from "axios";
import { useToast } from "../../Hooks/use-toast";
import { useSelector } from "react-redux";
import { useMsal } from "@azure/msal-react";

export const MeetingForm = ({
  initialData = {},
  onCancel,
  isSubmitting = false,
  fetchMeetings
}) => {
  const sessionUser = useSelector((state)=>state.session.sessionUser)
    const { accounts } = useMsal();
    const userName = accounts[0]?.name
  const [formData, setFormData] = useState({
    // Basic Info
    title: initialData.title || "",
    host: userName || null,
    date: initialData.date || "",
    time: initialData.time || "",
    duration: initialData.duration || "60",
    timezone: initialData.timezone || getDefaultTimezone(),

    // Attendees
    attendees: initialData.attendees || [],

    // Agenda
    agenda: initialData.agenda || [],
  });
  const { toast } = useToast();
  
    

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        timezone: initialData.timezone || getDefaultTimezone(),
      }));
    }
  }, [initialData]);

  const handleBasicInfoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAttendeesChange = (attendees) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        attendees,
      };
      return newData;
    });
  };

  const handleAgendaChange = (agenda) => {
    setFormData((prev) => ({
      ...prev,
      agenda,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid() || isSubmitting) {
      return;
    }

    try {
      const createMeeting = async () => {  
              
        const res = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/meeting/create`,
          formData
        );

        fetchMeetings();
        
        if (res.status == 200) {
          toast({
            title: "Meeting Created",
            description: "Meetting has been successfully created.",
            icon: <CircleCheckIcon className="mr-4" color="green" />,
          });
        } else {
          toast({
            title: "Meeting Not Created",
            description: "There was an error creating meeting.",
            variant: "destructive",
            icon: <CircleXIcon className="mr-4" color="red" />,
          });
        }
      };

      createMeeting();
    } catch (error) {
      console.error("Error submitting meeting:", error);
      toast({
        title: "Meeting Not Created",
        description: "There was an error creating meeting.",
        variant: "destructive",
        icon: <CircleXIcon className="mr-4" color="red" />,
      });
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.date &&
      formData.time &&
      formData.timezone
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      {/* Header */}

      {/* Basic Information Section */}
      <Card>
        <CardContent>
          <BasicInfoSection
            title={formData.title}
            date={formData.date}
            time={formData.time}
            duration={formData.duration}
            timezone={formData.timezone}
            onTitleChange={(value) => handleBasicInfoChange("title", value)}
            onDateChange={(value) => handleBasicInfoChange("date", value)}
            onTimeChange={(value) => handleBasicInfoChange("time", value)}
            onDurationChange={(value) =>
              handleBasicInfoChange("duration", value)
            }
            onTimezoneChange={(value) =>
              handleBasicInfoChange("timezone", value)
            }
          />
        </CardContent>
      </Card>

      {/* Attendees Section */}
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <AttendeesSection
            attendees={formData.attendees}
            onAttendeesChange={handleAttendeesChange}
          />
        </CardContent>
      </Card>

      {/* Agenda Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-gray-600" />
            <CardTitle>Agenda</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <AgendaSection
            agenda={formData.agenda}
            onAgendaChange={handleAgendaChange}
          />
        </CardContent>
      </Card>

      {/* Form Validation Summary */}
      {!isFormValid() && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-orange-700">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Please complete the required fields (marked with *) to save the
                meeting minutes.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="px-6"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className="px-6 bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? "Creating..." : "Create Meeting"}
        </Button>
      </div>
    </form>
  );
};
