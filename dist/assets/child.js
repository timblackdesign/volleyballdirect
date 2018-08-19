$(document).ready(function() {
     $("#tabs").tabs();

    // Call product related scripts if on product page
	if( $('#shopify-section-static-product').length > 0 ){
		setUpProduct();
	}

	// Call product related scripts if quickview button clicked
     $( ".productitem--action-trigger" ).on( "click", setUpProduct );

// Keep for a/b testing. For now .state--announcement-open has been hardcoded to body element
  //    if($( '.site-header-announcement').length ){
  //    	var delay = function(){
		// 	$('body').addClass('state--announcement-open');
		// };
  //    	setTimeout(delay, 3000);
  //    }

     $('.action--hide-announcement').click(function(){
     	$('body').removeClass('state--announcement-open');
     });

     $('#contact_form').attr('action', '//directsports.us8.list-manage.com/subscribe/post?u=d6b964ec0f864d3f17c302eaa&amp;id=36b1e0902a');
     $('#contact_form').attr('target', '_blank');

     // Homepage slick slider
     $('.slideshow--inner').slick({
	    "autoplay": true
	  });

 });

// Combines all product page related scripts
function setUpProduct(){

	setTimeout(function(){
		//console.log("setUpProduct called");
	   // Product thumbnail slick slider
	     $('.product-gallery--navigation').slick({
		    "autoplay": false,
		   	"slidesToShow": 4,
		   	"slidesToScroll": 4,
		   	"vertical": true,
			"responsive": [
			    {
			      "breakpoint": 719,
			      "settings": {
			      	"autoplay": false,
			      	"adaptiveHeight": true,
			      	"centerMode": false,
			      	"vertical": false,
			        "slidesToShow": 4,
			        "slidesToScroll": 4,
			        "infinite": true
			      }
			    }
			  ]
		  });

	    // Fixed promo expander on product pages
	    $('.product-section--promos .promo-block--expander').click(function(e){
	     	e.preventDefault();
	     	$(this).closest('.promo-block--content').addClass('promo-block--expanded');
	     });

	     // Product page scripts
	    // "Pick an Option" product modification
	    var window_url = window.location.href;
	    var variant_id = "";
	    var variant_sku = "";

	 //    if( !(window_url.includes( '?variant=' )) ) {
		// 	$(window).on('load', function () {
		// 		$('[data-product-option]').val('Select an option');
		// 	})
		// }

	    var VARIANT_TO_SKU = {
	      current: null,

	      initialize () {
	        this.current = this.getVariantFromUrl()
	        this.watcher()
	      },

	      watch () {
	        var checker = this.getVariantFromUrl()

	        if (checker !== this.current) {
	          this.current = checker
	          this.updateSKU()
	          this.updateQuantity()
	        }
	      },

	      watcher () {
	        var self = this

	        setInterval(function () {
	          self.watch()
	        }, 500);
	      },

	      getVariantFromUrl: function () {
	        return window.location.href.split("variant=")[1];
	      },

	      updateSKU: function () {
	        var sku = $('[data-variant-id='+ this.current + ']').attr('data-sku');
	        $('.product-sku > strong').text(sku)
	      },

	      updateQuantity: function () {
	      	var self = this;
	      	var variants = $('.product-form--regular form').data('variants')
			var variant = variants.find(function(item){
			  return item.id == self.current
			})

	        $('.product--quantity-available-value').text(variant.inventory_quantity)
	      }
	    }

		VARIANT_TO_SKU.initialize()

		// Enlarged image trigger
		$('.action--show-enlarged-image').click(function(){
			$('body').addClass('state--image-enlarged');
		});

		// Enlarged image hide
		$('.action--hide-enlarged-image').click(function(){
			$('body').removeClass('state--image-enlarged');
		});

		// Get url from thumbnail for enlarged image
		$('.product-gallery--thumbnail').click(function() {
				var url = $(this ).attr('src');
				var enlarged_url = url.replace( '_x100', '_1024x1024');

				$('.product-modal--enlarged-image img').attr('src', enlarged_url);
		});

		$('.product-gallery--thumbnail-trigger').click(function() {
				$(this).addClass('thumbnail--active').siblings().removeClass('thumbnail--active').removeClass('thumbnail-selected');
		});

	}, 500);

}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}
