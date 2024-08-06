"use strict";
if (userActive) {
  const navPage = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");
  const newContainer = document.getElementById("news-container");
  const btnPrew = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");
  let totalResults = 0;
  let keyword = "";
  function checkBtnPrev() {
    if (pageNum.textContent == 1) {
      btnPrew.style.display = "none";
    } else {
      btnPrew.style.display = "block";
    }
  }
  function checkBtnNext() {
    if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
  btnNext.addEventListener("click", function () {
    getDataNewsByKeyworks("us", ++pageNum.textContent);
  });
  btnPrew.addEventListener("click", function () {
    getDataNewsByKeyworks("us", --pageNum.textContent);
  });
  navPage.style.display = "none";
  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = "1";
    newContainer.innerHTML = "";
    if (inputQuery.value.trim().length === 0) {
      navPage.style.display = "none";
      alert("Vui long nhap key tim kiem");
    } else {
      keyword = inputQuery.value;
      getDataNewsByKeyworks(keyword, 1);
    }
  });
  async function getDataNewsByKeyworks(keyword, page) {
    try {
      // Kết nối API lấy dữ liệu
      const res = await fetch(
        // Tham khảo tại trang https://newsapi.org/docs/endpoints/sources
        // key API phải đăng kí để lấy 1 ngày chỉ đăng nhập đươc 100 lần
        `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${userActive.pageSize}&page=${page}&apiKey=a806ca6e1c5f409396eee65e0c33ab99`
      );
      const data = await res.json();
      // Kiểm tra lỗi 100 lần request
      if (data.status === "error" && data.code === "rateLimited") {
        navPage.style.display = "none";
        throw new Error(data.message);
      }
      // chạy từ tập tin không thoogn qua live server
      if (data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }
      navPage.style.display = "block";
      // Gọi hàm hiển thị list News
      displayNewList(data);
      console.log(data);
    } catch (err) {
      alert("Error" + err.message);
    }
  }
  function displayNewList(data) {
    totalResults = data.totalResults;
    checkBtnPrev();
    checkBtnNext();
    let html = "";
    data.articles.forEach(function (article) {
      html += `
      <div class="card flex-row flex-wrap">
                      <div class="card mb-3" style="">
                          <div class="row no-gutters">
                              <div class="col-md-4">
                                  <img src=${article.urlToImage} class="card-img" alt="MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips - TechCrunch">
                              </div>
                              <div class="col-md-8">
                                  <div class="card-body">
                                      <h5 class="card-title">${article.title}</h5>
                                      <p class="card-text">${article.description}</p>
                                      <a href=${article.url} class="btn btn-primary">View</a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
      `;
    });
    newContainer.innerHTML = html;
  }
}else {
    alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng");
    window.location.assign("../index.html");
  }
