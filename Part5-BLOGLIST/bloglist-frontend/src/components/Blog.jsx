import "./styles.css"

const Blog = ({ blog }) => {
  return (
    <div className="blog blog-hover">
      <a href={`/blogs/${blog.id}`} className="link">{blog.title} {blog.author}</a>
    </div>
  );
};

export default Blog;
