let sliderSpeed = 1000;

let headerSlider = new Swiper('.cargo-slider', {
    navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev'
	},
    simulateTouch: true, 
    grabCursor: true,
    slideToClickedSlide: false,
    speed: sliderSpeed,
    effect: 'slide',
    autoHeight: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    centeredSlides: false,
    spaceBetween: 30,
    loop: false
});
