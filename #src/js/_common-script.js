function checkBrowser() {
    /* Устанавливает классы для тега html:
     *	._webp - если браузер поддерживает этот формат
     *	._no-webp - если браузер не поддерживает этот формат
     *	._touch - если это тачскрин. 
     *	Добавляет к .wrapper класс _loaded когда дерево DOM построено
    */
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

    function isIE() {
        ua = navigator.userAgent;
        var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
        return is_ie;
    }
    if (isIE()) {
        document.querySelector('html').classList.add('ie');
    }
    if (isMobile.any()) {
        document.querySelector('html').classList.add('_touch');
    }

    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
        if (support === true) {
            document.querySelector('html').classList.add('_webp');
        } else {
            document.querySelector('html').classList.add('_no-webp');
        }
    });
    
    window.addEventListener("load", function () {
        if (document.querySelector('.wrapper')) {
            setTimeout(function () {
                document.querySelector('.wrapper').classList.add('_loaded');
            }, 0);
        }
    });

    let unlock = true;
};
checkBrowser();

//----- bg-img start
function bgimg() {
    /* Устанавливает фоном картинку указанную в теге img 
     * (Дорабтать)
    */
    let bgimg = document.querySelectorAll("._bg-img");
    for (let i = 0; i < bgimg.length; i++) {
        if (bgimg[i].querySelector('img') && bgimg[i].querySelector('img').getAttribute('src') != null) {
            bgimg[i].style.backgroundImage = 'url(' + bgimg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}
bgimg();
document.addEventListener('DOMContentLoaded', bgimg, false)
//----- bg-img end


function setActiveLanguage() {
    const langsBlock = document.querySelector('.top-bar__langs');
    if (langsBlock) {
        const langs = langsBlock.querySelectorAll('.top-bar__lang')
        for (let lang of langs) {
            lang.addEventListener('click', function () {
                removeAllActiveClasses();
                addClassActive(lang)
            },false);
        }

        function removeAllActiveClasses() {
            for (let leng of langs) {
                leng.classList.remove('top-bar__lang_active');
            }
        }

        function addClassActive(elem) {
            elem.classList.add('top-bar__lang_active');
        }

    }
}
setActiveLanguage();


function setPaddingTopForWrapper() {
    const wrapper = document.querySelector('.wrapper');
    const header = document.querySelector('.header');
    
    setPadding()
    window.addEventListener('resize', setPadding, false)

    function setPadding() {
        if (window.innerWidth < 992 && window.innerWidth > 768) {
            wrapper.style.paddingTop = header.offsetHeight - 5 + 'px';
        } else if (window.innerWidth >= 992 || window.innerWidth <= 768) {
            wrapper.style.paddingTop = '';
        }
    }
}
setPaddingTopForWrapper();

function setHeightImagesInAbout() {
    const aboutGrid = document.querySelector('.about__grid');
    const aboutGridItems = aboutGrid.querySelectorAll('.about__grid-item');
    const aboutGridImages = aboutGrid.querySelectorAll('.about__grid-image');
    
    if (aboutGrid && aboutGridItems && aboutGridImages) {
        setImagesHeight();
        window.addEventListener('resize',setImagesHeight);
    };

    function setImagesHeight() {
        for (let i = 0; i < aboutGridImages.length; i++) {
            aboutGridImages[i].style.height = aboutGridItems[0].offsetHeight + 'px';
        }
    };
};
setHeightImagesInAbout();

function setAnimationDelay(selector, delayTime) {
    let elems = document.querySelectorAll(selector);
    let delay;

    if (elems) {
        animationDelay(delayTime);
    }

    function animationDelay(value) {
        for (let i = 0; i < elems.length; i++) {
            if (i == 0) {
                elems[i].style.animationDelay = 0 + 's';
                delay = value;
            } else {
                elems[i].style.animationDelay = delay + 's';
                delay += value;
            };
        };
    };
};

setAnimationDelay('.services__item', 0.2);
setAnimationDelay('.about__grid-item', 0.2);