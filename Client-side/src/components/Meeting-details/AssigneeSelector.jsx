import React from "react";
import { Label } from "../UI/Label";
import { Checkbox } from "../UI/Checkbox";
import { Badge } from "../UI/Badge";
import { X } from "lucide-react";

const AssigneeSelector = ({
  attendees,
  selectedAssignees,
  onToggleAssignee,
  onRemoveAssignee
}) => {
  return (
    <div>
      <Label className="text-sm font-medium">Assign to</Label>
      <div className="mt-2 space-y-2">
        {attendees.map((attendee) => (
          <div key={attendee} className="flex items-center space-x-2">
            <Checkbox
              id={attendee}
              checked={selectedAssignees.includes(attendee)}
              onCheckedChange={() => onToggleAssignee(attendee)}
            />
            <Label htmlFor={attendee} className="text-sm">{attendee}</Label>
          </div>
        ))}
      </div>
      
      {selectedAssignees.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedAssignees.map((assignee) => (
            <Badge key={assignee} variant="secondary" className="flex items-center gap-1">
              {assignee}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => onRemoveAssignee(assignee)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssigneeSelector; 