const form=document.querySelector(".form");
const input=document.querySelector(".inputForm");
const userImage=document.querySelector("[data-user-image]");
const userName=document.querySelector("[data-name]");
const userLink=document.querySelector("[data-link]");
const userJoinedDate=document.querySelector(".joined-date");
const userBio=document.querySelector(".bio");
const repoCount=document.querySelector(".repoCount");
const followerCount=document.querySelector(".followersCount");
const followingCount=document.querySelector(".followingCount");
const address=document.querySelector(".address");
const userWebsite=document.querySelector(".websiteLink");
const twitterLink=document.querySelector(".twitterLink");
const companyName=document.querySelector(".companyName")
const modebtn=document.querySelector(".modebtn");
const mode=document.querySelector(".mode");
const modeImage=document.querySelector(".modeImage");
let currMode="light";
const header=document.querySelector(".header");
const searcBar=document.querySelector(".searchBar");
modebtn.addEventListener('click',changeMode);

mode.innerText="Light";
modeImage.src="./assets/moon-icon.svg"

function changeMode(){
    if(currMode==="light"){
        currMode="dark";
        mode.innerText="Dark";
        modeImage.src="./assets/sun-icon.svg"
        changeclasses();
    }else{
        currMode="light";
        mode.innerText="Light";
        modeImage.src="./assets/moon-icon.svg";
        removeclasses();
    }
    
}
const allElements = document.querySelectorAll('*');
function changeclasses(){
    // Add dark class to each element
    allElements.forEach(element => {
        element.classList.add(`dark`); 
    });
}

function removeclasses(){
    // remove dark class from each element
    allElements.forEach(element => {
        element.classList.remove(`dark`); 
    });
}

function convertDateFormat(inputDate) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
}
function renderData(data, name){
    userImage.src=data?.avatar_url;
    if(data?.name==null){
        userName.innerText=name;
    }else{
        userName.innerText=data?.name;

    }
    userLink.href=data?.html_url;
    userLink.innerText=`@${data?.login}`;
    userJoinedDate.innerText=`Joined ${convertDateFormat(`${data?.created_at}`)}`;
    if( data?.bio==null){
        userBio.innerText="This profile has no bio";
    }else{
        userBio.innerText=data?.bio;
    }
    
    repoCount.innerText=data?.public_repos;
    followerCount.innerHTML=data?.followers;
    followingCount.innerHTML=data?.following;
    if( data?.location==null){
        address.innerText="Not Available";
    }else{
        address.innerText=data?.location;
    }
    if( data?.blog===""){
        userWebsite.innerText="Not Available";
        userWebsite.href=`#`;
    }else{
        userWebsite.href=`https://${data?.blog}`;
        userWebsite.innerText=data?.blog;
    }
    
    if( data?.twitter_username==null){
        twitterLink.href=`#`;
        twitterLink.innerText="Not Available";
        
    }else{
        twitterLink.href=`https://twitter.com/${data?.twitter_username}`;
        twitterLink.innerText=data?.twitter_username;
        
    }
    
    if( data?.company==null){
        companyName.innerText="Not Available";
    }else{
        companyName.innerText=data?.company;
    }
}
async function getData(name){
    try{
        let response= await fetch(`https://api.github.com/users/${name}`);
        const data=await response.json();
        if(data?.message==="Not Found"){
            //user not found
            document.getElementById('error').innerHTML = "no search results";
            console.clear();
            
        }else{
            //user found
            document.getElementById('error').innerHTML = "";
            renderData(data,name);

        }

    }
    catch(err){}
    
}
getData("Anish-Bhardwaj")
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let name=input.value;
    if(name==="")return;
    else{
        try{
        getData(name);
        } catch(ERROR){}
    }
});

