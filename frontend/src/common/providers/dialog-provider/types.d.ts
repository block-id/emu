type CloseCallback = () => void;

type DialogCallback = (close: CloseCallback) => void;

interface DisplayDialogParams {
  content: string,
  title?: string,
  agreeText?: string,
  disagreeText?: string,
  onAgree?: DialogCallback,
  onDisagree?: DialogCallback,
}

type DisplayDialog = (args: DisplayDialogParams) => void;

interface DialogContext {
  displayDialog: DisplayDialog
}
