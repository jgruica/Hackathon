   var title = document.createElement('div');
   title.innerHTML = 'Easy parking';
   document.body.appendChild(title);
   title.classList.add('title');

   document.write('<br />');
   document.write('<br />');

   function initMap() {
      var lot1North = {lat: 34.010806, lng: -118.497361};

      var mapGoogle = document.createElement('div');
      document.body.appendChild(mapGoogle);
      mapGoogle.setAttribute("id", "map");
      mapGoogle.classList.add('mapG');

      window.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: lot1North
     });
}

  function highlight(marker, data) {
      var infowindow = new google.maps.InfoWindow({
        content: data
      })
      marker.addListener('mouseover',function(){
      //  infowindow.open(marker.get('map'), marker);

        $('.' + data).css('background-color', 'yellow');
      })
      marker.addListener('mouseout',function(){
      //  infowindow.close(marker.get('map'), marker);
      $('.' + data).css('background-color', 'white');
    })
  };


$(document).ready(function(){
 $.get('https://parking.api.smgov.net/lots', function(data){
   // console.log(data[0].street_address);

   for(var i=0; i < data.length; i++){
     var marker = new google.maps.Marker({
       position: {lat: data[i].latitude, lng: data[i].longitude},
       map: map
     });
     //closure here
     highlight(marker, data[i].id)
   }

   var main = document.createElement('div');
   document.body.appendChild(main);
   main.classList.add('mainDiv');

   var table = document.createElement('table');
   main.appendChild(table);
   table.classList.add('tbl');

   var tableHead = document.createElement('thead');
   table.appendChild(tableHead);
   tableHead.classList.add('tblHead');

   var tableBody = document.createElement('tbody');
   table.appendChild(tableBody);
   tableBody.classList.add('tblBody');

   var headerRow = document.createElement('tr');
   tableHead.appendChild(headerRow);
   headerRow.classList.add('headRow');

   var headerCell = document.createElement('th');
   headerRow.appendChild(headerCell);
   headerCell.innerHTML = 'Name';
   headerCell.classList.add('headCellName');

   var headerCell = document.createElement('th');
   headerRow.appendChild(headerCell);
   headerCell.innerHTML = 'Address';
   headerCell.classList.add('headCellAddress');

   var headerCell = document.createElement('th');
   headerRow.appendChild(headerCell);
   headerCell.innerHTML = 'Spaces';
   headerCell.classList.add('headCellSpaces');


   for(let i = 0; i < data.length; i +=1) {
     var row = document.createElement('tr');
     tableBody.appendChild(row);

     var cell = document.createElement('td');
     row.appendChild(cell);
     cell.innerHTML = data[i].name;
     cell.className = data[i].id;
     //need to make highlight function here

     var cell = document.createElement('td');
     row.appendChild(cell);
     cell.innerHTML = data[i].street_address;
     cell.className = data[i].id;
     //need to make highlight function here

     var cell = document.createElement('td');
     row.appendChild(cell);
     cell.innerHTML = data[i].available_spaces;
     cell.className = data[i].id;
     //need to make highlight function here

   }

 });
});
