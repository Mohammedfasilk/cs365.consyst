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
import {
  setChoosenProject
} from "../../Redux/Slices/costControlsheet";
import axios from "axios"

function ChooseProject() {
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState({ search: "" });

  const {choosenProject} = useSelector((state) => state.costControlSheet); 
  const {saved} = useSelector((state) => state.costControlSheet); 
  const [projectList, setProjectList] = useState([]);

 
const fetchData = async (search) => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/cost-control/project-list`,
          search
        );
        const data = await res.data;
        setProjectList(data);
      } catch (error) {
        console.error("Error fetching Project List:", error);
      }
    };

useEffect(()=>{
  dispatch(setChoosenProject(''))
  fetchData(search)
},[search,saved])

  return (
    <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger asChild>
        <div className="text-left text-md p-1 text-gray-800 cursor-pointer  border-transparent hover:text-gray-600">
          {choosenProject || "Choose a Project"}
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
                    const newName =
                      currentValue === choosenProject
                        ? ""
                        : currentValue;
                    dispatch(setChoosenProject(project.project_name));                                        
                    setDropdownOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      choosenProject === project.project_name
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

export default ChooseProject;
