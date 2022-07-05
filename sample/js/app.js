console.log(`app is running`);


let $chatList = document.querySelector('.chatList');
let $chatPlus = document.querySelector('#chatPlus');
let $addChat = document.querySelector('.addBtn');



fetch('./user.json').then(res => res.json()).then((res) => {
    let $div = document.createElement('div');
    let $name = document.createElement('p');
    let $id = document.createElement('p');
    let $userImg = document.createElement('div');
    let $div2 = document.createElement('div');
    $userImg.style.backgroundImage = `url(${res[0].userImg})`;
    $userImg.classList.add('userImg');
    $name.innerHTML = `${res[0].name}`;
    $name.style.fontSize = '1.3em';
    $name.style.fontWeight = 'bolder';
    $id.innerHTML = `${res[0].id}`;
    $div.appendChild($name);
    $div.appendChild($id);
    $div2.appendChild($userImg);
    $div2.appendChild($div);
    $div2.classList.add('userInfo');
    $chatPlus.appendChild($div2);
});

$addChat.addEventListener('click',()=>{
    let $wrap = document.createElement('div');
    $wrap.classList.add('wrap');
    let $alert = document.createElement('div');
    $alert.classList.add('alert');
    document.body.appendChild($alert);
    document.body.appendChild($wrap);
})
