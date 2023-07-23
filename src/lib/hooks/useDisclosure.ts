import { useCallback, useState } from "react";

interface UseDisclosureProps {
  defaultIsOpen?: boolean;
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const { defaultIsOpen = false } = props;

  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((val) => !val), []);

  return { isOpen, open, close, toggle };
}
