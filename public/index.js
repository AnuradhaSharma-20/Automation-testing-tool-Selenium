async function deleteUser(id) {
    fetch('http://localhost:3000/api/deleteProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    const row = document.getElementById(id)
    row.parentNode.removeChild(row)
}

async function showUsers() {
    fetch('/api/users')
    .then(response => response.json())
    .then(data => {
      // Get a reference to the table
      const table = document.getElementById('userTable');
      for(let i = table.rows.length - 1; i >= 0; i--)
        {
            table.deleteRow(i);
        }
      // Iterate over the data array
      data.forEach((row) => {
        // Create a new table row
        const tr = document.createElement('tr');
        tr.id = row['id']
  
        // Create new table data cells using specific column names
        const td1 = document.createElement('td');
        const aprofile = document.createElement('a')
        aprofile.href = 'profile.html?id='+row['id']
        aprofile.textContent = row['firstname'] +" "+ row['lastname']
        //td1.textContent = row['firstname'] +" "+ row['lastname'];
        td1.appendChild(aprofile)
        tr.appendChild(td1);
  
        const td2 = document.createElement('td')
        const a = document.createElement('a')
        a.href = 'javascript:void(0);'
        a.addEventListener('click', function(event){
            event.preventDefault();
            deleteUser(row['id'])
        });
        const imgdel = document.createElement('img')
        imgdel.src = '../image/delete.png'
        imgdel.alt = 'delete'
        imgdel.width = 25;
        imgdel.height = 25;
  
        a.appendChild(imgdel)
        td2.appendChild(a)
        tr.appendChild(td2)
  
        table.appendChild(tr);
      });
    })
    .catch(error => console.error('Error:', error));
}

  async function main() {
    await showUsers();
  }
  
  main();