import { useEffect, useRef, useState } from "react";
import { Button } from "../UI/Button";
import {Input} from "../UI/Input";
import { Textarea } from "../UI/TextArea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../UI/Dialog";
import { Label } from "../UI/Label";
import { useToast } from "../../Hooks/use-toast";
import { CircleCheckIcon, CircleXIcon, EditIcon, PlusCircleIcon } from "lucide-react";
import axios from "axios";
import { AddressCard } from "./address-card";


export default function EmailSignatureSettings() {
  const [addresses, setAddresses] = useState([]);
  const [newLegalDisclaimer, setNewLegalDisclaimer] = useState("");
  const [bannerImageFile, setBannerImageFile] = useState(null); // Added state for banner file
  const [hideImage, setHideImage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  async function fetchSettings() {
    try {
      // Fetch email signatures
      const { data: signatures } = await axios.get(`${import.meta.env.VITE_CS365_URI}/api/emailSignature`, {
        headers: { "Cache-Control": "no-store" },
      });
      setAddresses(signatures?.length ? signatures : []);
      
      // Fetch global settings for legal disclaimer and banner
      const { data: global } = await axios.get(`${import.meta.env.VITE_CS365_URI}/api/emailSignatureGlobal`);
      setNewLegalDisclaimer(global.legalDisclaimer ?? "");
      setHideImage(!global.banner); // Hide image if no banner exists
      setBannerImageFile(global.banner)      

    } catch (error) {
      console.error("Error fetching settings:", error.response?.data || error.message);
      toast({
        title: "Fetch Failed",
        description: "There was an error fetching the settings.",
        variant: "destructive",
        icon: <CircleXIcon className="mr-4" color="red" />,
      });
    }
  }

  async function addAddress(address) {
    if (!address.title || !address.content) return;
    try {
      await axios.post(`${import.meta.env.VITE_CS365_URI}/api/emailSignature`, address);
      setIsOpen(false);
      fetchSettings();
      toast({
        title: "Address Added",
        description: "The new address has been successfully added.",
        icon: <CircleCheckIcon className="mr-4" color="green" />,
      });
    } catch (error) {
      console.error("Failed to add address:", error);
      toast({
        title: "Add Address Failed",
        description: "There was an error adding the address.",
        variant: "destructive",
        icon: <CircleXIcon className="mr-4" color="red" />,
      });
    }
  }

  useEffect(() => {
    fetchSettings();
  }, []);

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("banner", file);
      setHideImage(true);

      const response = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/emailSignatureGlobal`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setTimeout(() => {
          setHideImage(false); // Wait to ensure the file is saved on disk
        }, 500);
        setBannerImageFile(null);
        fetchSettings();
        toast({
          title: "Upload Successful",
          description: "Banner and disclaimer updated successfully.",
          icon: <CircleCheckIcon className="mr-4" color="green" />,
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setHideImage(false);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading the banner/disclaimer.",
        variant: "destructive",
        icon: <CircleXIcon className="mr-4" color="red" />,
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/emailSignatureGlobal`, {
        legalDisclaimer: newLegalDisclaimer,
      });
      if (response.status === 200) {
        fetchSettings();
        toast({
          title: "Saved Successfully",
          description: "The settings have been successfully saved.",
          icon: <CircleCheckIcon className="mr-4" color="green" />,
        });
      }
    } catch (error) {
      console.error("Save failed:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving the settings.",
        variant: "destructive",
        icon: <CircleXIcon className="mr-4" color="red" />,
      });
    }
  };

  const NewAddress = () => {
    const [label, setLabel] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>New Address</DialogTitle>
            <DialogDescription>
              Please enter the details for your new address and click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">Label</Label>
              <Input
                id="label"
                className="col-span-3"
                placeholder="Enter label here"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                className="col-span-3"
                placeholder="Enter title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">Content</Label>
              <Textarea
                id="content"
                className="col-span-3 h-20"
                placeholder="123 Main St, Springfield, IL 62701"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={!title || !content}
              onClick={() => addAddress({ label, title, content })}
            >
              Add Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1>Addresses</h1>
          <div className="flex flex-col gap-2">
            <Button className="bg-[var(--csblue)] hover:bg-[var(--csblue/90)] px-8" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>

        <div className="mt-4 grid w-full grid-cols-[1fr_1fr_1fr_1fr] gap-6">
          {addresses.map((address, index) => (
            <div className="col-span-3" key={index}>
              <AddressCard
                label={address.label}
                title={address.title}
                content={address.content}
                onDelete={fetchSettings}
                onEdit={fetchSettings}
              />
            </div>
          ))}
          <div className="flex flex-col gap-2 col-span-3">
            <Button
              className="bg-[var(--csblue)] hover:bg-[var(--csblue/90)] px-8"
              onClick={() => setIsOpen(true)}
            >
              New Address <PlusCircleIcon className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <h1>Banner Image</h1>
        </div>

        <div className="mt-4 grid w-full grid-cols-[1fr_1fr_1fr_1fr] gap-6">
          {!hideImage && (
            <div
              className="relative cursor-pointer hover:opacity-80 rounded"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <img
                className="rounded"
                alt="company-banner"
                width={250}
                height={250}
                src={bannerImageFile}
                onError={() => setHideImage(true)}
              />
              <span  className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                Edit <EditIcon className="ml-2" />
              </span>
            </div>
          )}
          <Input
            id="file-input"
            type="file"
            accept="image/*"
            className={hideImage ? "w-72" : "hidden"}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setBannerImageFile(file);
                uploadFile(file);
              }
            }}
          />
        </div>

        <div className="flex justify-between mt-8">
          <h1>Legal Disclaimer</h1>
        </div>

        <div className="mt-4 grid w-full grid-cols-[1fr_1fr_1fr_1fr] gap-6">
          <div className="col-span-3">
            <Textarea
              value={newLegalDisclaimer}
              onChange={(e) => setNewLegalDisclaimer(e.target.value)}
            />
          </div>
        </div>
      </div>
      <NewAddress />
    </>
  );
}

