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
import {
  setSelectedProject,
  setSelectedProjectName,
} from "../../Redux/Slices/SelectedProject";

function ChooseCostControlProject({ project_name }) {
  const dispatch = useDispatch();

  const [projectList, setProjectList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState({ search: "" });

  const setSalesOrder = []; //from redux
  const selectedCostControlProject = ""; //useSelector((state) => state.selectedProject.project);
  const selectedCostControlProjectName = useSelector(
    (state) => state.selectedProject.selectedProjectName
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/cost-control/list`,
          search
        );
        const data = await res.data;
        console.log(data);

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
        <div className="text-left text-2xl text-gray-400 cursor-pointer border-b-2 border-transparent hover:border-gray-200">
          {project_name || "Choose a Project"}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[760px] p-0">
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
                  value={project.project_title}
                  onSelect={(currentValue) => {
                    const newName =
                      currentValue === selectedCostControlProjectName
                        ? ""
                        : currentValue;
                    dispatch(setSelectedProjectName(newName));
                    dispatch(setSelectedProject(project));
                    setDropdownOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCostControlProjectName === project.project_title
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

export default ChooseCostControlProject;
