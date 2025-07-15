import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../UI/Card";
import { Badge } from "../UI/Badge";
import { Button } from "../UI/Button";
import { AlertCircle, ArrowLeft } from "lucide-react";

const PendingTopicsSection = ({ pendingTopics=[], meetingStatus, onMoveToAgenda }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Pending Topics
            <Badge variant="outline">{pendingTopics.length} topics</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pendingTopics?.map((topic) => (
            <div key={topic._id} className="group flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <span className="flex-1">{topic.topic}</span>
              {meetingStatus !== "completed" && onMoveToAgenda && (
                <Button
                  onClick={() => onMoveToAgenda(topic.id)}
                  variant="outline"
                  size="sm"
                  className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowLeft className="w-3 h-3 mr-1" />
                  Move to Agenda
                </Button>
              )}
            </div>
          ))}
          {pendingTopics?.length === 0 && (
            <p className="text-gray-500 text-center py-4">No pending topics</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingTopicsSection; 