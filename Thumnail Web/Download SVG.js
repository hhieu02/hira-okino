(function() {
  var url = window.location.href.split("?")[0];
  var filename = url.split("/").pop();
  var iconId = filename.split("_")[1];
  var iconName = filename.split("_")[0];
  
  if (!iconId) {
    alert("Bạn chỉ có thể tải xuống biểu tượng SVG khi đang xem một biểu tượng.");
    return;
  }
  
  var loggedIn = document.getElementById("gr_connected");
  if (!loggedIn) {
    alert("Vui lòng đăng nhập trước khi nhấp vào đây.");
    return;
  }
  
  fetch(`https://www.flaticon.com/editor/icon/svg/${iconId}?type=standard`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      downloadURI(data.url, `${iconName}.svg`);
    })
    .catch(function(error) {
      alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
    });
    
  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.setAttribute("download", name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
})();