import React from 'react'
import { useAuthRedirect } from '../../Hooks/useAuthRoute'
import GanttChart from '../../components/Project-manage/GanttChart';

function Schedule() {

  useAuthRedirect();

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <div className='w-[95%]'>
        <GanttChart/>
      </div>
    </div>
  )
}

export default Schedule