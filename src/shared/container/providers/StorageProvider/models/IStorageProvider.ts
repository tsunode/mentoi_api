export interface IFileDTO {
  file: string;
  path?: string;
}

export default interface IStorageProvider {
  saveFile(data: IFileDTO): Promise<string>;
  deleteFile(path: string): Promise<void>;
}
