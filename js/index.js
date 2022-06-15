$(document).ready(function(){
var contadorOpFB=0;
var contadorOpK=0;

    $('#boton').click(function () { 
      var numero1=$('#num1').val();
      var numero2=$('#num2').val();

      var kara=karatsuba(numero1,numero2);

      var multiplicacion=longMultiplication(numero1,numero2);
      
      var multinormal=longMultiplicationNormal(numero1,numero2);
      


      console.log("Funciona: "+kara+" con tiempo "+(tiempo4-tiempo3)+" ms");
      console.log(`Resultado largo= ${multinormal} con tiempo ${tiempo1-tiempo0} ms`);

      document.getElementById("resultadoFuerza").innerHTML=`Resultado: ${multiplicacion}`;
      
    });



    $('#botonComparador').click(function(){

      if($('.filaC').length>0){
          $('.filaC').remove();
      }

      var numero1=$('#num1C').val();
      var numero2=$('#num2C').val();

      const tiempo3=performance.now();
      var kara=karatsuba(numero1,numero2);
      const tiempo4=performance.now();

      const tiempo0=performance.now();
      var multinormal=longMultiplicationNormal(numero1,numero2);
      const tiempo1=performance.now();

     /* console.log("Funciona: "+kara+" con tiempo "+(tiempo4-tiempo3)+" ms");
      console.log(`Resultado largo= ${multinormal} con tiempo ${tiempo1-tiempo0} ms`);

      console.log("Operaciones Fuerza Bruta"+contadorOpFB);
      console.log("Operaciones Karatsuba: "+contadorOpK);*/
      
      var cabecera=$('#cabeceraC');
      cabecera.append($(`<tr class="filaC"><th>Método</th><th>Resultado</th><th>Tiempo (ms)</th></tr>`));
      var cuerpoTablaC=$('#tablebodyC');
      cuerpoTablaC.append($(`<tr class="filaC"><td>Fuerza Bruta</td><td>${multinormal}</td><td>${tiempo4-tiempo3}</td></tr>`));
      cuerpoTablaC.append($(`<tr class="filaC"><td>Karatsuba</td><td>${kara}</td><td>${tiempo1-tiempo0}</td></tr>`));

      contadorOpFB=0;
      contadorOpK=0;



    });




    $('#limpiarFB').click(function () { 
      
        $('#num1').val("");
        $('#num2').val("");
        $('.fila').remove();
        $('.fila2').remove();

    document.getElementById("resultadoFuerza").innerHTML=``;
      
    });

    $('#limpiarComparador').click(function () { 
      
        $('#num1C').val("");
        $('#num2C').val("");
        $('.filaC').remove();
      
    });



      $('.parallax').parallax();
      $('.sidenav').sidenav();
      $('.materialboxed').materialbox();
      /*$(".reference").click(function(e) {
        e.preventDefault();
          $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top}, 400);
      });*/
    $("#download-button").click(function(e) {
    e.preventDefault();
      $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top}, 400);
    });


function reverse(s){
  return s.split("").reverse().join("");
}

function longMultiplication(n1,n2){

  var len1=n1.length;
  var len2=n2.length;
  if($('.fila').length>0 && $('.fila2').length>0){
          $('.fila').remove();
          $('.fila2').remove();
  }
  var cuerpoTabla=$('#tablebody');

  if(len1==0 || len2==0)
    return "0";

  var result=new Array(len1+len2);

  for(var r=0; r < result.length; r++){

    result[r]=0;
  }

  var i_n1=0;
  var i_n2=0;

  var concatenador="";
  var diferenciador=0;
  cuerpoTabla.append($(`<tr class="fila" id="numero1"></tr>`));
  cuerpoTabla.append($(`<tr class="fila2" id="numero2"></tr>`));
  var primernumero=$("#numero2");
  var segundonumero=$("#numero1");



  for(var s=0;s<len2;s++){

      primernumero.append($(`<td class="fila"> </td>`));
  }

  for(var s=0;s<len1;s++){
      // primernumero.append($(`<td class="fila"><b>${n1.charAt(s)}</b></td>`)); Sin animacion
      primernumero.append($(`<td class="fila"><b><p class = 'animate__animated animate__fadeInTopLeft animate__delay-1s'>${n1.charAt(s)}</p></b></td>`)); //Con animación
  }
  for(var s=0;s<len1;s++){

      segundonumero.append($(`<td class="fila"> </td>`));
  }

  for(var s=0;s<len2;s++){
      // segundonumero.append($(`<td class="fila"><b>${n2.charAt(s)}</b></td>`)); Sin animación
      segundonumero.append($(`<td class="fila"><b><p class = 'animate__animated animate__fadeInTopRight animate__delay-1s'>${n2.charAt(s)}</p></b></td>`)); //Con animacion.
  }






  for(var i=len1-1;i>=0;i--){
      if(i==0){
          cuerpoTabla.append($(`<tr id="linea${i}" class="fila2"></tr>`));
      }else{
          cuerpoTabla.append($(`<tr id="linea${i}" class="fila"></tr>`));    
      }
      
  }

  cuerpoTabla.append($(`<tr id="resultado" class="fila"></tr>`));


  for(var i=len1-1; i>=0 ;i--){


      var renglones=$(`#linea${i}`);
      var carry=0;
      var num1=parseInt(n1.charAt(i),10);

      i_n2=0;

            for(var j=len2-1; j >= 0; j--){

              var num2=parseInt(n2.charAt(j),10);
  
              var sum=num1*num2+result[i_n1+i_n2]+carry;
              
              var auxiliar=(num1*num2+carry)%10;
              
              concatenador=concatenador+auxiliar.toString();
              
              carry=parseInt(sum/10,10);

              result[i_n1+i_n2]=sum%10;

              i_n2++;

            }

      //console.log(reverse(concatenador));
      
      if(carry>0){
          result[i_n1+i_n2]+=carry;
          concatenador+=carry.toString();
      }
          

      var resultadoRenglon=reverse(concatenador);
      var tope=len1+len2-resultadoRenglon.length-diferenciador;

      for(var k=0;k<tope;k++)
          renglones.append($(`<td class="fila"> </td>`));
      
      for(var k=0;k<resultadoRenglon.length;k++)
          // renglones.append($(`<td class="fila"><${resultadoRenglon.charAt(k)}</td>`)); Sin animación
          renglones.append($(`<td class="fila"><p class = 'animate__animated animate__lightSpeedInLeft animate__delay-3s'>${resultadoRenglon.charAt(k)}</p></td>`)); //Con animación
      concatenador="";
      diferenciador++;
      


      i_n1++;
  }


  var k=result.length-1;
  while(k>=0 && result[k]==0)
    k--;

  if(k==-1)
    return "0";

  var s="";

  while(k>=0){
    s+=(result[k--]);
  }


  var resultadoFinal=$('#resultado');
  for(var r=result.length-1;r>=0;r--){
      // resultadoFinal.append($(`<td><b>${result[r]}</b></td>`)); Sin animación
      resultadoFinal.append($(`<td><b><p class = 'animate__animated animate__bounceInDown animate__delay-5s'>${result[r]}</p></b></td>`)); //Con animación
  }

  return s;

}

function longMultiplicationNormal(n1,n2){

  var len1=n1.length;
  var len2=n2.length;

  if(len1==0 || len2==0)
    return "0";

  var result=new Array(len1+len2);

  for(var r=0; r < result.length; r++){

    result[r]=0;
  }

  var i_n1=0;
  var i_n2=0;

  var concatenador="";

  for(var i=len1-1; i>=0 ;i--){

    var carry=0;
    var num1=parseInt(n1.charAt(i),10);

    i_n2=0;

    for(var j=len2-1; j >= 0; j--){

      var num2=parseInt(n2.charAt(j),10);

      var sum=num1*num2+result[i_n1+i_n2]+carry;
      
      var auxiliar=(num1*num2)%10;
      
      contatenador=concatenador+auxiliar.toString();

      carry=parseInt(sum/10,10);

      result[i_n1+i_n2]=sum%10;

      i_n2++;
      contadorOpFB++;

    }

    if(carry>0)
      result[i_n1+i_n2]+=carry;
    i_n1++;
  }

  var k=result.length-1;
  while(k>=0 && result[k]==0)
    k--;

  if(k==-1)
    return "0";

  var s="";

  while(k>=0)
    s+=(result[k--]);

  return s;

}







//****************************************KARATSUBA ALGORITMO********************************************************
//*******************************************************************************************************************
//*******************************************************************************************************************

function karatsuba(num1, num2) {

  if (num1.length == 1 || num2.length == 1) {
      // Step 1 - base simplest case if number is between 0 to 9
      var s = multiply2(num1, num2);
      contadorOpK++;
      
      return s
  }
  
  var old1 = num1,
      old2 = num2
      
// Step 2 - calculate difference in size of numbers and pad leading zeroes to the shorter number
  var diffLen = num1.length - num2.length
  if (diffLen !== 0) {
      if (diffLen < 0) {
          diffLen = -1 * diffLen
          num1 = pad(num1, diffLen)
      } else {
          num2 = pad(num2, diffLen)
      }
  }
  
  // computation for dividing the numeric strings into smaller parts for karatsuba algorithm

// If the length of num1 or num2 is an odd number, then ensure that the length of a, c is greater than b, d
  var len = num1.length;
var mid = len >> 1
mid = len % 2 == 1 ? mid + 1 : mid;
var a = num1.slice(0, mid)
var b = trimZero(num1.slice(mid))
var c = num2.slice(0, mid)
var d = trimZero(num2.slice(mid))

// recursive divide and conquer karatsuba algorithm call
  var a_c = karatsuba(a, c);
  var b_d = karatsuba(b, d);
  var ab_cd = karatsuba(add(a, b), add(c, d));
  var diff = subtract(subtract(ab_cd, a_c), b_d);
// pad leading zeroes
  var s1 = pad(a_c,  (len-mid)*2);
  var s2 = pad(diff,  len-mid );
  var s = add(add(s1, s2), b_d);
  // Remove the zeroes padded to the string in the beginning on step 2
  if (diffLen) {
      s = s.slice(0, s.length - diffLen)
  }
 
  // console.log("karatsuba", old1, '*', old2, '=', s, s === old1 * old2 + "");
  return s; 
}

function splitNumber(str) {
// If it is odd, then we have to add 1 to ensure that the value of the first element of the returned array is greater than
     // Let's not return negative numbers in the following subtraction operation
  var len = str.length;
  var mid = len >> 1
  mid = len % 2 == 1 ? mid + 1 : mid;
  // The beginning of the second number may be zero, illegal hence slice that 
  return [str.slice(0, mid), trimZero(str.slice(mid)), len - mid]; 
}


// simple multiplication on smaller number strings that can be handled directly
function multiply2(num1, num2) {
  if ("0" === num1 || "0" === num2) {
      return "0";
  }
  if ("1" === num1) {
      return num2;
  }
  if ("1" === num2) {
      return num1;
  }
  var longNumber, shortNumber;
  if (num1.length == 1) {
      longNumber = num2;
      shortNumber = num1 * 1; 
  } else {
      longNumber = num1;
      shortNumber = num2 * 1; 
  }
  var ret = "",
      carry = 0;
  for (var i = longNumber.length - 1; i >= 0; i--) {
      var num = longNumber[i] * 1
      var temp = num * shortNumber + carry
      ret = temp % 10 + '' + ret;
      carry = Math.trunc(temp / 10);
  }
  if (carry > 0) {
      ret = carry + '' + ret;
  }
  return ret;
}

// function to pad leading zeroes in numeric strings
function pad(num, len) {
  if (num == "0") {
      return num;
  }
  for (var i = 0; i < len; i++) {
      num += "0";
  }
  return num;
}

// trim/ignore if string has a leading zero
function trimZero(str) {
  while (str[0] === '0') {
      str = str.slice(1)
  }
  return str || "0"
}

function add(num1, num2) {
// addition - check if number string is negative may not be needed if numbers are positive only
  if (num2[0] === '-') {
      return subtract(num1, num2.slice(1))
  }
  var a, b; 
  if (num1.length >= num2.length) {
      a = num1;
      b = num2;
  } else {
      a = num2;
      b = num1;
  }

  var ret = '',
      carry = 0,
      diff = a.length - b.length;
  for (var i = a.length - 1; i >= 0; i--) {
      var addend = a.charAt(i) * 1; 
      var adder = i - diff < 0 ? 0 : b.charAt(i - diff) * 1; 
      var temp = addend + adder + carry;
      ret = temp % 10 + '' + ret;
      carry = Math.trunc(temp / 10);
  }
  if (carry > 0) {
      ret = carry + '' + ret;
  }
  
  return ret;
}

function subtract(num1, num2) { 
  // subtraction - check if number string is negative may not be needed if numbers are positive only
  if (num2[0] === '-') {
      return add(num1, num2.slice(1))
  }
  if (num1[0] === '-') {
      return '-' + add(num1.slice(1), num2)
  }
  var len1 = num1.length;
  var len2 = num2.length;
  var negative = false;
 
  if (num1 == num2) {
      return "0";
  }
  var a = null, //bigNumber
      b = null; //smallNumber
 
  if (len1 > len2) {
      a = num1;
      b = num2;
  } else if (len1 < len2) {
      a = num2;
      b = num1;
      negative = true
  } else {
      for (var i = 0; i < len1; i++) {
          if (num1[i] * 1 > num2[i] * 1) {
              a = num1;
              b = num2;
              break;
          } else if (num2[i] * 1 > num1[i] * 1) {
              a = num2;
              b = num1;
              negative = true
              break;
          }
      }
  }
  var carry = 0,
      ret = '',
      diff = a.length - b.length;
  for (var i = a.length - 1; i >= 0; i--) {
      var subtrahend = a.charAt(i) * 1;
      var subtractor = i - diff < 0 ? 0 : b.charAt(i - diff) * 1;
      var temp = subtrahend - subtractor - carry;
      if (temp < 0) {
          temp += 10;
          carry = 1;
      } else {
          carry = 0;
      }
      ret = temp + '' + ret;
  }
  while (ret[0] === '0') {
      ret = ret.slice(1)
  }
  ret = trimZero(ret)
  if (negative) {
      ret = '-' + ret;
  }

  return ret
}


});