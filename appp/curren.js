 window.addEventListener("DOMContentLoaded" , function () {
 let converFrom = document.getElementById('converF').value;
 let converTo = document.getElementById('converT').value;
 //getCurrency();
 
});
 
 
function getCurrency() { 
	let converFrom = document.getElementById('converF').value;
 let converTo = document.getElementById('converT').value;
 
   let query =[`${converFrom}_${converFrom}`];
   
 let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${converFrom}_${converTo}&compact=ultra`;
	fetch(url,{ mode: 'no-cors'})
	/*.then(  response => {
		console.log(' response received')
	}).then(data => {
  	//alert(data[`${converFrom}_${converTo}`]);
  	console.log(data);
  }).catch(error => console.log('error is', error));

  }*/
  //fetch('https://free.currencyconverterapi.com/api/v5/convert?q=USD_PHP&compact=y')}
  //fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${converFrom}_${converTo}&compact=y`)
 
  .then(  response => {
  	 return response.json();

    }).then(data => {
  	//alert(data[`${converFrom}_${converTo}`]);
  	console.log(data);
  		
    let x = Object.values(data)[0]*document.getElementById('calc').value ;
;
   	document.getElementById('inp').value= x;

   	//document.getElementById('inp').disabled= true;
   
 
    // }
})
  .catch(error => console.log('error is', error));

  }
  


  
 
