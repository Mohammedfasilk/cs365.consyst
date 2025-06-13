import { useEffect, useState } from "react";
import axios from "axios";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProject, setSelectedProjectName } from "../../Redux/Slices/SelectedProject";
// import { useProjectSheetStore } from "@/utils/zustandStore";

export function ChooseProject({ project_name }) {
  const dispatch = useDispatch();

  const [projectList, setProjectList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState({ search: "" });

  const setSalesOrder = []; //from redux
  const selectedProject = useSelector((state) => state.selectedProject.project);
  const selectedProjectName = useSelector((state) => state.selectedProject.selectedProjectName);
  // const setSelectedProject = []; //form redux

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_CS365_URI}/api/projects/list`,
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


  // const fetchSalesOrderData = async (salesOrderId) => {
  //   if (!salesOrderId) {
  //     setSalesOrder("");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/api/sales-order", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ salesOrderId }),
  //     });

  //     if (!response.ok) throw new Error("Network response was not ok");

  //     const responseJson = await response.json();
  //     const salesOrderData = responseJson.data.data;
  //     setSalesOrder(salesOrderData);
  //   } catch (error) {
  //     console.error("Failed to fetch sales order:", error);
  //   }
  // };

  return (
    <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger asChild>
        <div className="text-left text-2xl text-gray-400 cursor-pointer border-b-2 border-transparent hover:border-gray-200">
          {project_name || selectedProjectName || "Choose Project"}
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
                  key={project.name}
                  value={project.name}
                  onSelect={(currentValue) => {
                    const newName = currentValue === selectedProject?.name ? "" : currentValue;
                    dispatch(setSelectedProjectName(newName));                    
                    dispatch(setSelectedProject(project));
                    setDropdownOpen(false);
                    // fetchSalesOrderData(project.sales_order);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedProject?.name === project.name
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
