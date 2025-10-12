import { useState, useEffect, useRef, cloneElement } from "react";
import { useGlobal } from "@/global-context";

export const useHelpTab = (moduleName, key, comp) => {
  const { settings, updateSettings } = useGlobal();
  const tabKey = `${key}-help`;

  const addHelpTab = (tabsRef, force) => {
    if (
      (settings?.[moduleName]?.visibleHelpTabs
        && !settings[moduleName].visibleHelpTabs.includes(key)
        && !force
      )
      || !tabsRef.current
      || tabsRef.current.getTab(tabKey)) {
      return;
    }
    const Wrapper = () => {
      return cloneElement(comp, {
        onDismiss: () => {
          updateSettings(
            `${moduleName}.visibleHelpTabs`,
            (settings?.[moduleName]?.visibleHelpTabs || []).filter(i => i !== key)
          );
          tabsRef.current.closeTab(tabKey);
        }
      })
    }
    tabsRef.current.addTab(
      <Wrapper />,
      <span className="font-bold italic">Help</span>,
      tabKey,
    );
  }
  return { addHelpTab };
};

export default useHelpTab;