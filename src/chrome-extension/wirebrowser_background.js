const tabMap = new Map();

const setNodeTabId = async (targetId, nodeTabId) => {
  let tabInfo = tabMap.get(targetId);
  if (!tabInfo) {
    tabMap.set(targetId, { tabId: null, id: nodeTabId })
  } else {
    tabInfo.id = nodeTabId;
  }
};


const setTabIdToMap = async (tabId) => {
  if (getTabByTabId(tabId)) {
    return;
  }

  try {
    await chrome.debugger.detach({ tabId })
  } catch (e) { }

  await chrome.debugger.attach({ tabId }, "1.3");
  const info = await chrome.debugger.sendCommand({ tabId }, "Target.getTargetInfo", {});
  const targetId = info.targetInfo.targetId;
  let tabInfo = tabMap.get(targetId);
  if (!tabInfo) {
    tabMap.set(targetId, { tabId, id: null });
  } else {
    tabInfo.tabId = tabId;
  }
};


const getTabByTabId = (tabId) => {
  for (const [k, v] of tabMap) {
    if (v.tabId == tabId) {
      return v;
    }
  }
};


const getTabName = (tabId) => {
  const tab = getTabByTabId(tabId);
  return tab.id ? String(tab.id) : null;
};


const resetTabGroups = async () => {
  const groups = await chrome.tabGroups.query({});
  for (const group of groups) {
    const tabs = await chrome.tabs.query({ groupId: group.id });
    if (tabs.length > 1) {
      await chrome.tabs.ungroup(tabs.map(t => t.id))
    }
  }
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    await setTabIdToMap(tab.id);
    let groupId = tab.groupId;
    if (groupId < 1) {
      groupId = await chrome.tabs.group({ tabIds: [tab.id] });
    }
    const group = await chrome.tabGroups.get(groupId);
    const tn = getTabName(tab.id);
    if (tn !== null && tn !== group.title) {
      chrome.tabGroups.update(groupId, {
        title: tn,
        color: "blue"
      });
    }
  }
};


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && (!tab.url || tab.url == "chrome://newtab/")) {
    chrome.tabs.update(tabId, { url: "about:blank" }).catch(err => console.warn(err));
  }
});


setInterval(() => {
  resetTabGroups();
}, 500);