import { JSONFilePreset } from 'lowdb/node'

class SettingsDatabase {
  constructor(dbName, defaultData) {
    this.db = null;
    this.dbName = dbName;
    this.defaultData = defaultData;
  }

  read = async () => {
    if (this.db === null) {
      this.db = await JSONFilePreset(this.dbName, this.defaultData);
    }
    await this.db.read();
  }

  write = async () => {
    await this.db.write();
  }

  get = async () => {
    await this.read();
    return this.db.data.settings;
  }

  set = async (value) => {
    await this.read();
    this.db.data.settings = value;
    await this.db.write();
  }

  addRequest = async (req) => {
    await this.read();
    await this.db.update(({ request }) => request.push(req))
  }
}


export default SettingsDatabase;