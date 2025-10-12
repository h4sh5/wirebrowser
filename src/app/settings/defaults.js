const def = {
  settings: {
    network: {
      interceptor: {
        blockFilters: {
          enabled: true,
          reqType: ["script", "xhr", "fetch"],
          pageId: [],
          actions: ["block-requests"],
          urlFilter: ""
        },
        scope: {
          prefixes: "",
          reqType: [
            "image",
            "script",
            "xhr",
            "stylesheet",
            "media",
            "font",
            "texttrack",
            "document",
            "fetch",
            "eventsource",
            "websocket",
            "manifest",
            "other"
          ]
        }
      }
    },
    memory: {
      visibleHelpTabs: [
        "search-snapshot",
        "search-runtime",
        "search-classes",
      ]
    },
    automation: {
      visibleHelpTabs: [
        "scripts",
        "pptrscripts"
      ]
    },
    apicollection: {
      visibleHelpTabs: [
        "apicollection"
      ]
    }
  },
  request: [],
  response: []
};

export default def;