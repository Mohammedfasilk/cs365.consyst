import AgendaItemRow from "./AgendaItemsRow";

const AgendaItemsList = ({ 
  agenda, 
  canEdit, 
  meetingStatus, 
  loading, 
  onEdit, 
  onMoveToPending ,
  meetingId,
  onRefresh
}) => {
  if (agenda?.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">No agenda items</p>
    );
  }

  return (
    <div className="space-y-2">
      {agenda?.map((item,indx) => (
        <AgendaItemRow
          key={indx}
          index={indx}
          item={item}
          canEdit={canEdit}
          meetingStatus={meetingStatus}
          loading={loading}
          onEdit={onEdit}
          onMoveToPending={onMoveToPending}
          meetingId={meetingId}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
};

export default AgendaItemsList;
