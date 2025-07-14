import React from 'react'
import { Button } from '../UI/Button'
import { Plus } from 'lucide-react'

function EmptyMeetingsState({onCreateMeeting}) {
   const isFiltered = true
  return (
     <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isFiltered ? "No meetings found" : "No meetings yet"}
          </h3>
          <p className="text-gray-600 mb-6">
            {isFiltered 
              ? "Try adjusting your search or filter criteria."
              : "Create your first meeting to get started with organized note-taking and task management."
            }
          </p>
          {/* {showCreateButton && ( */}
            <Button 
              onClick={onCreateMeeting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Meeting
            </Button>
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default EmptyMeetingsState