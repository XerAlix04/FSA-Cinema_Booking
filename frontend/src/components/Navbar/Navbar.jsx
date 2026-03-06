import React, { useState } from 'react';
import './Navbar.css'; // Nhúng file CSS để tạo kiểu cho Navbar

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchTerm.trim()) {
        console.log("Đang tìm kiếm:", searchTerm);
        // Sau này bạn có thể thêm logic chuyển trang hoặc gọi API ở đây
        // Ví dụ: window.location.href = `/?search=${searchTerm}`;
      }
    }
  };

  return (
    // Thẻ header bao bọc toàn bộ thanh điều hướng phía trên cùng
    <header className="header-container">
      
      {/* TẦNG 1: Chứa các liên kết phụ (Tin tức, Đăng nhập...) nằm ở góc trên cùng */}
      <div className="top-nav">
        <span>TIN MỚI & ƯU ĐÃI</span> | 
        <span>VÉ CỦA TÔI</span> | 
        <span>ĐĂNG NHẬP / ĐĂNG KÝ</span>
      </div>

      {/* TẦNG 2: Chứa Logo, Menu chính và Nút mua vé */}
      <div className="main-nav">
        
        {/* Phần Logo của rạp phim */}
      <div className="navbar-left">
          <div className="logo">
          <h1>StarView<span className="star">*</span></h1>
        </div>
        
        {/* Danh sách các mục menu chính. Dùng thẻ <ul> (unordered list) là chuẩn HTML ngữ nghĩa */}
        <ul className="nav-links">
          <li className="active">PHIM</li>
          <li>RẠP STARVIEW</li>
          <li>THÀNH VIÊN</li>
          <li>CULTUREPLEX</li>
        </ul>
      </div>

       <div className="navbar-right">
         {/* Thanh tìm kiếm */}
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Tìm phim..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        
        {/* Nút kêu gọi hành động (Call to Action - CTA) để khách hàng chú ý */}
        <div className="buy-ticket-btn">
           🎟️ MUA VÉ NGAY
        </div>
       </div>

      </div>
    </header>
  );
}

export default Navbar; // Xuất component này ra để file App.jsx có thể gọi vào