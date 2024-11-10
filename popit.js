$(document).ready(function() {

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    var items = $('.Center-item');
    items.click(function(e) {  
        $('.modal-dialog-title').text($(this).data('title')+" ")

        $('.description').text($(this).data('desc')+" ")

        $('.value').text($(this).data('price')+" РУБ")
        $('.modal-overlay').attr('class','modal-overlay active')
        $( "input[name^='sum']" ).val($(this).data('price'));
        $( "input[name^='description']" ).val($(this).data('title'));
        $( "input[name^='extra']" ).val($(this).data('extra'));
    });

    var items = $('.Center-item-pln');
    items.click(function(e) {  
        $('.modal-overlay-pln').attr('class','modal-overlay-pln active')
    });

    var items = $('.Center-item-info');
    items.click(function(e) {  
        $('.modal-overlay-info').attr('class','modal-overlay-info active')
    });

    var items = $('.rulezzz');
    items.click(function(e) {  
        $('.modal-overlay-rules').attr('class','modal-overlay-rules active')
    });

    var closebtn = $('#modal-close');
    closebtn.click(function(e) {
        $('.modal-overlay').attr('class','modal-overlay');
    });

    var closebtnpln = $('#modal-close-pln');
    closebtnpln.click(function(e) {
        $('.modal-overlay-pln').attr('class','modal-overlay-pln');
    });

    var closebtninfo = $('#modal-close-info');
    closebtninfo.click(function(e) {
        $('.modal-overlay-info').attr('class','modal-overlay-info');
    });

    var closebtninfo = $('#modal-close-rules');
    closebtninfo.click(function(e) {
        $('.modal-overlay-rules').attr('class','modal-overlay-rules');
    });

    var closebtnmethod = $('#modal-close-method');
    closebtnmethod.click(function(e) {
        $('.modal-overlay-metod').attr('class','modal-overlay-metod');
    });

    var termchek = $('#oferta');
    termchek.click(function(e) {
        if ($(this).prop('checked')) {
            $('.btn.buy').prop( "disabled", false );
        }
        else
        {
            $('.btn.buy').prop( "disabled", true );
        }
    }); 

    var termchek = $('#oferta-pln');
    termchek.click(function(e) {
        if ($(this).prop('checked')) {
		if (parseInt($("input[name='sum-pln']").val()) > 9) {
			$('.btn.buy-pln').prop( "disabled", false );
		}
		else
        {
			$('.btn.buy-pln').prop( "disabled", true );
		}
        }
    });

    $('.input-cho').bind('input propertychange', function(){
    	if (parseInt($("input[name='sum-pln']").val()) > 9) {
    		if ($('#oferta-pln').prop('checked')) {
                $('.btn.buy-pln').prop( "disabled", false);
    		}
    		else
    		{
    			$('.btn.buy-pln').prop( "disabled", true);
    		}
        }
        else
        {
            $('.btn.buy-pln').prop( "disabled", true);
    	}
    });

    var buy = $('.btn.buy');
    buy.click(function(e) {
        $('#server').attr( "value", $("#select-server option:selected").val() );
        $('#account').attr( "value", $("input[name='steamid']").val() );
        $('#summethod').attr( "value", $("input[name='sum']").val() );
        $('#emailrec').attr( "value", $("input[name='email']").val() );
        $('#inputrec').attr( "value", $("input[name='shouldrec']").is(":checked") ? "1" : "0" );
	if (/^STEAM_\d:\d:\d+$/.test($("input[name='steamid']").val()) && validateEmail($("input[name='email']").val())) {
        	$('.modal-overlay-metod').attr('class','modal-overlay-metod active')
	}
    });  

    var buy = $('.btn.buy-pln');
    buy.click(function(e) {
        $('#server').attr( "value", $("#select-server-pln option:selected").val() );
        $('#account').attr( "value", $("input[name='steamid-pln']").val() );
        $('#summethod').attr( "value", $("input[name='sum-pln']").val() );
        $('#emailrec').attr( "value", $("input[name='email-pln']").val() );
        $('#inputrec').attr( "value", $("input[name='shouldrec-pln']").is(":checked") ? "1" : "0" );
	if (/^STEAM_\d:\d:\d+$/.test($("input[name='steamid-pln']").val()) && validateEmail($("input[name='email-pln']").val())) {
        	$('.modal-overlay-metod').attr('class','modal-overlay-metod active')
	}
    });

    var qiwi = $('input[data-type="qiwi"]');
    qiwi.click(function(e) {
        $('input[value="Qiwi"]').prop( "disabled", false );
    });

    var card = $('input[data-type="unitpay-card"]');
    card.click(function(e) {
        $('input[value="Card"]').prop( "disabled", false );
    });

    var mts = $('input[data-type="unitpay-mts"]');
    mts.click(function(e) {
        $('input[value="MTS"]').prop( "disabled", false );
    });

    var beline = $('input[data-type="unitpay-beeline"]');
    beline.click(function(e) {
        $('input[value="Megafon3"]').prop( "disabled", false );
    });

    var megafon2 = $('input[data-type="unitpay-mf2"]');
    megafon2.click(function(e) {
        $('input[value="Megafon2"]').prop( "disabled", false );
    });

    var megafon = $('input[data-type="unitpay-mf"]');
    megafon.click(function(e) {
        $('input[value="Megafon"]').prop( "disabled", false );
    });

    var tele = $('input[data-type="unitpay-tele2"]');
    tele.click(function(e) {
        $('input[value="TELE2"]').prop( "disabled", false );
    });

    var ap = $('input[data-type="unitpay-ap"]');
    ap.click(function(e) {
        $('input[value="AP"]').prop( "disabled", false );
    });

    var gp = $('input[data-type="unitpay-gp"]');
    gp.click(function(e) {
        $('input[value="GP"]').prop( "disabled", false );
    });

    var gp = $('input[data-type="unitpay-sb"]');
    gp.click(function(e) {
        $('input[value="SB"]').prop( "disabled", false );
    });

    $('input[name="sum-pln"]').on('input keyup', function(e) {
        $('.value').text(this.value+" РУБ.")
    });
});