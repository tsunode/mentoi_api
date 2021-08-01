import GLOBAL_STATUS from '@shared/constants/GlobalStatus';

export interface IFindAllQuestionsDTO {
  page?: number;
  pageSize?: number;
  relations?: string[];
  filters: {
    q?: string;
    areasInterest?: string | string[];
    userId?: string;
    status: GLOBAL_STATUS;
    [key: string]: any;
  };
}
