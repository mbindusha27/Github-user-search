const APIURL = "https://api.github.com/users/";


const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");


async function getUser(username){
    const resp = await fetch(APIURL+username);
    const respData = await resp.json();
    createCard(respData);

    getRepos(username);
}


async function getRepos(username){
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}


function createCard(user){
  console.log(`https://github.com/+${user.login}`)
  const html = `
  
  <div class="row">
      <div class="col-sm-2 p-2 bg-dark d-flex flex-column">
        <div>   </div>
        <div>
          <img class="img-thumbnail m-3" src="${user.avatar_url}" width="100px">
        </div>
        <div>
          <a href="https://github.com/${user.login}" class=" btn btn-sm text-white border border-dashed mx-3" target="_blank">View Profile</a>
        </div>
        
      </div>
      <div class="col-sm-6 p-5 bg-primary text-white">
        <div class="d-flex flex-column">
          <div>
            <h5><b>${user.name}</b></h5>
            <p>${user.bio}</p>
          </div>
          <div>
            <ul class="list-group list-group-horizontal ">
              <li class="list-group-item  text-dark "><b>${user.followers} Followers</b></li>
              <li class="list-group-item"><b>${user.following} Following</b></li>
              <li class="list-group-item "><b>${user.public_repos} Repos</b></li>
            </ul>
          </div>
          <div id="repos" class="mt-3">
            
          </div>

        </div>

      </div>

    </div>

  `
  main.innerHTML = html;
}

function addReposToCard(repos){
  const reposE1 = document.getElementById("repos");

  repos
      .sort((a,b)=> b.stargazers_count-a.stargazers_count)
      .slice(0,10)
      .forEach((repo)=>{
          const repoE1 = document.createElement("a");

        repoE1.classList.add("repo");

          repoE1.href = repo.html_url;
          repoE1.target = "_blank";
          repoE1.innerText = repo.name;

          reposE1.appendChild(repoE1)
      });
}

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const user = search.value;
  if(user){
    getUser(user);
    search.value="";
  }
  
})
