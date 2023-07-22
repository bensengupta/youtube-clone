import { useCallback, useState } from "react";

interface UseDisclosureProps {
  defaultIsOpen?: boolean;
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const { defaultIsOpen = false } = props;

  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((val) => !val), []);

  return { isOpen, onOpen, onClose, onToggle };
}
