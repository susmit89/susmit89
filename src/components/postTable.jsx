import React, { Component } from "react";
//import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class PostTable extends Component {
  columns = [
    {
      path: "value",
      label: "",
      //content: (blog) => <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>,
    },
    {
      path: "row",
      label: "",
      //content: (blog) => <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>,
    },

    {
      path: "type",
      label: "",
      //content: (blog) => <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>,
    },
  ];

  render() {
    const { blogs, onSort, sortColumn } = this.props;
    return (
      <div class="hideme">
        <Table
          columns={this.columns}
          data={blogs}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default PostTable;
