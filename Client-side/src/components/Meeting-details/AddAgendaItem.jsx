import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { Plus } from "lucide-react";

const AddAgendaItem = ({ onAddItem, loading, canEdit }) => {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (!newItem.trim() || !canEdit) return;
    onAddItem(newItem);
    setNewItem("");
  };

  if (!canEdit) {
    return (
      <div className="p-3 bg-gray-50 rounded-lg border">
        <p className="text-sm text-gray-600 text-center">
          Meeting is completed. Agenda items cannot be added.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <Input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new agenda item..."
        onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
        disabled={loading}
        className="flex-1"
      />
      <Button 
        onClick={handleAddItem}
        disabled={!newItem.trim() || loading}
        size="sm"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AddAgendaItem;
