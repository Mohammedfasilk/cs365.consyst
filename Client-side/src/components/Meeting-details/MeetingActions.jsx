import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../UI/Card";
import { Button } from "../UI/Button";
import { Download } from "lucide-react";
import { useMsal } from "@azure/msal-react";

const MeetingActions = ({ 
  meetingId,
  meetingStatus, 
  ownerId,
  attendees = [],
  onGeneratePDF, 
  emailLoading,
  statusLoading = false
}) => {
  const {accounts} = useMsal()  
  const user = accounts[0]?.name;
  // Check if user is the original owner or any host
  const isOriginalOwner = user && ownerId === user;
  const isHost = isOriginalOwner || attendees.some(attendee => 
    attendee.user_id === user?.id && attendee.role === 'host'
  ) || attendees.some(attendee => 
    attendee.email.toLowerCase() === user?.email?.toLowerCase() && attendee.role === 'host'
  );
  
  
  if (!isHost) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          className="w-full" 
          variant="outline"
          onClick={onGeneratePDF}
          disabled={emailLoading || statusLoading}
        >
          <Download className="w-4 h-4 mr-2" />
          {emailLoading ? "Generating..." : "Generate PDF Report"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MeetingActions;
