import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{message}</p>
        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
