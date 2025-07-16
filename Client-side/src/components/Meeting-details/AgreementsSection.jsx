import React, { useState } from "react";
import { Card, CardContent } from "../UI/Card";
import AgreementsHeader from './AgreementsHeader'
import AgreementsList from './AgreementsList'
import AddAgreementDialog from "./AddAgreementDialog";
import axios from "axios";
import { useToast } from "../../Hooks/use-toast";
import { CircleCheckIcon } from "lucide-react";
import EditAgreementDialog from "./EditAgreementDialog";
// import AddAgreementDialog from "./AddAgreementDialog";
// import EditAgreementDialog from "./EditAgreementDialog";

const AgreementsSection = ({ 
  meetingId,
  agreements, 
  onAddAgreement, 
  onEditAgreement,
  onDeleteAgreement, 
  agreementLoading, 
  meetingStatus,
  attendeeEmails,
  onRefresh

}) => {
const {toast} = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState(null);

  // Calculate counts
  const agreementCount = agreements?.filter(agreement => agreement.type === 'general').length || 0;
  const taskCount = agreements?.filter(agreement => agreement.type === 'task_assignment').length || 0;

  const handleAddAgreement = async (agreement) => {
     try {
      await axios.post(`${import.meta.env.VITE_CS365_URI}/api/meeting/create-agreement`,{
        id:meetingId,
        agreement:agreement
      })

      toast({
              title: "Agreement Created",
              description: "The agreement has been added.",
              icon: <CircleCheckIcon className="mr-4" color="green" />,
            });

      onRefresh();
      
    } catch (error) {
      console.error('Error adding agreement :', error);
    }    
    setIsAddDialogOpen(false);
  };

  const handleEditAgreement = (agreement) => {
    setSelectedAgreement(agreement);
    setIsEditDialogOpen(true);
  };

  const handleUpdateAgreement = (agreementId, agreement) => {
    onEditAgreement(agreementId, agreement);
    setIsEditDialogOpen(false);
    setSelectedAgreement(null);
  };

  const handleDeleteAgreement = (agreementId) => {
    onDeleteAgreement(agreementId);
  };

  return (
    <>
      <Card>
        <AgreementsHeader
          onAddClick={() => setIsAddDialogOpen(true)}
          meetingStatus={meetingStatus}
          agreementLoading={agreementLoading}
          agreementCount={agreementCount}
          taskCount={taskCount}
        />
        <CardContent>
          <AgreementsList
            meetingId={meetingId}
            onRefresh={onRefresh}
            agreements={agreements}
            onEditAgreement={handleEditAgreement}
            onDeleteAgreement={handleDeleteAgreement}
            meetingStatus={meetingStatus}
            agreementLoading={agreementLoading}
          />
        </CardContent>
      </Card>

      <AddAgreementDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddAgreement={handleAddAgreement}
        attendees={attendeeEmails}
      />

      <EditAgreementDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedAgreement(null);
        }}
        onUpdateAgreement={handleUpdateAgreement}
        onDeleteAgreement={handleDeleteAgreement}
        agreement={selectedAgreement}
        attendees={attendeeEmails}
        loading={agreementLoading}
      />
    </>
  );
};

export default AgreementsSection;
