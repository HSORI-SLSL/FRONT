import React from 'react';
import './sidebars.css';

function Sidebar () {
  return (
    <div className="App">
      <div class="d-flex flex-column align-items-stretch flex-shrink-0" style={ { width : '250px', backgroundImage : "url(/hi.png"}}>
        {/* 홈 */}
        <div> 
          <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
            </svg>
          </a>
        </div>
        {/* 사용자 */}
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" style={ { marginTop : '10px', marginLeft : '85px'} }>
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        <div> 사용자 </div>
        
        {/* 채팅 목록 부분 */}
        <span class="fs-5 fw-semibold" style={ { marginTop : '90px' } }>
        채팅 목록
        </span>
        {/* 채팅 list group */}
        <div class="list-group list-group-flush border-bottom scrollarea">
          <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1"> 세종대왕 </strong>
              <small>Wed</small>
              </div>
              <div class="col-10 mb-1 small">안녕하세요.</div>
          </a>
          <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">태종</strong>
              <small class="text-muted">Tues</small>
            </div>
            <div class="col-10 mb-1 small">안녕하세요</div>
          </a>
          <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">세종대왕</strong>
              <small class="text-muted">Mon</small>
            </div>
            <div class="col-10 mb-1 small">안녕하세요</div>
          </a>
        </div>
  
        {/* 로그아웃 버튼 */}
        <button type="button" class="btn btn-light" style={ { marginTop : '200px' } }>
          {/* 맥북 = 200 
          윈도우 = 160 */}
          로그아웃
        </button>
      </div>
    </div>
  )
}

// /* global bootstrap: false */
// (function () {
//   'use strict'
//   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//   tooltipTriggerList.forEach(function (tooltipTriggerEl) {
//     new bootstrap.Tooltip(tooltipTriggerEl)
//   })
// })()


export default Sidebar;