import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import "../../../styles/app.css";
export function AlertDialogDemo({
  button,
  publishSaveClick,
  publishCancelClick,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="btn btn-primary"
          style={{
            backgroundColor: "#367bee",
            marginLeft: "1rem",
          }}
        >
          {button}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to save changes you made?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={publishCancelClick}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            style={{
              backgroundColor: "#367bee",
            }}
            onClick={publishSaveClick}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
