import { useEffect, useRef } from "react";

const generateSessionId = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};


export const useEvent = (event, handler) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (e) => {
      handlerRef.current(e.detail.data);
    };

    window.addEventListener(event, listener);

    return () => {
      window.removeEventListener(event, listener);
    };
  }, [event]);
};

export const useApiEvent = (handlers) => {
  const sessionId = useRef(generateSessionId());
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    const listeners = [];
    for (const event in handlersRef.current) {
      const evName = `api.${event}`;
      const listener = (e) => {
        if (!e.detail.sessionId || sessionId.current === e.detail.sessionId) {
          handlersRef.current[event](e.detail.data);
        }
      };

      window.addEventListener(evName, listener);
      listeners.push({
        event: evName,
        listener
      })
    }
    return () => {
      for (const l of listeners) {
        window.removeEventListener(l.event, l.listener);
      }

    };
  }, []);

  const dispatchApiEvent = (event, data) => {
    window.electronAPI.sendMessage({ event, sessionId: sessionId.current, data });
  };
  return { dispatchApiEvent };
}
