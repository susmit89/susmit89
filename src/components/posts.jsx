import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getBlog } from "../services/blogService";
import { getTopics } from "../services/topicService";
import { imageUrl } from "../services/imageService";
import PostTable from "./postTable";

class BlogForm extends Form {
  state = {
    data: {
      title: "",
      topicId: "Comedy",
      numberInStock: "",
      dailyRentalRate: "",
      content: [],
    },
    topics: [],
    errors: {},
    sortColumn: { path: "row", order: "asc" },
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    topicId: Joi.string().required().label("Topic"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(19).label("Rate"),
  };

  async populateTopics() {
    //const topics = [...getTopics()];
    const { data: topics } = await getTopics();
    this.setState({ topics });
    console.log("genres " + this.state.topics);
  }

  async populateBlog() {
    const blogId = this.props.match.params.id;
    if (!blogId) return;
    try {
      const { data: blog } = await getBlog(blogId);
      //const blog = await getBlog(blogId);
      this.setState({ data: this.mapToViewModel(blog) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateTopics();
    await this.populateBlog();
  }

  mapToViewModel(blog) {
    this.applyStyle(blog.content.text);
    return {
      _id: blog._id,
      title: blog.title,
      topicId: blog.topic.name,
      numberInStock: blog.numberInStock,
      dailyRentalRate: blog.dailyRentalRate,
      content: blog.content.text,
    };
  }

  styleContent(content) {
    switch (content.type) {
      case "heading":
        return <h3>{content.value}</h3>;
      case "subheading":
        return <h4>{content.value}</h4>;
      case "image":
        return (
          <figure class="figure">
            <img
              src={imageUrl(content.reference)}
              class="center figure-img img-fluid rounded"
            ></img>
            <figcaption class="center">{content.caption}.</figcaption>
          </figure>
        );
      default:
        return <p>{content.value}</p>;
    }
  }

  applyStyle(content) {
    return content.map((c) => {
      c.value = this.styleContent(c);
    });
  }

  /*
  doSubmit = async () => {
    await saveblog(this.state.data);
    this.props.history.push("/blogs");
  };
*/
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    return (
      <div>
        <h1>{this.state.data.title}</h1>
        <div>Topic: {this.state.data.topicId}</div>
        <PostTable
          blogs={this.state.data.content}
          sortColumn={this.state.sortColumn}
          onLike={this.handleLike}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        />
      </div>
    );
  }
}

export default BlogForm;
