import axios from "axios";
import { useAgendaItems } from "../../Hooks/useAgendaItems";
import { Badge } from "../UI/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/Card";
import AddAgendaItem from "./AddAgendaItem";
import AgendaItemsList from "./AgendaItemsList";

const EditableAgendaSection = ({ 
  agenda, 
  meetingId, 
  meetingStatus, 
  isHost,
  onRefresh, 
  onMoveToPending 
}) => {
  const { addAgendaItem, updateAgendaItem, deleteAgendaItem, loading } = useAgendaItems();

  // Participants can add agenda items to non-completed meetings
  const canAddAgenda = meetingStatus !== 'completed';
  // Only hosts can edit/delete agenda items
  const canEditDeleteAgenda = isHost && meetingStatus !== 'completed';

  const handleAddItem = async (item) => {
    try {
      await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/handle-agenda`,{
        meetingId:meetingId,
        action:'add',
        item:item,
      })
      onRefresh();
    } catch (error) {
      console.error('Error adding agenda item:', error);
    }
  };

  const handleEditItem = async (itemId, item) => {
    try {
      await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/handle-agenda`,{
        meetingId:meetingId,
        action:'edit',
        newItem:item,
        index:itemId
      })
      onRefresh();
    } catch (error) {
      console.error('Error editing agenda item:', error);
    }
  };

//   const handleDeleteItem = async (itemId) => {
//     try {
//       await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/handle-agenda`,{
//         meetingId:meetingId,
//         action:'delete',
//         index:itemId,
//       })
//       onRefresh();
//     } catch (error) {
//       console.error('Error deleting agenda item:', error);
//     }
//   };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            Agenda Items
            <Badge variant="outline">{agenda?.length} items</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AddAgendaItem
            onAddItem={handleAddItem}
            loading={loading}
            canEdit={canAddAgenda}
          />

          <AgendaItemsList
            agenda={agenda}
            canEdit={canEditDeleteAgenda}
            meetingStatus={meetingStatus}
            loading={loading}
            onEdit={handleEditItem}
            onMoveToPending={onMoveToPending}
            meetingId={meetingId}
            onRefresh={onRefresh}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableAgendaSection;