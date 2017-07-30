import React from 'react';
import classNames from 'classnames';

class CommentItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.comment.id,
      body: this.props.comment.body,
      author_id: this.props.comment.author.id,
      story_id: this.props.comment.story_id,
      showForm: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.autoSize = this.autoSize.bind(this);
  }

  update(item) {
    return event => {
      this.setState({ [item]: event.currentTarget.value });
      this.autoSize(event);
    };
  }

  toggleEdit() {
    event.preventDefault();
    this.setState({
      showForm: !this.state.showForm ,
      body: this.props.comment.body  // Reset body element when cancelled
    });
  }

  handleDelete() {
    event.preventDefault();
    return () => {
      this.props.deleteComment(this.state.id);
    };
  }

  handleUpdate() {
    event.preventDefault();
    this.state.author_id = this.props.currentUser.id;
    this.props.updateComment(this.state)
      .then( () => this.setState({ showForm: false }) );
  }

  autoSize(event) {
    const el = event.currentTarget;
    el.style.height = "35px";
    el.style.height = (el.scrollHeight)+"px";
  }

  render() {
    const comment = this.props.comment;
    const date = new Date(comment.created_at);

    return (
      <div className="comment">
        <section className="top">

          <div className="userInfo">
            <img className="avatar"
              src="https://res.cloudinary.com/dzeqeo9b3/image/upload/v1501173171/avatar_default_wkpp05.png"/>
            <div>
              <span className="username link">{comment.author.username}</span><br/>
              <span className="date">{date.toDateString()}</span>
            </div>
          </div>

          {(this.props.loggedIn &&
            this.props.currentUser.username ===
            comment.author.username &&
            !this.state.showForm) ? (
              <div className="options">
                <span className="link" onClick={this.toggleEdit}>Edit</span>
                <span className="link" onClick={this.handleDelete(comment.id)}>Delete</span>
              </div>
          ) : null}
        </section>

        { this.state.showForm ? (
          <section className="edit">
            <textarea
              className="editForm"
              onChange={this.update("body")}
              autoFocus
              onFocus={this.autoSize}
              value={this.state.body}
              ></textarea>

            <div className="updateOptions">
              <span
                className="link update"
                onClick={this.toggleEdit}>Cancel</span>
              <span
                className="link update"
                onClick={this.handleUpdate}>Update</span>
            </div>
          </section>
        ) : (
          <p>{comment.body}</p>
        )}
      </div>
    );
  }
}

export default CommentItem;