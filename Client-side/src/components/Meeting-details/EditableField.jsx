import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

const EditableField = ({ 
  value, 
  onSave, 
  placeholder, 
  label, 
  isEditable, 
  loading 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    if (!isEditable) return;
    setIsEditing(true);
    setInputValue(value || "");
  };

  const handleSave = async () => {
    if (!inputValue.trim()) return;
    
    try {
      await onSave(inputValue.trim());
      setIsEditing(false);
      setInputValue("");
    } catch (error) {
      // Error handled in parent component
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="text-sm">
        <span className="font-medium">{label}:</span>{" "}
        <div className="flex items-center gap-2 mt-1">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="h-8 text-sm"
            disabled={loading}
            onKeyDown={handleKeyPress}
            autoFocus
          />
          <Button
            size="sm"
            onClick={handleSave}
            disabled={loading || !inputValue.trim()}
          >
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm">
      <span className="font-medium">{label}:</span>{" "}
      <span 
        className={`$${
          isEditable 
            ? 'cursor-pointer hover:bg-gray-200 px-1 py-0.5 rounded' 
            : ''
        } $${
          value 
            ? 'text-gray-600' 
            : 'italic text-gray-400'
        }`}
        onClick={handleClick}
        title={isEditable ? 'Click to edit' : ''}
      >
        {value || 'Not provided'}
      </span>
    </div>
  );
};

export default EditableField; 