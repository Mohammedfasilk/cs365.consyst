import { useEffect, useState } from "react";
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
import axios from "axios"
import { setSelectedSchedule } from "../../Redux/Slices/scheduleSheetslice";

function ChooseSchedule() {
  const dispatch = useDispatch();

  const [projectList, setProjectList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState({ search: "" });

  const selectedProject = useSelector((state) => state.scheduleSheet.selectedSchedule);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/timeline/list`,
          search
        );
        const data = await res.data;

        setProjectList(data);
        
      } catch (error) {
        console.error("Error fetching Project List:", error);
      }
    };

    fetchData();
  }, [search]);

  return (
    <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger asChild>
        <div className="text-left text-md p-1 text-gray-800 cursor-pointer  border-transparent hover:text-gray-600">
          {selectedProject || "Choose a Project"}
        </div>
      </PopoverTrigger>
      <PopoverContent className={`p-0 w-lg`}>
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
              {projectList.map((project,index) => (
                <CommandItem
                  key={index}
                  value={project.project_title}
                  onSelect={(currentValue) => {
                    dispatch(setSelectedSchedule(project.project_name));                                        
                    setDropdownOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedProject === project.project_name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {project.project_title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ChooseSchedule;
