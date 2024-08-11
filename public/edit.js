const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id, window.location);

async function getUser(id) {
  fetch('http://localhost:3000/api/profile?id='+id)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    document.getElementById('firstname').value = data.firstname;
    document.getElementById('lastname').value = data.lastname;
    document.getElementById('nickname').value = data.nickname;
    document.getElementById('email').value = data.email;
    document.getElementById('age').value = data.age;
    document.getElementById('phonenumber').value = data.phonenumber;
    document.getElementById('bio').value = data.bio;
    document.getElementById('id').value = id;
  });
}

async function updateUser(id) {
  document.getElementById('editform').addEventListener('submit', function(event) {
    event.preventDefault();
    window.location.href = "index.html";
    const id = document.getElementById('id').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const phonenumber = document.getElementById('phonenumber').value;
    const bio = document.getElementById('bio').value;
    fetch('http://localhost:3000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, firstname, lastname, nickname, email, age, phonenumber, bio }),
    })
    .then(response => response.json())
    .then(data => console.log(data.message));
  });
}

async function main() {
  await getUser(id);
  await updateUser(id)
}

main();