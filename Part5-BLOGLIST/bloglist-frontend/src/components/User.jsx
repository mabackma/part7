import { useParams } from 'react-router-dom'

const User = ({ users }) => {
    const { id } = useParams();

    // Convert the `id` to a string
    const idString = id.toString();
    const selectedUser = users.find(n => n.id === idString)

    return (
      <div>
        <h2>{selectedUser.name}</h2>
        <h3>added blogs</h3>
        <ul>
        {selectedUser.blogs.length === 0 ? (
          <p>No blogs added by this user</p>
        ) : (
            selectedUser.blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
            )) 
        )}
        </ul>
      </div>
    )
  }

  export default User