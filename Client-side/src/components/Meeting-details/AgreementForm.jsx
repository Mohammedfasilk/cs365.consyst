import React from "react";
import { format } from "date-fns";
import { Label } from "../UI/Label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../UI/Select";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/TextArea";
import { Button } from "../UI/Button";

const AgreementForm = ({
  agreement,
  title,
  setTitle,
  description,
  setDescription,
  deadline,
  setDeadline,
  agreementType,
  setAgreementType,
  onSubmit,
  onCancel,
  loading,
  syncLoading,
  children
}) => {
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
    <form onSubmit={onSubmit} className="space-y-4">
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
        <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter agreement description"
          className="mt-1"
          rows={3}
          required
        />
      </div>

      {children}

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
        <Button 
          type="submit" 
          className="flex-1 bg-blue-600 hover:bg-blue-700"
          disabled={loading || syncLoading}
        >
          {syncLoading ? 'Updating...' : 'Update Agreement'}
        </Button>
        <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AgreementForm; 