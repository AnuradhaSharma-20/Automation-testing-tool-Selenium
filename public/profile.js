const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getUser(id) {
  fetch('http://localhost:3000/api/profile?id='+id)
  .then(response => response.json())
  .then(data => {
    document.getElementById('firstname').innerText = data.firstname;
    document.getElementById('lastname').innerText = data.lastname;
    document.getElementById('nickname').innerText = data.nickname;
    document.getElementById('email').innerText = data.email;
    document.getElementById('age').innerText = data.age;
    document.getElementById('phonenumber').innerText = data.phonenumber;
    document.getElementById('bio').innerText = data.bio;
    document.getElementById('id').innerText = id;
    document.getElementById('editLink').setAttribute("href", `edit.html?id=`+id)
  });
}

async function main() {
  await getUser(id);
} 

main();