import * as topicsAPI from "./topics";

const blogs = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    topic: { _id: "5b21ca3eeb7f6fbccd471818", name: "Artificial Intelligence" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Die Hard",
    topic: { _id: "5b21ca3eeb7f6fbccd471818", name: "Artificial Intelligence" },
    numberInStock: 5,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    topic: { _id: "5b21ca3eeb7f6fbccd471820", name: "Security" },
    numberInStock: 8,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Trip to Italy",
    topic: { _id: "5b21ca3eeb7f6fbccd471814", name: "Network" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Airplane",
    topic: { _id: "5b21ca3eeb7f6fbccd471814", name: "Network" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Wedding Crashers",
    topic: { _id: "5b21ca3eeb7f6fbccd471814", name: "Network" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Gone Girl",
    topic: { _id: "5b21ca3eeb7f6fbccd471820", name: "Security" },
    numberInStock: 7,
    dailyRentalRate: 4.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "The Sixth Sense",
    topic: { _id: "5b21ca3eeb7f6fbccd471820", name: "Security" },
    numberInStock: 4,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    topic: { _id: "5b21ca3eeb7f6fbccd471818", name: "Artificial Intelligence" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishDate: "2018-01-03T19:04:28.809Z",
  },
];

export function getBlogs() {
  return blogs;
}

export function getBlog(id) {
  return blogs.find((m) => m._id === id);
}

export function saveblog(blog) {
  let blogInDb = blogs.find((m) => m._id === blog._id) || {};
  blogInDb.name = blog.name;
  blogInDb.topic = topicsAPI.topics.find((g) => g._id === blog.topicId);
  blogInDb.numberInStock = blog.numberInStock;
  blogInDb.dailyRentalRate = blog.dailyRentalRate;

  if (!blogInDb._id) {
    blogInDb._id = Date.now();
    blogs.push(blogInDb);
  }

  return blogInDb;
}

export function deleteblog(id) {
  let blogInDb = blogs.find((m) => m._id === id);
  blogs.splice(blogs.indexOf(blogInDb), 1);
  return blogInDb;
}
