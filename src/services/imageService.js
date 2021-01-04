import { apiUrl } from "../config.json";

export function imageUrl(id) {
  return apiUrl + `/${id}`;
}
