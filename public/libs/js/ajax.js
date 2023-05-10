
function get_news(i){
  var article_url = $(`#news_url_${i}`).text();
  
  $.ajax({
    type: 'POST',
    url: 'full_news',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({link: article_url}),
  success:function(res){
      $(`#modal_content_${i}`).append(`<p>${res}</p>`);
  },
  error:function(){console.log("error");}
});

}
