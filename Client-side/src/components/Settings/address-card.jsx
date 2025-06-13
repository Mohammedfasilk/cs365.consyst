import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../UI/Card";
import { Button } from "../UI/Button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../UI/Dialog";
import { Label } from "../UI/Label";
import  {Input}  from "../UI/Input";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../UI/Alert-dialog";
import { Textarea } from "../UI/Textarea";

const editAddress = async (updatedData, originalLabel) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/emailSignature`,{...updatedData,originalLabel});
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
  }
};

const deleteAddress = async ({ label }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_CS365_URI}/api/emailSignature/delete`,{label});
    return response.data;
  } catch (error) {
    console.error("Error deleting address:", error);
  }
};

export function AddressCard({ label, title, content, onEdit, onDelete }) {
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [isDeleteAddressOpen, setIsDeleteAddressOpen] = useState(false);

  const EditAddressModal = () => {
    const [newLabel, setNewLabel] = useState(label);
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);

    const isDirty = newTitle !== title || newContent !== content || newLabel !== label;

    const handleSave = async () => {
      await editAddress({ label: newLabel, title: newTitle, content: newContent }, label);
      setIsEditAddressOpen(false);
      onEdit();
    };

    return (
      <Dialog open={isEditAddressOpen} onOpenChange={setIsEditAddressOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>
              Make changes to your address here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Label
              </Label>
              <Input
              // disabled
                id="label"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                id="content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="col-span-3 h-24"
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={!isDirty} onClick={handleSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const DeleteAddressModal = () => {
    const handleDelete = async () => {
      await deleteAddress({ label });
      setIsDeleteAddressOpen(false);
      onDelete();
    };

    return (
      <AlertDialog open={isDeleteAddressOpen} onOpenChange={setIsDeleteAddressOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your address.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{content}</p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            size="sm"
            className="bg-[var(--csblue)] "
            onClick={() => setIsEditAddressOpen(true)}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setIsDeleteAddressOpen(true)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <EditAddressModal />
      <DeleteAddressModal />
    </>
  );
}
