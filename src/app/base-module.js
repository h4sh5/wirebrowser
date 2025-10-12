class BaseModule {
    constructor(uiEvents, pagesManager, settingsManager, idManager, browser){
        this.uiEvents = uiEvents;
        this.pagesManager = pagesManager;
        this.settingsManager = settingsManager;
        this.idManager = idManager;
        this.browser = browser;
    }
}

export default BaseModule