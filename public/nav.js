document.querySelector('.logo img').addEventListener('click',e=>{
    document.querySelector('nav').classList.remove('closed');
});

document.querySelector('nav img').addEventListener('click',e=>{
    document.querySelector('nav').classList.add('closed');
});