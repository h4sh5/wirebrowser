
class IdManager {
  constructor() {
    this.pageId = 0;
    this.requestId = 0;
  }

  nextPageId() {
    return ++this.pageId;
  }

  nextRequestId() {
    return ++this.requestId;
  }
}

export default IdManager;