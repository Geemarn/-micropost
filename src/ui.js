class Ui {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector("#post-submit");
    this.formControl = document.getElementsByClassName("form-control");
    this.forState = "add";
  }

  showPosts(posts) {
    let output = "";
    posts.map(post => {
      output += `
      <div class="card mb-3">
      <div class="card-body">
        <h4 class="card-title">${post.title}</h4>
        <p class="card-text">${post.body}</p>
        <a href="#" class="edit card-link" data-id= "${post.id}">
          <i class= "fa fa-pencil"></i>
        </a>
        <a href="#" class="delete card-link" data-id= "${post.id}">
          <i class= "fa fa-remove"></i>
        </a>
      </div> 
    </div>
      `;
    });
    this.post.innerHTML = output;
  }

  showAlert(mssg, className) {
    //call clearAlert
    this.clearAlert();

    //create a div
    const div = document.createElement("div");
    //add a class
    div.className = className;
    //add text
    div.appendChild(document.createTextNode(mssg));
    //get parent container
    const container = document.querySelector(".post-container");
    //get post
    const posts = document.querySelector("#posts");

    //insert alert div
    container.insertBefore(div, posts);

    //set timeout for 3s
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const alert = document.querySelector(".alert");

    if (alert) {
      alert.remove();
    }
  }

  clearFields() {
    (this.titleInput.value = ""), (this.bodyInput.value = "");
  }

  fillForm(data) {
    this.idInput.value = data.id;
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;

    this.changeSubmitForm("edit");
  }

  changeSubmitForm(type) {
    if (type === "edit") {
      this.postSubmit.textContent = "Update post";
      this.postSubmit.className = "btn btn-warning";
      this.formControl[0].style.borderColor = "orange";
      this.formControl[1].style.borderColor = "orange";
      //check if ther is already a post cancel button
      if (!document.querySelector(".post-edit-cancel")) {
        //create cancel button
        const button = document.createElement("button");
        //add class
        button.className = "post-edit-cancel btn btn-light mt-2 text-danger";
        //add text
        button.appendChild(document.createTextNode("Cancel edit"));

        //get parent div (card)
        const cardForm = document.querySelector(".card");
        //get element to insert before
        const formEnd = document.querySelector(".form-end");
        //insert button
        cardForm.insertBefore(button, formEnd);
      }
    } else {
      this.postSubmit.textContent = "Post";
      this.postSubmit.className = "btn btn-info";
      this.formControl[0].style.borderColor = "lightgray";
      this.formControl[1].style.borderColor = "lightgray";

      //remove cancel edit button
      if (document.querySelector(".post-edit-cancel")) {
        document.querySelector(".post-edit-cancel").remove();
      }

      //clear id fields
      this.idInput.value = "";

      //clear text fields
      this.clearFields();
    }
  }
}

export const ui = new Ui();
