var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var closeBtn = document.getElementById("closeBtn");
var bookmarks = []

if (localStorage.getItem("bookmarksList") != null) {
  //old data
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"))//array of object
  // console.log(productsList);
  displayBookmark();
}
// =====> Submit Function
function addBookMark() {
  if (validate( nameRegex,siteNameInput)&& validate(urlRegex,siteUrlInput))
  //object ha5zn feh el ma3lomat eli haktnha
  {
    var bookmark = {
      siteName: siteNameInput.value,
      siteURL: siteUrlInput.value,
    };

    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    // console.log(bookmark)
    resetInput();
    displayBookmark();
  }
 else {
  boxModal.classList.remove("d-none");
  boxModal.classList.add("d-block");
}
};



// =====> reset InputFunction
function resetInput() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}
// =====> Display Function and adding click event to visit and delete buttons

function displayBookmark() {
  var newBookmark = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    newBookmark += `<tr>
      <td>${i + 1}</td>
      <td>${bookmarks[i].siteName}</td>
      <td>
          <a href="https://${bookmarks[i].siteURL}" target="_blank" class="btn btn-success text-decoration-none" >
        <i class="fa-solid fa-eye pe-2"></i>
        Visit
          </a>
      </td>
      <td>
          <button onclick="deleteBookmark(${i})" class="btn btn-danger" >
              <i class="fa-solid fa-trash-can pe-2"></i>
              Delete
                </button>
      </td>
  </tr>`
  }
  tableContent.innerHTML = newBookmark;
}
// =====> Delete Function
function deleteBookmark(Index) {
  bookmarks.splice(Index, 1);
  console.log(bookmarks);
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks)) //shart 3ashn a5zn data fe localstorage tkon fe sort string
  displayBookmark();
}
// =====> Visit Function

// function visitWebsite() {

// }

//====> validation
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

function validate(regex, element) {
  {
    if (regex.test(element.value) == true) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      return true;
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      return false;
    }
  }
}
//close modal

function closeModal() {
  boxModal.classList.add("d-none");
}
