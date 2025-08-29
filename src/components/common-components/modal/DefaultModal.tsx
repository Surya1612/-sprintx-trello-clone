import { forwardRef } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grow,
  IconButton,
  styled,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import CloseIcon from "@mui/icons-material/Close";

type DefaultModalProps = {
  title?: string | React.ReactNode;
  handleClose: () => void;
  children: React.ReactNode;
  showAction?: boolean;
  submitProps: {
    text?: string;
    loading?: boolean;
    disableAction?: boolean;
    handleSubmit?: () => void | Promise<void>;
  };
  cancelProps?: {
    cancelText?: string;
    handleCancel?: () => void;
  };
  dialogStyles?: React.CSSProperties;
  dialogProps?: Omit<DialogProps, "open">;
  loaderStyles?: React.CSSProperties;
  actionStyles?: {
    primary: React.CSSProperties;
    secondary: React.CSSProperties;
  };
  dialogContentStyles?: React.CSSProperties;
  preventDefaultClose?: boolean;
  isCloseIcon?: boolean;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDataGrid-cell": {
    fontWeight: "bold",
  },
}));

export const DefaultModal = (props: DefaultModalProps) => {
  const {
    title,
    children,
    handleClose,
    isCloseIcon = true,
    submitProps,
    showAction = true,
    cancelProps = {},
    dialogStyles = {},
    dialogProps = {},
    loaderStyles = {},
    actionStyles = { primary: {}, secondary: {} },
    dialogContentStyles = {},
    preventDefaultClose = false,
  } = props;
  const {
    text = "Save",
    loading = false,
    disableAction = false,
    handleSubmit,
  } = submitProps;
  const { cancelText = "Cancel", handleCancel = handleClose } = cancelProps;

  return (
    <CustomDialog
      open={true}
      onClose={preventDefaultClose ? () => {} : handleClose}
      slotProps={{ paper: { style: dialogStyles } }}
      slots={{ transition: Transition }}
      {...dialogProps}
    >
      {title && (
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600, fontSize: "16px" }}>
          {title}
          {isCloseIcon && (
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent
        className="customScrollbar"
        style={dialogContentStyles}
        dividers
      >
        {children}
      </DialogContent>
      {showAction && (
        <DialogActions>
          <Button
            variant="outlined"
            className="w-28 h-10"
            style={{
              fontSize: "13px",
              textTransform: "none",
              ...actionStyles.secondary,
            }}
            onClick={handleCancel}
          >
            {cancelText}
          </Button>
          <Button
            className="w-28 h-10"
            style={{
              fontSize: "13px",
              whiteSpace: "nowrap",
              textTransform: "none",
              ...actionStyles.primary,
            }}
            disabled={disableAction || loading}
            onClick={() => !disableAction && !loading && handleSubmit?.()}
          >
            {loading ? (
              <CircularProgress
                color="inherit"
                style={{
                  height: "1rem",
                  width: "1rem",
                  ...loaderStyles,
                }}
              />
            ) : (
              text
            )}
          </Button>
        </DialogActions>
      )}
    </CustomDialog>
  );
};
