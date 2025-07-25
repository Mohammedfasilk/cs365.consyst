import React from "react";
import { Badge } from "../UI/Badge";
import { Button } from "../UI/Button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../UI/Alert_Dialog";

const AgreementItem = ({ 
  meetingId,
  agreement, 
  onEdit, 
  onDelete, 
  meetingStatus, 
  agreementLoading ,
  onRefresh
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getSyncStatusBadge = (agreement) => {
    // Only show sync status for task assignments
    if (agreement.type !== 'task_assignment') {
      return null;
    }
    
    if (agreement.sync_status === 'synced') {
      return <Badge variant="default" className="bg-green-500 text-xs">Synced to To Do</Badge>;
    }
    return null;
  };

  const formatDeadlineDisplay = (dateStr) => {
    if (!dateStr) return "";
    
    try {
      // Handle different date formats that might come from the database
      let date;
      
      // If it's already a valid date string, parse it directly
      if (dateStr.includes('-')) {
        // ISO format: YYYY-MM-DD
        date = new Date(dateStr);
      } else if (dateStr.includes('/')) {
        // US format: MM/DD/YYYY
        date = new Date(dateStr);
      } else {
        // Try parsing as is
        date = new Date(dateStr);
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateStr;
      }
      
      const formatted = format(date, "d MMM yyyy");
      return formatted;
    } catch (error) {
      return dateStr;
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent triggering the edit dialog
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/handle-agreement`,{
        meetingId:meetingId,
        agreementId:agreement._id,
        action:'delete',
      })
      await onRefresh();
      setShowDeleteDialog(false);
    }catch(err){
      console.log("Error deleting agreement",err);
      setShowDeleteDialog(false);
    }
  };

  const handleEditClick = () => {
    onEdit(agreement);
  };

  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors group">
      {/* AlertDialog for delete confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Agreement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this agreement? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={agreementLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={confirmDelete}
              disabled={agreementLoading}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex items-start justify-between mb-2">
        <div 
          className="flex-1 cursor-pointer"
          onClick={handleEditClick}
        >
          {/* Only show title for general agreements, not for task assignments */}
          {agreement.title && agreement.type !== 'task_assignment' && (
            <h4 className="font-semibold text-lg mb-1">{agreement.title}</h4>
          )}
          <p className={agreement.title && agreement.type !== 'task_assignment' ? "text-gray-700" : "font-medium"}>
            {agreement.description}
          </p>
        </div>
        <div className="flex gap-2 items-center ml-4">
          <Badge variant={agreement.type === 'task_assignment' ? 'default' : 'default'}>
            {agreement.type === 'task_assignment' ? 'Task' : 'General'}
          </Badge>
          {getSyncStatusBadge(agreement)}
          {meetingStatus !== "completed" && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteClick}
              className="h-6 w-6 p-0 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={agreementLoading}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
      {agreement.assignees && agreement.assignees.length > 0 && (
        <div className="mb-2">
          <p className="text-sm text-gray-600 mb-1">Assigned to:</p>
          <div className="flex flex-wrap gap-1">
            {agreement.assignees.map((assignee, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className={`text-xs ${assignee.endsWith('@consyst.biz') ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                {assignee}
                {assignee.endsWith('@consyst.biz') && (
                  <span className="ml-1 text-blue-600">•</span>
                )}
              </Badge>
            ))}
          </div>
          {agreement.assignees.some(email => email.endsWith('@consyst.biz')) && (
            <p className="text-xs text-blue-600 mt-1">• Internal team members will receive task assignments</p>
          )}
        </div>
      )}
      {agreement.deadline && (
        <p className="text-sm text-gray-600">
          Deadline: {formatDeadlineDisplay(agreement.deadline)}
        </p>
      )}
    </div>
  );
};

export default AgreementItem; 