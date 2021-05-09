export interface IFindAllAnswersDTO {
  filters: {
    questionId: string;
  };
  page?: number;
  pageSize?: number;
  relations?: string[];
}
