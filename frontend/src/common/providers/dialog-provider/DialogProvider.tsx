import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import React, {
  createContext, useContext, useState, useRef, useCallback,
} from 'react';

const DialogContext = createContext<DialogContext | undefined>(undefined);

const DialogProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const dialogParams = useRef<DisplayDialogParams>();

  const displayDialog: DisplayDialog = useCallback((args) => {
    dialogParams.current = args;
    setOpen(true);
  }, [setOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  const {
    content, title, agreeText, disagreeText, onAgree, onDisagree,
  } = dialogParams.current || {};

  return (
    <DialogContext.Provider value={{ displayDialog }}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDisagree ? () => onDisagree(handleClose) : handleClose}>{disagreeText}</Button>
          <Button onClick={onAgree ? () => onAgree(handleClose) : handleClose}>{agreeText}</Button>
        </DialogActions>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
};

const useDialog = (): DialogContext => useContext(DialogContext) as DialogContext;

export default DialogProvider;
export { useDialog };
