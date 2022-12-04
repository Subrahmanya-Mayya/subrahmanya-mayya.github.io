const user = "Subrahmanya Mayya";
const ghUrl = "https://projects.subrahmanyamayya.me/";
document.querySelector("#site-title").textContent =
  user + "'s Github Public Repositories";

const blackList = [
  "C-program-lists",
  "Subrahmanya-Mayya",
  "c-data-structures",
  "subrahmanya-mayya.github.io",
];
window.onload = function () {
  const repos = getPublicRepos();
  let reposDataList = new Array();

  repos.then((data) => {
    data.forEach((repo) => {
      reposDataList.push({
        name: repo.name,
        desc: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        created_at: repo.created_at,
        visibility: repo.visibility,
        pages: repo.has_pages,
        fork: repo.fork,
      });
    });
    renderRepos(reposDataList);
  });
};

const getPublicRepos = async (username = "subrahmanya-mayya") => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await res.json();
  return data;
};

const renderRepos = (repos) => {
  const repoContainer = document.querySelector("#repos");
  repos.forEach((repo) => {
    if (!blackList.includes(repo.name)) {
      let card = document.createElement("div");
      card.classList.add("card");
      let cardHead = document.createElement("div");
      cardHead.classList.add("card-head");
      let cardTitle = document.createElement("span");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = repo.name;
      let viewBtnContainer = document.createElement("span");
      viewBtnContainer.classList.add("block", "cursor-pointer");
      let viewBtn = document.createElement("span");
      viewBtn.innerHTML = `<svg fill="none" stroke="currentColor" class="w-5 h-5 dark:text-[#C3C2C7]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" ></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" ></path></svg >`;
      viewBtnContainer.setAttribute(
        "onclick",
        `window.open('${
          repo.pages
            ? ghUrl + repo.name
            : repo.homepage !== null
            ? repo.homepage
            : repo.url
        }')`
      );
      viewBtnContainer.appendChild(viewBtn);
      cardHead.appendChild(cardTitle);
      cardHead.appendChild(viewBtnContainer);
      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      let cardDesc = document.createElement("span");
      cardDesc.textContent =
        repo.desc === null ? "No description provided" : repo.desc;
      cardBody.appendChild(cardDesc);
      let cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");
      let pill = document.createElement("span");
      pill.classList.add("pill");
      pill.setAttribute("onclick", `window.open('${repo.url}')`);
      let pillImgContainer = document.createElement("span");
      pillImgContainer.innerHTML = `<svg fill="none" stroke="currentColor" class="dark:text-[#C3C2C7] w-5 h-5 inline-block" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>`;
      let pillText = document.createElement("span");
      pillText.textContent = "Download";
      pillText.classList.add("pill-text");
      pill.appendChild(pillImgContainer);
      pill.appendChild(pillText);
      cardFooter.appendChild(pill);
      let calenderContainer = document.createElement("span");
      calenderContainer.classList.add("text-xs", "w-fit");
      let calenderImgContainer = document.createElement("span");
      calenderImgContainer.innerHTML = `<svg fill='none' class="w-5 h-5 dark:text-[#C3C2C7] inline-block" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" ></path> </svg>`;
      calenderContainer.appendChild(calenderImgContainer);
      let calenderText = document.createElement("span");
      calenderText.classList.add("align-middle");
      calenderText.textContent = new Date(repo.created_at).toLocaleDateString();
      calenderContainer.appendChild(calenderText);
      cardFooter.appendChild(calenderContainer);
      cardBody.appendChild(cardFooter);
      card.appendChild(cardHead);
      card.appendChild(cardBody);
      repoContainer.appendChild(card);
    }
  });
};
