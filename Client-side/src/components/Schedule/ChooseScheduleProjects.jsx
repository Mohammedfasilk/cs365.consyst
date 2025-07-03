import { useEffect, useState } from "react";
import axios from "axios";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../UI/Command";
import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setIsSaved, setSelectedProject, setSelectedProjectName } from "../../Redux/Slices/SelectedProject";
import { setSelectedScheduleProjectName } from "../../Redux/Slices/scheduleSheetslice";

export function ChooseScheduleProjects({ project_name }) {
  const dispatch = useDispatch();

  const [projectList, setProjectList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState({ search: "" });

  const selectedProject = useSelector((state) => state.selectedProject.project);
  const selectedScheduleProjectName = useSelector((state) => state.scheduleSheet.selectedScheduleProjectName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/timeline/projects`,
          search
        );
        const data = await res.data;
        setProjectList(data);
      } catch (error) {
        console.error("Error fetching Timeline Project List:", error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger asChild>
        <div className="text-left text-2xl text-gray-400 cursor-pointer border-b-2 border-transparent hover:border-gray-200">
          {selectedScheduleProjectName || "Choose Project"}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[760px] p-0 max-h-[400px] overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}>
        <Command>
          <CommandInput
            placeholder="Search with project name"
            onValueChange={(value) => {
              setSearch({ search: value });
            }}
          />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projectList.map((project) => (
                <CommandItem
                  key={project._id}
                  value={project.project_name}
                  onSelect={() => {
                    dispatch(setSelectedProjectName(project.name));
                    dispatch(setSelectedProject(project));
                    dispatch(setSelectedScheduleProjectName(project.project_name));
                    dispatch(setIsSaved(false));
                    setDropdownOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedScheduleProjectName === project.project_name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {project.project_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
