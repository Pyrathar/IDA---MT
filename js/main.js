 
	$(function () {
		dragdropinit();
	});
	
	function appendtooriginal() {
		$( this ).find(".pic-draggable").appendTo("#modal_situations ul");
	
	
	}
	
	
        function dragdropinit() {
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
			});
			
			$( "li", $strategies  ).draggable({ 
			cancel: "a.ui-icon", // clicking an icon won't initiate dragging
			revert: "invalid", // when not dropped, the item will revert back to its initial position
			containment: "document",
			helper: "clone",
			cursor: "move",
			zIndex: 1000000000,
			});
			
			
			$situation.droppable({
			accept: ".modal_situations li, .pic-droppable li",
			activeClass: "drop-highlight",
			drop: function( event, ui ) {
					$( this ).find(".pic-draggable").appendTo("#modal_situations ul");
					$(ui.draggable).appendTo(this );
					$("#modal_situations, #modal_strategies").hide();
			}		
			});
			
			$pictures.droppable({
			accept: ".pic-droppable li",
			drop: function( event, ui ) {
				$(ui.draggable).appendTo( "#modal_situations ul" );
			}
			});
			
			$strategy.droppable({
			accept: ".modal_strategies li, .strategy-droppable li",
			activeClass: "drop-highlight",
			drop: function( event, ui ) {
					$( this ).find(".strategy-draggable").appendTo("#modal_strategies ul");
					$(ui.draggable).appendTo( this );
					$("#modal_situations, #modal_strategies").hide();
			}		
			});
			
			$strategies.droppable({
			accept: ".strategy-droppable li",
			drop: function( event, ui ) {
				$(ui.draggable).appendTo( "#modal_strategies ul" );
			}
			});
        
			

	   }
         

 
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
	
        if(event.target.files.length == 1 && 
           event.target.files[0].type.indexOf("image/") == 0) {
				$( this ).parent().parent().find(".pic-draggable").appendTo("#modal_situations ul");
              $(this).parent().parent().find( 'ul' ).append($('<li>').addClass('ui-widget-content ui-draggable pic-draggable').append($('<img>').addClass('yourimage').attr("src",URL.createObjectURL(event.target.files[0]))));
        }
			dragdropinit();
	}
	
	
        
         

		 		   

$(function () {

 // $('#pdfhtml').click(function () {
  //   var doc = new jsPDF('p','px','a4');
	
 //    doc.addHTML($('#container')[0], 5, 5, {
 //      'background': '#fff',
 //	  'width': 1024, 
	
  //   }, function() {
  //     doc.save('sample-file.pdf');
 //    });
  // });
 //});
    

  

$(document).ready(function(){


$( "#pdfhtml, .pdf_save" ).click(function() {
				$("#page_wrapper").removeAttr('id').removeAttr('style').attr("id","page_wrapper_temp");
				$(".ignorepdf").hide();
				$(".top-wrapper").hide();
				$(".session_line").show();
				$(".bottom_arrow").hide();
				$(".front_page").hide();
				
				exportPDF();		
				
});
function exportRevert() {
				$("#page_wrapper_temp").removeAttr('id').attr("id","page_wrapper");
				$(".ignorepdf").removeAttr('style');
				$(".top-wrapper").show();
				$("#nav_controls").hide();
				$(".session_line").hide();
				$(".bottom_arrow").show();
				$(".pdf_save").hide();
				$(".nextpage_btn").show();
				$(".front_page").show();
}
function exportPDF() {
	
	$("#loading").show();
	
    var canvasToImage = function(canvas){
        var img = new Image();
        var dataURL = canvas.toDataURL('image/png');
        img.src = dataURL;
        return img;
    };
    var canvasShiftImage = function(oldCanvas,shiftAmt){
        shiftAmt = parseInt(shiftAmt) || 0;
        if(!shiftAmt){ return oldCanvas; }
        
        var newCanvas = document.createElement('canvas');
        newCanvas.height = oldCanvas.height - shiftAmt;
        newCanvas.width = oldCanvas.width;
        var ctx = newCanvas.getContext('2d');
        
        var img = canvasToImage(oldCanvas);
        ctx.drawImage(img,0, shiftAmt, img.width, img.height, 0, 0, img.width, img.height);
        
        return newCanvas;
    };
    
    
    var canvasToImageSuccess = function(canvas){
        var pdf = new jsPDF('p','px'),
            pdfInternals = pdf.internal,
            pdfPageSize = pdfInternals.pageSize,
            pdfScaleFactor = pdfInternals.scaleFactor,
            pdfPageWidth = pdfPageSize.width,
            pdfPageHeight = pdfPageSize.height,
            totalPdfHeight = 0,
            htmlPageHeight = canvas.height,
            htmlScaleFactor = canvas.width / (pdfPageWidth * pdfScaleFactor),
            safetyNet = 0;
        
        while(totalPdfHeight < htmlPageHeight && safetyNet < 15){
            var newCanvas = canvasShiftImage(canvas, totalPdfHeight);
            pdf.addImage(newCanvas, 'png', 5, 5, pdfPageWidth, 0, null, 'NONE');
            
            totalPdfHeight += (pdfPageHeight * pdfScaleFactor * htmlScaleFactor);
            
            if(totalPdfHeight < htmlPageHeight){
                pdf.addPage();
            }
            safetyNet++;
        }
        
        pdf.save('LivingWell.pdf');
		
		
    };
    
    html2canvas($('#container')[0], {
        onrendered: function(canvas){
            canvasToImageSuccess(canvas);
			exportRevert();
			$("#loading").hide();
        }
    });
}


});

 

 
		 
		$(document).ready(function(){
			$( ".hide" ).click(function() {
				$("#modal_situations, #modal_strategies, #modal_help").hide();
			});
			$( ".show_situations" ).click(function() {
				$("#modal_strategies").hide();
				$("#modal_situations").show();
			});
			$( ".show_strategies" ).click(function() {
				$("#modal_situations").hide();
				$("#modal_strategies").show();
			});
			$( ".show_help" ).click(function() {
				$("#modal_help").show();
			});
		});
		
	
		
		$(document).ready(function(){
		
			
			$('#reload_btn').click(function() {
			if(confirm("Are you sure? All changes will be lost"))
				{
					location.reload();	
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
    $('.select_coop').change(function(){
        if($(this).val() == 'other') {
            $(this).parent().find( '.other_select' ).show(); 
        } else {
            $(this).parent().find('.other_select').hide(); 
        } 
    });

$('.nextpage_btn').click(function() {
      event.preventDefault();
		if ($('#page_wrapper').css("marginLeft")=='-2048px'){
			$('#page_wrapper').animate({
			marginLeft: "-=1024px"
			}, 0);
			$(this).hide();
			$(".pdf_save").show();
			}
		else {
			$('#page_wrapper').animate({
			marginLeft: "-=1024px"
			}, 0);
			$("#nav_controls").show();
			
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
		 