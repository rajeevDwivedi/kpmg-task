export interface DrawerProps {
  open: boolean;
  isMobile?: boolean;
  handleDrawerOpen?: () => void;
  handleDrawerClose?: () => void;
  handleSearch?: (() => void) | undefined
  handleSubmit?: () => void;
}