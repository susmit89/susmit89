import http from "./httpService";
import { apiUrl } from "../config.json";

export function getTopics() {
  return http.get(apiUrl + "/topics");
}
