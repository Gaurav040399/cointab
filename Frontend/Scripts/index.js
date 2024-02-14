// const user_data = document.getElementById("user-data")

// let url = "http://localhost:8080"
// async function getUserData(){
//     let res = await fetch("https://jsonplaceholder.typicode.com/users");
//     let data = await res.json();
//     console.log(data);
//     let usersHtml = data.map(user => {
//         return userData(user.id, user.name, user.email, user.phone, user.website, user.address.city, user.company.name);
//     }).join(""); 
//     user_data.innerHTML = usersHtml; 
// }

// function userData(id, name, email, phone, website, city, company){
//     return `
//     <div class="user" id="${id}">
//         <h1>${name}</h1>
//         <p>${email}</p>
//         <p>${phone}</p>
//         <p>${website}</p>
//         <p>${city}</p>
//         <p>${company}</p>
//         <button class="add">Add</button>
//         <button class="open">Open</button>
       
//     </div>
//     `;
// }


  
// let addBtns = document.querySelectorAll(".add")
// console.log(addBtns)


const user_data = document.getElementById("user-data");
let url = "http://localhost:8080";



async function getUserData() {
    let res = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await res.json();
    console.log(data);
    let usersHtml = data.map(user => {
        return userData(user.id, user.name, user.email, user.phone, user.website, user.address.city, user.company.name);
    }).join(""); 
    user_data.innerHTML = usersHtml;

    // Select the ".add" buttons after the user data has been rendered
    let  addBtns = document.querySelectorAll(".add");
     addBtns.forEach(addBtn =>{
        addBtn.addEventListener("click", async(e)=>{
            let userElement = e.target.closest(".add");
            
            let userId = userElement.id;
            console.log(userId)
            
            let res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            let userData = await res.json()
            

            let obj = {
                id : userData.id,
                name : userData.name,
                email : userData.email,
                phone : userData.phone,
                website : userData.website,
                city : userData.address.city,
                company : userData.company.name
            }
            

            const response = await fetch(`${url}/user/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            // Check if the request was successful (status code 200)
            if (response.ok) {
                console.log("User added successfully");
                alert("User added successfully")

                let userElement2 = e.target.closest(".user");
                 
                addBtn.style.visibility = "hidden"
                const openBtn = userElement2.querySelector(".open");
                console.log(openBtn)
                if (openBtn) {
                    openBtn.style.visibility = "visible";
                    openBtn.addEventListener("click",()=>{
                        location.href = "http://127.0.0.1:5500/Frontend/post.html"
                    })
                }
            } else {
                console.error("Failed to add user. Status:", response.status);
            }
        })
     })
    console.log(addBtns);
}

function userData(id, name, email, phone, website, city, company) {
    return `
    <div class="user" >
        <h1>${name}</h1>
        <p>${email}</p>
        <p>${phone}</p>
        <p>${website}</p>
        <p>${city}</p>
        <p>${company}</p>
        <button class="add" id="${id}">Add</button>
        <button class="open" id="${id}">Open</button>
    </div>
    `;
}

// getUserData(); // Call the function to fetch and render user data

