export abstract class BrowserStorageService {
  constructor(
    private storage: Storage,
  ) { }

  public write<T>(key: string, data: T): void {
    this.storage.setItem(key, JSON.stringify(data));
  }

  public read<T>(key: string): T | null {
    const item = this.storage.getItem(key) as string;
    try {
      return JSON.parse(item) as T;
    } catch (err) {
      return null;
    }
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clearAll(): void {
    this.storage.clear();
  }
}
