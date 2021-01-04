import React, { Component } from "react";
import { getBlogs } from "../services/blogService";
import { getTopics } from "../services/topicService";
//import Like from "./common/like";

//import { getblogs, deleteblog } from "../services/blogService";
import BlogsTable from "./blogsTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Blogs extends Component {
  state = {
    blogs: [],
    topics: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedTopic: null,
    sortColumn: { path: "title", order: "asc" },
  };
  /*
  componentDidMount() {
    const topics = [{ _id: "", name: "All Topics" }, ...getTopics()];
    this.setState({ blogs: getBlogs(), topics });
  }
*/

  async componentDidMount() {
    const { data } = await getTopics();

    const topics = [{ _id: "", name: "All Topics" }, ...data];
    const { data: blogs } = await getBlogs();
    this.setState({ blogs, topics });
  }

  handleLike = (blog) => {
    const blogs = [...this.state.blogs];
    const index = blogs.indexOf(blog);
    blogs[index] = { ...blogs[index] };
    blogs[index].liked = !blogs[index].liked;
    this.setState({ blogs });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleTopicSelect = (topic) => {
    this.setState({ selectedTopic: topic, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedTopic: null, currentPage: 1 });
  };

  getPagedData() {
    const {
      currentPage,
      pageSize,
      selectedTopic,
      searchQuery,
      sortColumn,
      blogs: allblogs,
    } = this.state;
    /*const filtered =
      selectedTopic && selectedTopic._id //ternitary operator
        ? allblogs.filter((m) => m.topic._id === selectedTopic._id)
        : allblogs;
*/
    let filtered = allblogs;
    if (searchQuery)
      filtered = allblogs.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedTopic && selectedTopic._id)
      filtered = allblogs.filter((m) => m.topic._id === selectedTopic._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const blogs = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: blogs };
  }

  render() {
    const { length: count } = this.state.blogs;
    const { currentPage, pageSize, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    if (count === 0) return <p>There are no blogs in the database.</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.topics}
            selectedItem={this.state.selectedTopic}
            onItemSelect={this.handleTopicSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/blogs/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New blogs
            </Link>
          )}

          <p>Showing {totalCount} blogs in the database.</p>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
          ></SearchBox>
          <BlogsTable
            blogs={data}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Blogs;
