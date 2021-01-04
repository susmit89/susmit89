import React, { Component } from "react";
//import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class BlogsTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (blog) => <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>,
    },
    { path: "topic.name", label: "Topic" },
    { path: "publishDate", label: "publishDate" },
    {
      key: "like",
      content: (blog) => (
        <Like liked={blog.liked} onClick={() => this.props.onLike(blog)} />
      ),
    },
  ];

  render() {
    const { blogs, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={blogs}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BlogsTable;
