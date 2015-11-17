 <script>
	$(function () {
	draggableenable();
		droppableenable();
	});
	
	function appendtooriginal() {
		$( this ).find(".pic-draggable").appendTo("#modal_situations ul");
		}
		
		function draggableenable() {
		var $pictures = $( "#modal_situations" ),
			$situation = $( ".pic-droppable" ),
			$strategies = $( ".modal_strategies" ),
			$strategy = $( ".strategy-droppable" );
			
          $( "li", $pictures  ).draggable({ 
			cancel: "a.ui-icon", // clicking an icon won't initiate dragging
			revert: "invalid", // when not dropped, the item will revert back to its initial position
			containment: "document",
			helper: "clone",
			cursor: "move",
			zIndex: 1000000000000,
			});

			$( "li", $situation  ).draggable({ 
			cancel: "a.ui-icon", // clicking an icon won't initiate dragging
			revert: "invalid", // when not dropped, the item will revert back to its initial position
			containment: "document",
			helper: "clone",
			cursor: "move",
			zIndex: 10000000000000000000,
			start: function(event, ui) {$("#modal_situations").show();}
			});
			
			$( "li", $strategies  ).draggable({ 
			cancel: "a.ui-icon", // clicking an icon won't initiate dragging
			revert: "invalid", // when not dropped, the item will revert back to its initial position
			containment: "document",
			helper: "clone",
			cursor: "move",
			zIndex: 1000000000,
			start: function(event, ui) {$("#modal_strategies").show(); }
			});
			
			$( "li", $strategy  ).draggable({ 
			cancel: "a.ui-icon", // clicking an icon won't initiate dragging
			revert: "invalid", // when not dropped, the item will revert back to its initial position
			containment: "document",
			helper: "clone",
			cursor: "move",
			zIndex: 10000000000000000000,
			start: function(event, ui) {
			$("#modal_strategies").show(); 
			$( this ).parent().parent().find(".strategy_own").hide(); 
			}
			});
			
}
        function droppableenable() {
			var $pictures = $( "#modal_situations" ),
			$situation = $( ".pic-droppable" ),
			$strategies = $( ".modal_strategies" ),
			$strategy = $( ".strategy-droppable" );
			
			$situation.droppable({
			accept: ".modal_situations li, .pic-droppable li",
			activeClass: "drop-highlight",
			drop: function( event, ui ) {
					$( this ).find(".pic-draggable").remove();
					$(ui.draggable).clone().appendTo(this );
					$("#modal_situations, #modal_strategies").hide();
					draggableenable();
			}		
			});
			
			$pictures.droppable({
			accept: ".pic-droppable li",
			drop: function( event, ui ) {
				$(ui.draggable).remove();
			}
			});
			
			$strategy.droppable({
			accept: ".modal_strategies li, .strategy-droppable li",
			activeClass: "drop-highlight",
			drop: function( event, ui ) {
					$( this ).find(".strategy-draggable").remove();
					
					$(ui.draggable).clone().appendTo( this );
					$("#modal_situations, #modal_strategies").hide();
					if($(ui.draggable).hasClass('strategy_own_pic')){
						$( this ).find(".strategy_own").show(); 
						console.log('onReadyness');
							}
							else {
							$( this ).find(".strategy_own").hide(); 
							}
					draggableenable();
			}		
			});
			
			$strategies.droppable({
			accept: ".strategy-droppable li",
			drop: function( event, ui ) {
				$(ui.draggable).appendTo( "#modal_strategies ul" );
				
			}
			});
        
			

	   }
        </script>

<script>
	var desiredWidth;

    $(document).ready(function() {
        console.log('onReady');
		$("#takePictureField1, #takePictureField2, #takePictureField3").on("change",gotPic);

		desiredWidth = window.innerWidth;
        
        if(!("url" in window) && ("webkitURL" in window)) {
            window.URL = window.webkitURL;   
        }
		
	});

	function gotPic(event) {
		$("#modal_situations").hide();
        if(event.target.files.length == 1 && 
           event.target.files[0].type.indexOf("image/") == 0) {
				$(this).parent().parent().find(".pic-draggable").appendTo("#modal_situations ul");
              	$(this).parent().parent().find( 'ul' ).append($('<li>').addClass('ui-widget-content ui-draggable pic-draggable').append($('<img>').addClass('yourimage').attr("src",URL.createObjectURL(event.target.files[0]))));
        }
			draggableenable();
	}
	
	
        
    </script>    

  

 <script>

$(document).ready(function(){

$( "#pdfhtml, .pdf_save" ).click(function() {
				$("#page_wrapper").removeAttr('id').removeAttr('style').attr("id","page_wrapper_temp");
				$(".container_frame").removeAttr('class').removeAttr('style').attr("class","container_temp");
				$("#img_logo").attr("class","img_logo_temp");
				$("#top_wrapper").attr("class","top_wrapper_temp");
				$(".ignorepdf").hide();
				$(".session_line").show();
				$(".showpdf").show();
				$(".bottom_arrow").hide();
				$(".page").hide();
				
				exportPDF();		
				
});
function exportRevert() {
				$("#page_wrapper_temp").removeAttr('id').attr("id","page_wrapper");
				$(".container_temp").removeAttr('class').attr("class","container_frame");
				$(".ignorepdf").removeAttr('style');
				$("#img_logo").removeAttr('class');
				$("#top_wrapper").removeAttr('class');
				$("#nav_controls").hide();
				$(".showpdf").hide();
				$(".session_line").hide();
				$(".bottom_arrow").show();
				$(".pdf_save").hide();
				$(".nextpage_btn").show();
				$(".page").show();
}
function exportPDF() {
	$("#loading").show();	
    var doc = new jsPDF('p','px','a4');
	doc.addHTML($('#container')[0], 5, 5, {
		'background': '#fff',
		'width': 1024, 
    }, function() {
    	
		$("#loading").hide();
		
		doc.save('lw-file.pdf');
		$("#iframepdf").attr("src", doc.output('datauristring')); 
			
		$('#pdfdownloadlink').click(function () { doc.save('lw-file.pdf');});  
		
		exportRevert();
		
		}); 

	}
});

</script>

		<script>
		$(document).ready(function(){
			$( ".hide" ).click(function() {
				$("#modal_situations, #modal_strategies, #modal_help, #modal_strategies_help").hide();
			});
			$( ".show_situations" ).click(function() {
				if ($("#modal_situations").is(':visible')){
				$("#modal_situations").hide();
				} else {
				$("#modal_strategies").hide();
				$("#modal_situations").show();
				}	
			});
			$( ".show_strategies" ).click(function() {
				if ($("#modal_strategies").is(':visible')){
				$("#modal_strategies").hide();
				} else {
				$("#modal_situations").hide();
				$("#modal_strategies").show();
				}			
			});
			$( ".show_help" ).click(function() {
			if ($("#modal_help").is(':visible')){
				$("#modal_help").hide();
				} else {
				$("#modal_help").show();
				}				
			});
			$( ".help_strategies" ).click(function() {
			if ($("#modal_strategies_help").is(':visible')){
				$("#modal_strategies_help").hide();
				} else {
				$("#modal_strategies_help").show();
				$("#modal_strategies").hide();
				$("#modal_situations").hide();
				}				
			});
			$( "#begin_session" ).click(function() {
				$(".modal_white, #modal_intro").hide();
			});
		});
		
	
		
		$(document).ready(function(){
			$('#reload_btn').click(function() {
			if(confirm("Are you sure? All changes will be deleted"))
				{
					$("#loading").show();
					location.reload();	
					$("#loading").hide();
				}
				else
				{
					e.preventDefault();
				}
			});
		});

	
		$(document).ready(function(){
			$( ".rate_circle" ).click(function() {
			$( this ).parent().find(".rate_circle_chosen").toggleClass( "rate_circle_chosen" );
				$( this ).toggleClass( "rate_circle_chosen" );
			});
		});
		</script>
		
		<script>
	$(document).ready(function(){	
$('.s_disrib').keyup(function () {
  var max = 387;
  var len = $(this).val().length;
  if (len >= max) {
	var charleft = len - max;
    $(this).parent().find( '.charNum' ).text(- charleft + '   You have reached the limit').css("color", "red");
  } else {
    var char = max - len;
    $(this).parent().find( '.charNum' ).text(char + ' characters left').css("color", "grey");
  }
});

$('.s_implement').keyup(function () {
  var max = 258;
  var len = $(this).val().length;
  if (len >= max) {
	var charleft = len - max;
    $(this).parent().find( '.charNumStra' ).text(- charleft + '   you have reached the limit').css("color", "red");
  } else {
    var char = max - len;
    $(this).parent().find( '.charNumStra' ).text(char + ' characters left').css("color", "grey");
  }
});

    $('.other_select').hide(); 
    $('.select_coop').on('change', this, function(){
        if($(this).val() == 'other') {
            $(this).parent().find( '.other_select' ).show(); 
        } else {
            $(this).parent().find('.other_select').hide(); 
        } 
    });

$('.nextpage_btn').click(function() {
      event.preventDefault();
		if ($('#page_wrapper').css("marginLeft")=='-3072px'){
			$('#page_wrapper').animate({
			marginLeft: "-=1024px"
			}, 0);
			$(this).hide();
			$(".pdf_save").show();
			
			} else if ($('#page_wrapper').css("marginLeft")=='-1024px') {
			$('#page_wrapper').animate({
			marginLeft: "-=1024px"
			}, 0);
			$(".modal_white, #modal_intro").show();
			$("#nav_controls").show();
			}	
			
			else {
			$('#page_wrapper').animate({
			marginLeft: "-=1024px"
			}, 0);
			$("#nav_controls").show();
			$(".modal_white, #modal_intro").hide();
			
			}
   });
   
   $('.nav_back').click(function() {
      event.preventDefault();
      if ($('#page_wrapper').css("marginLeft") == '-1024px'){
		$("#nav_controls").hide();
		$(".nextpage_btn").show();
		$(".pdf_save").hide();
		
		
	  $('#page_wrapper').animate({
			marginLeft: "+=1024px"
			}, 0);
			
			$(".bottom_arrow").show();
			}
		else {
			$('#page_wrapper').animate({
			marginLeft: "+=1024px"
			}, 0);
			$("#nav_controls").show();
			$(".nextpage_btn").show();
			$(".pdf_save").hide();
			}
   });
   
});
		</script>