import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/blogs";

function blogUrl(id) {
  return apiUrl + `/posts/${id}`;
}

export function getBlogs() {
  return http.get(apiEndpoint);
}

export function getBlog(blogId) {
  return http.get(blogUrl(blogId));
}

export async function saveBlog(blog) {
  if (blog._id) {
    const body = { ...blog };
    delete body._id;
    return http.put(blogUrl(blog._id), body);
  }
  return http.post(apiEndpoint, blog);
}

export function deleteBlog(blogId) {
  return http.delete(blogUrl(blogId));
}
