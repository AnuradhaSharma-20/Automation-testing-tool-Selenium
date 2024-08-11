async function createUser() {
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
      fetch('http://localhost:3000/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, nickname, email, age, phonenumber, bio }),
      })
      .then(response => response.json())
      .then(data => console.log(data.message));
    });
    
  }
  
  async function main() {
    await createUser()
  }
  
  main();