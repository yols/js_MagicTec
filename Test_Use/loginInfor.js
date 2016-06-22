

$(function() {
      var Data
       $.post('../index.php?c=member&m=getUserInfo',Data, test,'json');
       $.post('../index.php?c=member&m=getUserCashInfo',Data, test2,'json');
    });
function test(data){
  console.log(data.status);
  if(data.status === 300){
    window.location.assign("../index.html");
  }
  else{
    var tmp = document.getElementById('dfs');
    $(tmp).text(data.msg);
    console.log(data.msg);
  }
}


function test2(data){
  console.log(data.status);
  if(data.status === 300){
    window.location.assign("../index.html");
  }
  else{
    var tmp = document.getElementById('dfs');
    $(tmp).text(data.msg);
    console.log(data);
  }
}
