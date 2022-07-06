console.log(`app is running`)

const $ul = document.querySelector('.myChatList');


const clickChatList = (e) => {
  for(let i=0; i < e.path[1].children.length; i++){
    e.path[1].children[i].classList.remove('selectedChatList');
  }
  e.target.classList.add('selectedChatList');
  console.dir(e.target.innerText);
}

$ul.addEventListener('click', clickChatList)