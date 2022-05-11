var url = "http://localhost:3000/view";
var id = "view";

async function generator(url, id) {
    var request = await new XMLHttpRequest()

request.open('GET', url, true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
view(data, request, id);

}

request.send()
  }

  function view(data, request, id){
      if(id == "view"){
    if (request.status >= 200 && request.status < 400) {
         data.forEach((query) => {
          console.log(request.status);
          var div = document.createElement("tr");
            var mainContainer = document.getElementById(id);
          div.innerHTML = "<td>"+query.id+"</td><td><input id='event"+query.id+"' placeholder='"+query.event+"' value='"+query.event+"'/></td><td><input id='date"+query.id+"' placeholder='"+query.date+"' value='"+query.date+"'/></td><td><input id='city"+query.id+"' placeholder='"+query.city+"' value='"+query.city+"'/></td><td><input id='venue"+query.id+"' placeholder='"+query.venue+"' value='"+query.venue+"'/></td><td><input id='ticket"+query.id+"' placeholder='"+query.ticket+"' value='"+query.ticket+"'/></td>"+"<button onclick = 'torles("+query.id+")' type = 'submit' value='Submit'>Törlés</button>"+"<button onclick = 'frissites("+query.id+")'>Frissítés</button>" ;
          mainContainer.appendChild(div)
        })
      } else {
        console.log('Basztikuli...')
      }}
  }

async function generate_html(){
await generator(url, id);
}

function torles(id){
  navigator.sendBeacon('http://localhost:3000/torles/'+ id);
  console.log(id);
}
function frissites(id){
  const data = id + ";"+ document.getElementById("event"+id).value + ";"+ document.getElementById("date"+id).value + ";"+ document.getElementById("city"+id).value  + ";"+ document.getElementById("venue"+id).value + ";"+ document.getElementById("ticket"+id).value;
  
  navigator.sendBeacon('http://localhost:3000/frissites/'+ data);
  console.log(data);
}

generate_html();