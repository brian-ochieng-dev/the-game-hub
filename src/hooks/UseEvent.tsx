import { useEffect } from "react";

function useEvent(
  event: string,
  handler: {
    (event: { keyCode: any }): void;
    (this: Window, ev: any): any;
    (this: Window, ev: any): any;
  },
  passive = false,
) {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
}

export default useEvent;
