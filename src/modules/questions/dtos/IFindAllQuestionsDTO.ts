export interface IFindAllQuestionsDTO {
  page?: number;
  pageSize?: number;
  relations?: string[];
  filters: {
    q?: string;
    areasInterest?: string | string[];
    userId?: string;
  };
}
