import {useRef,useEffect } from "react";

export function useCloseOut(handler,isBabel=true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, isBabel);

    return () => document.removeEventListener("click", handleClick, isBabel);
  }, [handler,isBabel]);
  return ref;
}
