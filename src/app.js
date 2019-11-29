import { http } from "./http";
import { ui } from "./ui";

//Get posts from DOM load
document.addEventListener("DOMContentLoaded", getPosts);
// listen for submit post
document.querySelector("#post-submit").addEventListener("click", submitPost);
//listen for delete post
document.querySelector("#posts").addEventListener("click", deletePost);
//listen for edit state
document.querySelector("#posts").addEventListener("click", editState);
//listen for cancel edit
document.querySelector(".card").addEventListener("click", cancelEdit);

//get posts
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

//submit posts
function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  const data = {
    title,
    body
  };

  if (title === "" || body === "") {
    ui.showAlert("All fields are required", "alert alert-danger");
  } else {
    //check if id
    if (id === "") {
      //create new post
      http
        .post("http://localhost:3000/posts", data)
        .then(data => {
          ui.showAlert("post Added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      //update post
      http
        .update(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert("post updated", "alert alert-success");
          ui.changeSubmitForm("add");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

//delete post
function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;

    if (confirm("Are you sure? you want to delete this post"))
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert("Post deleted", "alert alert-success");
          getPosts();
        })
        .catch(err => console.log(err));
  }
}

function editState(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    ui.fillForm(data);
  }
}

function cancelEdit(e) {
  e.preventDefault();
  if (e.target.classList.contains("post-edit-cancel")) {
    ui.changeSubmitForm("add");
  }
}
