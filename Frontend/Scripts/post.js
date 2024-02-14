let postData = document.getElementById("data");

let bulkBtn = document.getElementById("bulk-add")
let downloadBtn = document.getElementById("download");

let url = "http://localhost:8080";

async function getData(){
    let res = await fetch(`${url}/posts/users-posts`)
    let data =await res.json()
    console.log(data)
    let usersHtml = data.map(user => {
        
        let postsHtml = user.posts.map(post => {
            return `<li>Title: ${post.title}</li><li>Body: ${post.body}</li>`;
        }).join("");

        return userData(user.id, user.name, postsHtml, user.company);
    }).join(""); 
    postData.innerHTML = usersHtml;
}


function userData(id, name, title, company) {
    return `
    <div class="user" >
        <h1>Name : ${name}</h1>
        <p>${title}</p>
        <p> Company : ${company}</p>
    </div>
    `;
}

getData()


bulkBtn.addEventListener("click",()=>{
    fetch(`${url}/posts/bulk-add-posts`,{
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        }
    }).then(res => res.json())
    .then(data => alert("Bulk addition of posts successful"))
    .catch(err => alert("Something went wrong"))
})

downloadBtn.addEventListener("click", async () => {
    try {
        let response = await fetch(`${url}/posts/download-excel`);
        if (!response.ok) {
            throw new Error('Failed to download Excel file');
        }
        
        let blob = await response.blob();
        let URL = window.URL.createObjectURL(blob);
        
        let a = document.createElement('a');
        a.href = URL;
        a.download = 'users_posts.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(URL);
    } catch (error) {
        console.error('Error downloading Excel file:', error);
    }
});
