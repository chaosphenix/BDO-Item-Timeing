

var data = [];
var onfocusinp = false;
var item_id = 0;

var runtime = () => {
  if ((moment().format('YYYY-MM-DD HH:mm') != $('#nexttime').val()) && !onfocusinp ) {
    $('#itemtime').val(moment().format('YYYY-MM-DD HH:mm'));
  }

  for (var i in data) {
    if (moment() > moment(data[i].itemout) && !data[i].alert) {
      data[i].alert = true;
      $('#row_id_'+data[i].id).addClass('nowready');
      new Audio('include/alarm.mp3').play();
    }
  }

  setTimeout(function () {
    runtime();
  }, 100);
}

var closerow = (id) => {
  $('#row_id_'+id).remove();
  var nowarray = data.map(function(e) { return e.id; }).indexOf(id);
  data.splice(nowarray, 1);
}

var clock;

$(() => {

  var clock = $('.clock').FlipClock({
		clockFace: 'TwentyFourHourClock'
	});


  $( "#formadditem" ).submit(function( event ) {
    event.preventDefault();
    additem();
  });



  $('#itemtime').val(moment().format('YYYY-MM-DD HH:mm'));

  $("#itemtime").focus(function() {
    onfocusinp = true;
  });

  $("#itemtime").focusout(function() {
    setTimeout(function () {
      onfocusinp = false;
    }, 100);
  });

  runtime();
})


function additem() {
  item_id++;
  data.push({
    id : item_id,
    itemname : $('#itemname').val(),
    itemout : moment($('#itemtime').val()).add($('#nexttime').val(), 'minute').format('YYYY-MM-DD HH:mm'),
    alert : false
  });
  var stringb = `
        <div class="rowitem" id="row_id_`+item_id+`">
          <div class="">
            `+$('#itemname').val()+`
          </div>
          <div class="">
            `+$('#itemtime').val()+`
          </div>
          <div class="">
            `+moment($('#itemtime').val()).add($('#nexttime').val(), 'minute').format('YYYY-MM-DD HH:mm')+`
          </div>
          <div style="width: 70px;">
            <input type="button" name="" value="close" style="display: table-cell;" onclick="closerow(`+item_id+`);">
          </div>
        </div>`;
  $('#itemalert').append(stringb);
}

function hilight(e) {
  var t = $(e).parent().parent();
  if (t.hasClass('hilight')) {
    t.removeClass('hilight');
  }else{
    t.addClass('hilight');
  }


}
