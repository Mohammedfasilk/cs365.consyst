import React from "react";
import { CardHeader, CardTitle } from "../UI/Card";
import { Badge } from "../UI/Badge";
import { Button } from "../UI/Button";
import { Plus } from "lucide-react";

const AgreementsHeader = ({ onAddClick, meetingStatus, agreementLoading, agreementCount, taskCount }) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          Agreements & Tasks
          <div className="flex gap-1">
            <Badge variant="outline">{agreementCount} agreements</Badge>
            <Badge variant="outline">{taskCount} tasks</Badge>
          </div>
        </div>
        {meetingStatus !== "completed" && (
          <Button 
            onClick={onAddClick}
            size="sm"
            variant="outline"
            disabled={agreementLoading || meetingStatus === "upcoming"}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Agreement
          </Button>
        )}
      </CardTitle>
    </CardHeader>
  );
};

export default AgreementsHeader; 