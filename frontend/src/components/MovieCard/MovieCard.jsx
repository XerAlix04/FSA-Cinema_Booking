import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';
import TrailerModal from '../TrailerModal/TrailerModal'; // Import component vừa tạo


function MovieCard({ movie }) {
   const [isTrailerVisible, setIsTrailerVisible] = useState(false);
   const navigate = useNavigate();

  // Hàm để mở modal trailer
  const handlePlayTrailer = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click vào card (nếu có)
    setIsTrailerVisible(true);
  };
  return (
    <>
    <div className="movie-card">
         <div className="poster-container">
          <img
            src={movie.posterUrl}
            alt={movie.tenPhim}
            className="movie-poster"
          />
          {/* Lớp phủ chứa nút Play, chỉ hiện khi hover */}
          <div className="play-overlay" onClick={handlePlayTrailer}>
            <svg className="play-icon" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      <div className="movie-info">
        <h3>{movie.tenPhim}</h3>
        <p><strong>Thể loại:</strong> {movie.theLoai}</p>
        <p><strong>Thời lượng:</strong> {movie.thoiLuongPhut} phút</p>
        <p><strong>Đánh giá:</strong> ⭐ {movie.danhGia}</p>
        <p className="price">{movie.giaGoc.toLocaleString('vi-VN')} VNĐ</p>
        
        {/* Bắt sự kiện click để chuyển sang trang chi tiết/đặt vé */}
        <button className="book-btn" onClick={() => navigate(`/phim/${movie.id}`)}>
          Mua Vé
        </button>
      </div>
    </div>
      {/* Render Modal nếu isTrailerVisible là true */}
      {isTrailerVisible && (
        <TrailerModal
          trailerUrl={movie.trailerUrl}
          onClose={() => setIsTrailerVisible(false)}
        />
      )}
      </>
  );
}
export default MovieCard;