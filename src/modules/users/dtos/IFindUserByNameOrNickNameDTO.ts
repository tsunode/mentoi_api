export interface IFindUserByNameOrNickNameDTO {
  email?: string;
  nickName?: string;
}

export interface IFindUserByNameOrNickNameOptions {
  relations: string[];
}
