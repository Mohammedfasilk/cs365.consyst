import React, { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../UI/Dialog";
import { Label } from "../UI/Label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../UI/Select";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/TextArea";
import { Checkbox } from "../UI/Checkbox";
import { Badge } from "../UI/Badge";
import { Button } from "../UI/Button";
import { X } from "lucide-react";

const AddAgreementDialog = ({ isOpen, onClose, onAddAgreement, attendees }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [agreementType, setAgreementType] = useState('general');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For task assignments, title is not required, only description
    // For general agreements, both title and description are required
    if (agreementType === 'general' && !title.trim()) {
      return;
    }
    if (!description.trim()) {
      return;
    }
    onAddAgreement({
      title: agreementType === 'task_assignment' ? description.trim() : title.trim(),
      description: description.trim(),
      assignees: selectedAssignees.length > 0 ? selectedAssignees : undefined,
      deadline: deadline || undefined,
      type: agreementType
    });
    // Reset form
    setTitle("");
    setDescription("");
    setSelectedAssignees([]);
    setDeadline("");
    setAgreementType('general');
  };

  const toggleAssignee = (email) => {
    setSelectedAssignees(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const removeAssignee = (email) => {
    setSelectedAssignees(prev => prev.filter(e => e !== email));
  };

  const formatDeadlineDisplay = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return format(date, "d MMM yyyy");
    } catch {
      return dateStr;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-100">
        <DialogHeader>
          <DialogTitle>Add Agreement</DialogTitle>
          <DialogDescription>
            Create a new agreement or task assignment for this meeting.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Agreement Type</Label>
            <Select value={agreementType} onValueChange={setAgreementType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Agreement</SelectItem>
                <SelectItem value="task_assignment">Task Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Only show title field for general agreements */}
          {agreementType === 'general' && (
            <div>
              <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter agreement title"
                className="mt-1"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              {agreementType === 'task_assignment' ? 'Task Description *' : 'Description *'}
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={agreementType === 'task_assignment' ? 'Enter task description' : 'Enter agreement description'}
              className="mt-1"
              rows={3}
              required
            />
          </div>

          {agreementType === 'task_assignment' && (
            <div>
              <Label className="text-sm font-medium">Assign to</Label>
              <div className="mt-2 space-y-2">
                {attendees.map((attendee) => (
                  <div key={attendee} className="flex items-center space-x-2">
                    <Checkbox
                      id={attendee}
                      checked={selectedAssignees.includes(attendee)}
                      onCheckedChange={() => toggleAssignee(attendee)}
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
                        onClick={() => removeAssignee(assignee)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {agreementType === 'task_assignment' && (
            <div>
              <Label htmlFor="deadline" className="text-sm font-medium">
                Deadline
                {deadline && (
                  <span className="ml-2 text-blue-600 font-normal">
                    ({formatDeadlineDisplay(deadline)})
                  </span>
                )}
              </Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Add Agreement
            </Button>
            <Button type="button" onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAgreementDialog; 