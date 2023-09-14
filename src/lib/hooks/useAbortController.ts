import { useState } from "react";

interface UseAbortControllerProps {
  abortOnUnmount?: boolean;
}

export function useAbortController(props: UseAbortControllerProps = {}) {
  const [abortController, setAbortController] = useState(new AbortController());

  useState(() => {
    return () => {
      if (props.abortOnUnmount) {
        abortController.abort();
      }
    };
  });

  function reset() {
    setAbortController(new AbortController());
  }

  return [abortController, reset] as const;
}
