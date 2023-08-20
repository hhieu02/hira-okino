(function() {
    function copyToClipboard(text) {
      var el = document.createElement("input");
      el.type = "text";
      el.value = text;
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand("Copy");
      document.body.removeChild(el);
    }
    function run() {
      var url = window.location.href.split("?")[0];
      var filename = url.split("/")[url.split("/").length - 1];
      var id = filename.split("_")[1];
      if (!id) {
        alert("Bạn chỉ có thể sao chép biểu tượng SVG khi đang xem một biểu tượng.");
        return 0;
      }
      var loggedIn = document.getElementById("gr_connected");
      if (!loggedIn) {
        alert("Vui lòng đăng nhập trước khi nhấp vào đây.");
        return;
      }
      fetch("https://www.flaticon.com/editor/icon/svg/" + id + "?type=standard")
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          fetch(data.url)
            .then(function(response2) {
              return response2.text();
            })
            .then(function(html) {
              copyToClipboard(html);
              alert("copied SVG icon");
            })
            .catch(function(e) {
              alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
            });
        })
        .catch(function(error) {
          alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
        });
    }
    run();
  })();