/* --- Sparrow Gallery ------------- 
 * Добавляет галлерею на сайт.
 *
 *
*/

function sparrowGallrey() {
    let sGallery = document.querySelector('.sparrow-gallery');

    if (sGallery) {
        let thumbs = sGallery.querySelector('.sparrow-gallery__list').querySelectorAll('.sparrow-gallery__item');
        
        let popupWrapper = sGallery.querySelector('.sparrow-gallery__popup-wrapper');
        let popupClose = popupWrapper.querySelector('.sparrow-gallery__popup-top-close');
        let popupImgEl = popupWrapper.querySelector('.sparrow-gallery__popup-viewer-photo');
        let popupPrev = popupWrapper.querySelector('.sparrow-gallery__btn-prev');
        let popupNext = popupWrapper.querySelector('.sparrow-gallery__btn-next');

        let currentPhoto;

        for (let i = 0; i < thumbs.length; i++) {
            thumbs[i].addEventListener('click', () => {
                document.body.classList.add('_lock');
                popupWrapper.classList.add('sparrow-gallery__popup-wrapper_active');
                let fullImgSrc = thumbs[i].getAttribute('data-full-size');
                popupImgEl.setAttribute('src', fullImgSrc);
                currentPhoto = i;
                changeColorPrev();
                changeColorNext();
                bodyShift();
                console.log(currentPhoto)
            }, false) 
        };

        popupPrev.addEventListener('click', ()=>{
            if (currentPhoto > 0) {
                currentPhoto--;
                let bigSize = thumbs[currentPhoto].getAttribute('data-full-size');
                popupImgEl.setAttribute('src', bigSize);
                changeColorNext()
                changeColorPrev();
            };
            
        }, false);

        popupNext.addEventListener('click', ()=>{
            if (currentPhoto < (thumbs.length - 1)) {
                currentPhoto++;
                let bigSize = thumbs[currentPhoto].getAttribute('data-full-size');
                popupImgEl.setAttribute('src', bigSize);
                changeColorPrev();
                changeColorNext();
            };
            
        }, false);

        function changeColorPrev() {
            if (currentPhoto == 0) {
                popupPrev.style.color = '#9a9a9a';
                popupPrev.style.transform = 'none';
                popupPrev.style.cursor = 'default';
            } else if (currentPhoto != 0) {
                popupPrev.style.color = '';
                popupPrev.style.transform = '';
                popupPrev.style.cursor = 'pointer';
            };
        };

        function changeColorNext() {
            if (currentPhoto == (thumbs.length - 1)) {
                popupNext.style.color = '#9a9a9a';
                popupNext.style.transform = 'none';
                popupNext.style.cursor = 'default';
            } else if (currentPhoto != (thumbs.length - 1)) {
                popupNext.style.color = '';
                popupNext.style.transform = '';
                popupNext.style.cursor = 'pointer';
            }
        };

        function closePopup() {
            
            function removeClasses() {
                document.body.classList.remove('_lock');
                popupWrapper.classList.remove('sparrow-gallery__popup-wrapper_active');
            };

            // При клике на крестик 
            popupClose.addEventListener('click', ()=>{
                removeClasses();
                bodyShift();
            }, false);

            //При клике на пустом месте
            function clickOnEmpty(event) {
                let target = event.target;
               
                let element = event.target.closest('.sparrow-gallery__popup-inner');
                if (target == element) {
                    removeClasses();
                    bodyShift();
                };
            };
            document.addEventListener('click', clickOnEmpty,false);
        };
        closePopup();

        let rightScrollWidth =  window.innerWidth - document.body.offsetWidth;
        let wrapperEl = document.querySelector('.wrapper');
        let wrapperChilds = wrapperEl.children;

        function bodyShift() {
            if (window.innerWidth > 768) {
                if (document.body.classList.contains('_lock')) {
                    if (wrapperEl.offsetWidth == document.body.offsetWidth) {
                        for (let i = 0; i < wrapperChilds.length; i++) {
                            wrapperChilds[i].style.paddingRight = rightScrollWidth + 'px';
                        };
                    } else if (wrapperEl.offsetWidth != document.body.offsetWidth) {
                        document.body.style.paddingRight = rightScrollWidth + 'px';
                    };
                    popupWrapper.style.paddingRight = rightScrollWidth + 'px';
                } else if (!document.body.classList.contains('_lock')) {
                    if (wrapperEl.offsetWidth == document.body.offsetWidth) {
                        for (let i = 0; i < wrapperChilds.length; i++) {
                            wrapperChilds[i].style.paddingRight = 0 + 'px';
                        };
                    } else if (wrapperEl.offsetWidth != document.body.offsetWidth) {
                        document.body.style.paddingRight = 0 + 'px';
                    };
                    popupWrapper.style.paddingRight = 0 + 'px';
                };
            };
            
        };



    };
};

sparrowGallrey();