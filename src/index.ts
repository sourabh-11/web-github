const getusername = document.querySelector('#user') as HTMLInputElement;
const formsubmit = document.querySelector('#form') as HTMLFormElement;
const main = document.querySelector('.main') as HTMLInputElement;


interface userdata{
    id:number;
    login: string;
    avatar_url: string;
    location: string;
    url: string;
}

async function mycustfech<T>(url: string,option?:RequestInit ): Promise<T>
{
     const response =  await  fetch(url,option);
     if(!response.ok)
     {
        throw  new Error(
            `Network response was not ok - status: ${response.status}`
        )
     }
     const data  = await response.json()
     return data;
   
     
}
const showresulit   =  (singleuse: userdata)=>{
    const {avatar_url, login ,url, location}   =singleuse
  main.insertAdjacentHTML(
    "beforeend",
    `<div class  = 'card'> 
    <img src = ${avatar_url} alt = ${login}
    <hr/>
     <div class = 'card-footer">
     <img src = "${avatar_url}" alt = "${login}" />
     <a href = "${url}"> github  </a>
     </div>
    </div>`
  )
}

function fatchuserdata(url: string)
{
    mycustfech<userdata[]>(url,{}).then((userinfo)=>{
        for (const singleuse of userinfo) {
            showresulit(singleuse)
            
        }
    })
}



fatchuserdata("https://api.github.com/users");

formsubmit.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const searchterm = getusername.value.toLocaleLowerCase();

    try {
         const url  = "https://api.github.com/users"
       const allusedata = await mycustfech<userdata[]>(url,{})

       const match =  allusedata.filter((user)=>{
        return user.login.toLowerCase().includes(searchterm)
       })

       main.innerHTML = "";
       if (match.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.className = "empty-msg";
        emptyMsg.textContent = "No matching user found";
    
        main?.insertAdjacentElement("beforeend", emptyMsg);
    }
    else{
        for(const singleuse of match) {
            showresulit(singleuse)
        }
    }

    } catch (error) {
        console.log(error);
        
    }
})

