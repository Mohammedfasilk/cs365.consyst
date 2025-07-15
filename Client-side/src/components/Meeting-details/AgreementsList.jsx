import React from "react";
import AgreementItem from "./AgreementItem";

const AgreementsList = ({ 
  agreements = [], 
  onEditAgreement, 
  onDeleteAgreement, 
  meetingStatus, 
  agreementLoading 
}) => {
  return (
    <div className="space-y-4">
      {agreements?.map((agreement) => (
        <AgreementItem
          key={agreement._id}
          agreement={agreement}
          onEdit={onEditAgreement}
          onDelete={onDeleteAgreement}
          meetingStatus={meetingStatus}
          agreementLoading={agreementLoading}
        />
      ))}
      {agreements?.length === 0 && (
        <p className="text-gray-500 text-center py-4">No agreements recorded yet</p>
      )}
    </div>
  );
};

export default AgreementsList; 