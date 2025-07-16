import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Save, X, Edit2, Trash2, ArrowRight } from "lucide-react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../UI/Alert_Dialog";

const AgendaItemRow = ({
  index,
  item,
  canEdit,
  meetingStatus,
  loading,
  onEdit,
  meetingId,
  onMoveToPending,
  onRefresh
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
  const handleStartEdit = () => {
    if (!canEdit) return;
    setIsEditing(true);
    setEditText(item);
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    onEdit(index, editText.trim());
    setIsEditing(false);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText("");
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/meeting/handle-agenda`,
        {
          meetingId: meetingId,
          action: "delete",
          index: index,
        }
      );
      setIsDeleteDialogOpen(false);
      onRefresh();
    } catch (error) {
      setIsDeleteDialogOpen(false);
      console.error("Error deleting agenda item:", error);
    }
  };

  const handleMoveToPendingClick = async (e) => {
    e.stopPropagation();
    try {
      await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/meeting/handle-agenda`,
        {
          meetingId: meetingId,
          action: "move",
          index: index,
        }
      );
      setIsDeleteDialogOpen(false);
      onRefresh();
    } catch (error) {
      setIsDeleteDialogOpen(false);
      console.error("Error deleting agenda item:", error);
    }
  };

  return (
    <>
      <div className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSaveEdit()}
              className="flex-1"
              autoFocus
            />
            <Button onClick={handleSaveEdit} size="sm" disabled={loading}>
              <Save className="h-3 w-3" />
            </Button>
            <Button onClick={handleCancelEdit} size="sm" variant="outline">
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <>
            <span className="flex-1">{item}</span>
            <div className="flex gap-1 ml-2">
              {meetingStatus === "in-progress" && (
                <Button
                  onClick={handleMoveToPendingClick}
                  variant="outline"
                  size="sm"
                  className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight className="w-3 h-3 mr-1" />
                  Move to Pending
                </Button>
              )}
              {canEdit && (
                <>
                  <Button
                    onClick={handleStartEdit}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={loading}
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button
                    onClick={handleDeleteClick}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={loading}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Agenda Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this agenda item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AgendaItemRow;
