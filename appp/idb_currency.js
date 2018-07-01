let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

      function ajout_curency(dat,database) { 
        //let transaction = db.transaction(["mustafa-cur"],"readwrite");

            //let currencies_db = transaction.objectStore("mustafa-cur");
  console.log(" caaaling ajout _ currency ",dat);

let transaction = database.transaction(["mustafa-cur"],"readwrite");
  let store = transaction.objectStore("mustafa-cur");
  let curren=({From_To : Object.keys(dat)[0] , value : Object.values(dat)[0]}) 
  console.log(" vaal is ",dat );
             
             let request = store.add(curren);
        request.onerror = function(e) {
          console.log("Error",e.target.error.name);
          //some type of error handler
        }
     
        request.onsuccess = function(e) {
            console.log("Woot! Did it");
            let resultat = Object.values(dat)[0] * document.getElementById('calc').value ;
            document.getElementById('inp').value= resultat;
        } 
  }


function getCurrency() { 
  console.log(' hi from function')
 let converTo = document.getElementById('converT').value;
  let converFrom = document.getElementById('converF').value;
  let  openRequest = indexedDB.open("mustafa-db",2);
  openRequest.onsuccess = function(e) {
            console.log("Success!");
             let db = e.target.result;
            
  let transaction = db.transaction(["mustafa-cur"],"readwrite");

  let currencies_db = transaction.objectStore("mustafa-cur");

  let ob = currencies_db.get(`${converFrom}_${converTo}`);
 
  ob.onsuccess = function(e) {
        let currency_exist = ob.result;
        console.log(" currencies : ",currency_exist)
        if (typeof currency_exist !== 'undefined'){
          console.log(" currencies finded in db : ",currency_exist.value);
          let resultat = currency_exist.value * document.getElementById('calc').value ;
          document.getElementById('inp').value= resultat;
        }
        else{
          
          
          let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${converFrom}_${converTo}&compact=ultra`;
          
          fetch(url)
            .then(  response => {
               return response.json();

              }).then(data => {
              //alert(data[`${converFrom}_${converTo}`]);
              console.log(data,db);
                
              //x = 11 ;//Object.values(data)[0];
              ajout_curency(data,db);
              
              //console.log(x);
              //return x;
          })
            .catch(error => console.log('error is', error));
            
        }
       
      }
    ob.onerror = function(e) {
            console.log("Error while searching in indexdb");
    }
  }

  openRequest.onerror = function(e) {
            console.log("Error");
            console.dir(e);
        }

}