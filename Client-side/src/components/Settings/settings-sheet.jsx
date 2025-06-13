import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../UI/Button";
import  {Input}  from "../UI/Input";
import {
  BoltIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  SettingsIcon,
  SignatureIcon,
  UserIcon,
} from "lucide-react";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../UI/Form";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../UI/Sheet";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../UI/Tabs";

import { UserDataTable } from "./UserManagement/UserDataTable";
import { userDataColumns } from "./UserManagement/UserDataColumns";
import { MultiSelect } from "../UI/MultiSelect";
import { LoadingOverlay } from "../LoadingOverlay";
// import { useToast } from "../Hooks/use-toast";
import { useSelector, useDispatch } from "react-redux";
import { setUserList } from "../../Redux/Slices/usersSlice";
import { Separator } from "../UI/Separator";
import  GeneralSettings  from "./general-settings";
import  EmailSignatureSettings  from "./email-signature-settings";

const userRoles = [
  { value: "admin", label: "Admin" },
  { value: "project-user", label: "Project User" },
  { value: "project-manager", label: "Project Manager" },
  { value: "dashboard-user", label: "Dashboard User" },
  { value: "sales-user", label: "Sales User" },
  { value: "sales-manager", label: "Sales Manager" },
  { value: "finance-user", label: "Finance User" },
  { value: "finance-manager", label: "Finance Manager" },
  { value: "general-manager", label: "General Manager" },
  { value: "software-developer", label: "Software Developer" },
];

export function SettingsSheet() {
  const [loading, setLoading] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const userList = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();
  // const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      roles: [],
    },
  });

  const createUser = async (user) => {
    setLoading(true);
    const doc = {
      name: user.name,
      email: user.email,
      roles: user.roles,
    };

    console.log(doc);
    

    try {
      const res = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/user`, doc);

      toast({
        title: "User Created",
        description: "The user has been successfully created.",
        icon: <CircleCheckIcon className="mr-4" color="green" />,
      });
    } catch (err) {
      if (err.response?.data?.code === 11000) {
        // toast({
        //   title: "User Already Exists",
        //   description: "A user with this email already exists.",
        //   variant: "destructive",
        //   icon: <CircleAlertIcon className="mr-4" color="red" />,
        // });
      } else {
        // toast({
        //   title: "User Not Created",
        //   description: "There was an error creating the user.",
        //   variant: "destructive",
        //   icon: <CircleXIcon className="mr-4" color="red" />,
        // });
      }
    }

    setLoading(false);
    form.reset();
    setResetKey((prevKey) => prevKey + 1);
    fetchUsers();
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_CS365_URI}/api/user`, { headers: { "Cache-Control": "no-store" } });
      dispatch(setUserList(res.data));
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const onSubmit = (values) => {
    createUser(values);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[800px] overflow-auto">
        {loading && <LoadingOverlay />}
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold mb-10">Settings</SheetTitle>
          <div className="mt-0">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">
                  <BoltIcon className="mr-2 h-4 w-4" /> General
                </TabsTrigger>
                <TabsTrigger value="user-management">
                  <UserIcon className="mr-2 h-4 w-4" /> User Management
                </TabsTrigger>
                <TabsTrigger value="email-signature">
                  <SignatureIcon className="mr-2 h-4 w-4" /> Email Signature
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <GeneralSettings />
              </TabsContent>

              <TabsContent value="user-management">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-between">
                      <h1>User Details</h1>
                      <div className="flex flex-col gap-2">
                        <Button
                          className="bg-[var(--csblue)] hover:bg-[var(--csblue/90)] px-8"
                          type="submit"
                          disabled={loading}
                        >
                          Save
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid w-full grid-cols-[2fr_2fr_1fr] gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: "Email is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="user@consyst.biz" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                              <Input disabled placeholder="Name will be shown here" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Button
                          className="bg-[var(--csblue)] hover:bg-[var(--csblue/90)] px-8"
                          type="submit"
                          disabled={loading}
                        >
                          New
                        </Button>
                      </div>

                      <div className="col-span-2 max-w-xl">
                        <FormField
                          control={form.control}
                          name="roles"
                          rules={{
                            validate: (value) => value.length > 0 || "Please select at least one role",
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Roles</FormLabel>
                              <FormControl>
                                <MultiSelect
                                  key={resetKey}
                                  options={userRoles}
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  placeholder="Select roles"
                                  variant="destructive"
                                  maxCount={3}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </form>
                </Form>

                <Separator className="mt-8 mb-4" />

                <div>
                  <UserDataTable
                    columns={userDataColumns}
                    data={userList}
                    onRowClick={(row) => {
                      form.setValue("email", row.email);
                      form.setValue("username", row.name);
                      form.setValue("roles", row.roles);
                      setResetKey((prevKey) => prevKey + 1);
                    }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="email-signature">
                <EmailSignatureSettings />
              </TabsContent>
            </Tabs>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
