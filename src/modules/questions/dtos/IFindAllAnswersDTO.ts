import GLOBAL_STATUS from '@shared/constants/GlobalStatus';

export interface IFindAllAnswersDTO {
  filters: {
    questionId: string;
    status: GLOBAL_STATUS;
    userId: string | undefined;
    [key: string]: any;
  };
  page?: number;
  pageSize?: number;
  relations?: string[];
}
