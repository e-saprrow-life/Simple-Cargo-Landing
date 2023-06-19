function setMenuBurger() {
    const burger = document.querySelector('.burger');
    const burgerMenu = document.querySelector('.burger-menu');
    const links = burgerMenu.querySelectorAll(' ul > li ');

    burger.addEventListener('click', toggleClassList);
    
    for (let link of links) {
        link.addEventListener('click', removeClassList);
    }

    document.body.addEventListener('click', a);

    function toggleClassList() {
        burger.classList.toggle('burger_active');
        burgerMenu.classList.toggle('burger-menu_active');
        document.body.classList.toggle('_lock');
    }
    
    function a(event) {
        let target = event.target;
        let burgerMenuParent = target.closest('.burger-menu');
        let burgerParent = target.closest('.burger');
        if (!burgerMenuParent && !burgerParent) {
            removeClassList();
        }

    }

    function removeClassList() {
        burger.classList.remove('burger_active');
        burgerMenu.classList.remove('burger-menu_active');
        document.body.classList.remove('_lock');
    }

};
setMenuBurger();

function a(event) {
    console.log(event.target)
}
