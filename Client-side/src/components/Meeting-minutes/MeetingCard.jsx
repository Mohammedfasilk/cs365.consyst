import React from 'react';
import MeetingCardHeader from './MeetingCardHeader';
// import MeetingDateTime from './MeetingDateTime';
import { Button } from '../UI/Button';
import { Calendar, CheckSquare, Clock, FileText, User, UserCheck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MeetingCard = ({ meeting, onEditMeeting, onDeleteMeeting,refresh}) => {
  const navigate = useNavigate();
  const generalAgreements = meeting?.agreement?.filter((agreement)=>agreement.type === 'general').length || 0
  const tasks = meeting?.agreement?.filter((agreement)=>agreement.type === 'task_assignment').length || 0
  const pending = meeting?.pending?.length || 0
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-100 flex flex-col min-h-[280px] w-full">
      <MeetingCardHeader 
        meeting={meeting}
        onEditMeeting={onEditMeeting}
        onDeleteMeeting={onDeleteMeeting}
        refresh={refresh}
      />

      <div className="flex justify-between mb-4 flex-1 gap-6">
        <div className="space-y-2 flex-shrink-0 min-w-0 w-3/5">
          <div className="flex items-center text-sm text-gray-600">
      <Calendar className="w-4 h-4 mr-2" />
    {meeting.date} at {meeting.time}
    </div>
         <div className="space-y-1 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <User className="w-4 h-4" />
        <span>
          Host: {meeting.host}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4" />
        <span>
          Participants: {meeting.attendees.length || 0}
        </span>
      </div>
    </div>
        </div>
        
        <div className="w-2/5 border-l border-gray-100 pl-4 min-w-0">
          {/* <AdditionalStats /> */}
           <div className="space-y-1 text-xs">
      <div className="flex items-center gap-1.5">
        <FileText className="w-3 h-3 text-blue-500" />
        <span className="text-blue-700">
          Agenda: {meeting.agenda.length || 0}
        </span>
      </div>
      
      {meeting.status !== 'upcoming' && (
        <>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-amber-500" />
            <span className="text-amber-700">
              Pending: 
              {pending}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckSquare className="w-3 h-3 text-green-500" />
            <span className="text-green-700">
              Agreements: 
              {generalAgreements}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-3 h-3 text-purple-500" />
            <span className="text-purple-700">
              Tasks: 
              {tasks}
            </span>
          </div>
        </>
      )}
    </div>
        </div>
      </div>

      <div className="mt-auto">
      <div className="flex gap-2 min-h-[40px] items-end">
      <Button 
        onClick={() => navigate(`/business-tools/meeting-details/${meeting._id}`)}
        variant={meeting.status === "upcoming" ? "default" : "outline"}
        className="flex-1 h-10"
      >
        {meeting.status === "upcoming" ? "Open Meeting" : "View Details"}
      </Button>
    </div>
      </div>
    </div>
  );
};

export default MeetingCard; 