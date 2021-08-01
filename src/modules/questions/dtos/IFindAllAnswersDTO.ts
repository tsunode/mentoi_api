import GLOBAL_STATUS from '@shared/constants/GlobalStatus';

export interface IFindAllAnswersDTO {
  filters: {
    questionId: string;
    status: GLOBAL_STATUS;
  };
  page?: number;
  pageSize?: number;
  relations?: string[];
}
