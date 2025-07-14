import { useState } from 'react';
import { Input } from '../UI/Input';
import { Label } from '../UI/Label';
import { Button } from '../UI/Button';
import { Edit2, Plus, Trash2 } from 'lucide-react';

export const AgendaSection = ({ agenda, onAgendaChange }) => {
  const [agendaItem, setAgendaItem] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdateAgendaItem = () => {
    if (!agendaItem.trim()) return;
    
    if (editingIndex !== null) {
      const updatedAgenda = [...agenda];
      updatedAgenda[editingIndex] = agendaItem.trim();
      onAgendaChange(updatedAgenda);
      setEditingIndex(null);
    } else {
      if (!agenda.includes(agendaItem.trim())) {
        onAgendaChange([...agenda, agendaItem.trim()]);
      }
    }
    setAgendaItem("");
  };

  const handleEditAgendaItem = (index) => {
    setAgendaItem(agenda[index]);
    setEditingIndex(index);
  };

  const handleDeleteAgendaItem = (index) => {
    onAgendaChange(agenda.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setAgendaItem("");
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setAgendaItem("");
  };

  return (
    <div>
      <Label className="text-sm font-medium">Agenda Items</Label>
      <div className="flex gap-2 mt-1">
        <Input
          value={agendaItem}
          onChange={(e) => setAgendaItem(e.target.value)}
          placeholder="Enter agenda item"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddOrUpdateAgendaItem())}
        />

        <Button
            type="button"
            onClick={handleAddOrUpdateAgendaItem}
            className="px-3"
          >
            {editingIndex !== null ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </Button>
        {editingIndex !== null && (
          <Button type="button" onClick={handleCancelEdit} variant="outline" size="sm">
            Cancel
          </Button>
        )}
      </div>
      <div className="space-y-2 mt-2">
        {agenda.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
            <span className="text-sm flex-1">{item}</span>
            <div className="flex gap-1 ml-2">
              <Button
                type="button"
                onClick={() => handleEditAgendaItem(index)}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                type="button"
                onClick={() => handleDeleteAgendaItem(index)}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};