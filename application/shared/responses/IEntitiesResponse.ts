import { IPagination } from '../models/pagination';

export interface EntitiesResponse<ENTITY> {
  pagination: IPagination;
  records: ENTITY[];
}