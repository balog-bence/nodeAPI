
function sendPost(){
    const data = document.getElementById("event").value+";"+document.getElementById("date").value+";"+document.getElementById("city").value+";"+document.getElementById("venue").value+";"+document.getElementById("ticket").value;
    console.log(data);
      navigator.sendBeacon('http:localhost:3000/hozzaadas/'+ data);
      console.log(data);
    }
