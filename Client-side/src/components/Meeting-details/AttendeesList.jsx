import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../UI/Card";
import { Button } from "../UI/Button";
import { Plus, Crown, Building2, Users } from "lucide-react";
import AttendeeCard from "./AttendeeCard";
import AttendeeListItem from "./AttendeeListItem";
// import AttendeeCard from "./AttendeeCard";
// import AddAttendeeForm from "./AddAttendeeForm";

const AttendeesList = ({ meeting,attendees, meetingStatus, meetingId, meetingOwnerId, onRefresh }) => {
  const [isAddingAttendee, setIsAddingAttendee] = useState(false);

  const handleAddSuccess = () => {
    setIsAddingAttendee(false);
    onRefresh();
  };

  // Count total hosts
  const totalHosts = attendees?.filter(attendee => attendee.role === 'host').length;

  // Separate attendees by role and type
  const hosts = attendees?.filter(attendee => attendee.role === 'host')
  const participants = attendees
  
  const internalParticipants = participants?.filter(attendee => 
    attendee.email.toLowerCase().endsWith('@consyst.biz')
  );
  const externalParticipants = participants?.filter(attendee => 
    !attendee.email.toLowerCase().endsWith('@consyst.biz')
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Hosts and Participants</CardTitle>
          {meetingStatus === 'in-progress' && (
            <Button
              size="sm"
              onClick={() => setIsAddingAttendee(true)}
              disabled={isAddingAttendee}
              className="h-8 px-3"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Hosts Section */}
          {hosts?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-4 h-4 text-yellow-500" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Hosts ({hosts?.length})
                </h3>
              </div>
              <div className="space-y-3">
                {hosts?.map((attendee) => (
                  <AttendeeCard
                    key={attendee?._id}
                    attendee={attendee}
                    meetingStatus={meetingStatus}
                    meetingOwnerId={meetingOwnerId}
                    onRefresh={onRefresh}
                    totalHosts={totalHosts}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Internal Participants Section */}
          {internalParticipants?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Internal Participants ({internalParticipants?.length})
                </h3>
              </div>
              <div className="space-y-0.5 bg-gray-50 rounded-md p-2">
                {internalParticipants.map((attendee, index) => (
                  <AttendeeListItem
                    key={attendee.id}
                    attendee={attendee}
                    index={index}
                    meetingStatus={meetingStatus}
                    meetingOwnerId={meetingOwnerId}
                    onRefresh={onRefresh}
                    totalHosts={totalHosts}
                  />
                ))}
              </div>
            </div>
          )}

          {/* External Participants Section */}
          {externalParticipants?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-green-600" />
                <h3 className="text-sm font-semibold text-gray-700">
                  External Participants ({externalParticipants?.length})
                </h3>
              </div>
              <div className="space-y-0.5 bg-gray-50 rounded-md p-2">
                {externalParticipants?.map((attendee, index) => (
                  <AttendeeListItem
                    key={attendee.id}
                    attendee={attendee}
                    index={index}
                    meetingStatus={meetingStatus}
                    meetingOwnerId={meetingOwnerId}
                    onRefresh={onRefresh}
                    totalHosts={totalHosts}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Add new attendee form */}
          {/* {isAddingAttendee && (
            <AddAttendeeForm
              meetingId={meetingId}
              onSuccess={handleAddSuccess}
              onCancel={() => setIsAddingAttendee(false)}
            />
          )} */}

          {attendees?.length === 0 && (
            <p className="text-gray-500 text-sm">No attendees</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendeesList;
