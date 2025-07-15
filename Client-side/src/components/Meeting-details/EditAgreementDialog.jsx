import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../UI/Dialog";
import AgreementForm from "./AgreementForm";
import AssigneeSelector from "./AssigneeSelector";

const EditAgreementDialog = ({ 
  isOpen, 
  onClose, 
  onUpdateAgreement, 
  onDeleteAgreement, 
  agreement, 
  attendees, 
  loading 
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [agreementType, setAgreementType] = useState('general');

  useEffect(() => {
    if (agreement) {
      setTitle(agreement.title || "");
      setDescription(agreement.description || "");
      setSelectedAssignees(agreement.assignees || []);
      setDeadline(agreement.deadline || "");
      setAgreementType(agreement.agreement_type || 'general');
    }
  }, [agreement]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreement || !description.trim()) {
      return;
    }
    // For task assignments, use description as title if no title exists
    const titleValue = agreementType === 'task_assignment' ? (title || description.trim()) : title.trim();
    if (agreementType === 'general' && !titleValue) {
      return;
    }
    // Update the agreement
    onUpdateAgreement(agreement.id, {
      title: titleValue,
      description: description.trim(),
      assignees: selectedAssignees.length > 0 ? selectedAssignees : undefined,
      deadline: deadline || undefined,
      type: agreementType
    });
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

  if (!agreement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-100">
        <DialogHeader>
          <DialogTitle>Edit Agreement</DialogTitle>
        </DialogHeader>
        
        <AgreementForm
          agreement={agreement}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          deadline={deadline}
          setDeadline={setDeadline}
          agreementType={agreementType}
          setAgreementType={setAgreementType}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
          syncLoading={false}
        >
          {agreementType === 'task_assignment' && (
            <AssigneeSelector
              attendees={attendees}
              selectedAssignees={selectedAssignees}
              onToggleAssignee={toggleAssignee}
              onRemoveAssignee={removeAssignee}
            />
          )}
        </AgreementForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditAgreementDialog;
