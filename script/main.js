// JavaScript Document
$(function(){
	btnSlide(".btn-mypage", ".mypage-inner");
	btnToggle(".utill .btn-search", ".utill form");
	btnToggle(".btn-menu", ".menu");
	btnToggle(".menu .close", ".menu");

	menu(".menu .depth1 > li > span", ".menu .depth2", ".menu .depth3");
	menu(".menu .depth2 > li > a", ".menu .depth3");	

	menu(".lnb .depth1 > li > a", ".lnb .depth2",".lnb .depth3 ul");
	lnb();
	
	$(".mainvisual .autoplay").slick({
	autoplay: true,
	slidesToShow: 2,
	prevArrow: ".mainvisual .prev", 
	nextArrow: ".mainvisual .next",
	responsive: [
    {
      breakpoint: 960,
      settings: {slidesToShow: 1}
	}
	]
	});
	currentSlide();
	$(".mainvisual .autoplay").on("afterChange", function(){currentSlide();});
	$(".mainvisual .prev").on("click", function(){currentSlide();});
	$(".mainvisual .next").on("click", function(){currentSlide();});
	stopPlay(".mainvisual .autoplay", ".mainvisual .control .stop", "slickPause");
	stopPlay(".mainvisual .autoplay", ".mainvisual .control .play", "slickPlay");
	
	var serviceSwiper = new Swiper('.service .swiper-container', {
		slidesPerView: "auto"
	});
	
	tabmenu(".notice .tabmenu li", ".notice .tabcontent");
	tabmenu(".complain .tabmenu li", ".complain .tabcontent");
	tabmenu(".complain-tablet .tabmenu li", ".complain-tablet .tabcontent");
})

/* mypage */
function btnSlide(btn, e){
	$(btn).on("click", function(){
		$(e).stop().slideToggle(300);
	})	
}

/* search */
function btnToggle(btn, e){
	$(btn).on("click", function(){
		$(this).toggleClass("on");
		$(e).toggle();
	})	
}

/* menu */
function menu(btn, nextCententAll, nextContentHide){
	$(btn).on("click", function(){
		$(btn).removeClass("on");
		$(nextContentHide).hide();
		if($(this).next().is(":visible")){
			$(nextCententAll).stop().slideUp(200);
		} else {
			$(this).addClass("on");
			$(nextCententAll).slideUp(200);
			$(this).next().stop().slideDown(200);
		}
	})
}

/* lnb */
function lnb(){
	$(".lnb [class ^= 'depth2'] > li > a").on("click", function(){
		var thisIndex = $(this).parent().index();
		if($(this).parent().parent().next().find("ul").eq(thisIndex).is(":visible")){
			$(".lnb .depth3").find("ul").fadeOut(200);
		} else{
			$(".lnb .depth3").find("ul").hide();
			$(this).parent().parent().next().find("ul").eq(thisIndex).fadeIn(200);	
		}
	})
}

function currentSlide(){
	var current = $(".mainvisual .autoplay").slick('slickCurrentSlide') +1;
	var total = $(".mainvisual .autoplay .slick-slide").not(".slick-cloned").last().index();
	$(".mainvisual .control .index").html(current + '  /  ' + total);
}

function stopPlay(slickSlide, slickBtn, slickMethod){
	$(slickBtn).on("click", function(){
		$(slickSlide).slick(slickMethod);
		$(this).parent().children().removeClass("off");
		$(this).addClass("off");
	});
}

/* notice */
function tabmenu(tab, content){
	$(content).hide().eq(0).show();
	
	$(tab).click(function(){
		$(tab).removeClass("on");
		$(this).addClass("on");

		var contentIndex = $(this).index();
		$(content).hide();
		$(content).eq(contentIndex).show();
	})
}