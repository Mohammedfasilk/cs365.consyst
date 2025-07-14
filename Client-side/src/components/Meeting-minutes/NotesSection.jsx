import { useState } from 'react';
import { Label } from '../UI/Label';
import { Textarea } from '../UI/TextArea';
import { Button } from '../UI/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../UI/Card';
import { FileText, Save, Edit2, Check, X } from 'lucide-react';

export const NotesSection = ({ notes, onNotesChange, isEditable = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(notes || '');

  const handleSave = () => {
    onNotesChange(editedNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedNotes(notes || '');
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    setEditedNotes(notes || '');
    setIsEditing(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-600" />
            <CardTitle className="text-lg">Meeting Notes</CardTitle>
          </div>
          {isEditable && !isEditing && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleStartEdit}
              className="h-8 px-3"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editedNotes}
              onChange={(e) => setEditedNotes(e.target.value)}
              placeholder="Enter meeting notes here..."
              rows={8}
              className="min-h-[200px]"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleSave}
                className="px-4"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Notes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-4"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {notes ? (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {notes}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No notes added yet</p>
                {isEditable && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleStartEdit}
                    className="mt-2"
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Add Notes
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 