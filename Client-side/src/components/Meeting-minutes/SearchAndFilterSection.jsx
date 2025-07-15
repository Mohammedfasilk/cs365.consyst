import React from 'react'
import {Input} from '../UI/Input'
import {Checkbox} from '../UI/Checkbox'

function SearchAndFilterSection({
  searchQuery,
  onSearchChange,
  roleFilters,
  onRoleFiltersChange,
  showCompleted,
  onShowCompletedChange,
}) {
    //  const { isAdmin } = useUserRole();

      const roleOptions = [
    { id: "host", label: "Host" },
    { id: "participant", label: "Participant" },
  ];

  const handleRoleChange = (roleId, checked) => {
    if (checked) {
      onRoleFiltersChange([...roleFilters, roleId]);
    } else {
      onRoleFiltersChange(roleFilters.filter(filter => filter !== roleId));
    }
  };

  return (
     <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
      {/* Search Bar */}
      <div className="relative mb-4">
        {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /> */}
        <Input
          type="text"
          placeholder="Search meetings..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

      <div className="flex flex-wrap gap-6 items-center">
        {/* Role Filters */}
        <div className="flex flex-wrap gap-4">
          <span className="text-sm font-medium text-gray-700 mr-2">Show meetings where I am:</span>
          {roleOptions.map((role) => (
            <div key={role.id} className="flex items-center space-x-2">
              <Checkbox
                id={role.id}
                checked={roleFilters.includes(role.id)}
                onCheckedChange={(checked) => handleRoleChange(role.id, checked)}
              />
              <label htmlFor={role.id} className="text-sm text-gray-600 cursor-pointer">
                {role.label}
              </label>
            </div>
          ))}
        </div>

        {/* Show Completed Meetings Checkbox */}
        <div className="flex items-center space-x-2 ml-auto">
          <Checkbox
            id="show-completed"
            checked={showCompleted}
            onCheckedChange={(checked) => onShowCompletedChange(checked)}
          />
          <label htmlFor="show-completed" className="text-sm text-gray-600 cursor-pointer">
            Show completed meetings
          </label>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilterSection