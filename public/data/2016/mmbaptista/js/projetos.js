// Menu
$('#btn-menu').click(function(e){
	e.preventDefault();

	$(this).toggleClass('fechar');
	$('#sub-menu').slideToggle();

});

$('.head').click(function(e){
	e.preventDefault();

	$('.head').removeClass('active');
	$('#sub-menu ul').slideUp();

	$(this).toggleClass('active');
	$(this).parent().find('ul').slideToggle();

});

// Galerias
$(document).ready(function() {

	var sync1 = $("#fotos");
	var sync2 = $("#thumbs");

	sync1.owlCarousel({
		items:1,
		itemsDesktop:[1199,1],
		itemsDesktopSmall:[979,1],
		itemsTablet:[768,1],
		itemsMobile:[479,1],
		slideSpeed:1000,
		navigation:true,
		pagination:false,
		afterAction:syncPosition,
		responsiveRefreshRate:200
	});

	sync2.owlCarousel({
		items:7,
		itemsDesktop:[1199,7],
		itemsDesktopSmall:[979,6],
		itemsTablet:[768,4],
		itemsMobile:[479,2],
		pagination:false,
		responsiveRefreshRate:100,
		afterInit :function(el){
			el.find(".owl-item").eq(0).addClass("synced");
		}
	});

	function syncPosition(el){
		
		var current = this.currentItem;
		
		$("#thumbs").find(".owl-item").removeClass("synced").eq(current).addClass("synced");

		if($("#thumbs").data("owlCarousel") !== undefined){
			center(current)
		}
	}

	$("#thumbs").on("click", ".owl-item", function(e){

		e.preventDefault();
		
		var number = $(this).data("owlItem");
		
		sync1.trigger("owl.goTo",number);

	});

	function center(number){

		var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
		
		var num = number;
		
		var found = false;
		
		for(var i in sync2visible){
			
			if(num === sync2visible[i]){
				var found = true;
			}

		}

		if(found===false){

			if(num>sync2visible[sync2visible.length-1]){
			
				sync2.trigger("owl.goTo", num - sync2visible.length+2);
			
			} else {
		
				if(num - 1 === -1){

					num = 0;

				}

				sync2.trigger("owl.goTo", num);

			}

		} else if(num === sync2visible[sync2visible.length-1]){

			sync2.trigger("owl.goTo", sync2visible[1]);
		
		} else if(num === sync2visible[0]){
	
			sync2.trigger("owl.goTo", num-1);

		}

	}

});