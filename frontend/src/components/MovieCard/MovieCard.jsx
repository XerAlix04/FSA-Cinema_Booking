import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.tenPhim} className="movie-poster" />
      <div className="movie-info">
        <h3>{movie.tenPhim}</h3>
        <p><strong>Thể loại:</strong> {movie.theLoai}</p>
        <p><strong>Thời lượng:</strong> {movie.thoiLuongPhut} phút</p>
        <p><strong>Đánh giá:</strong> ⭐ {movie.danhGia}</p>
        <p className="price">{movie.giaGoc.toLocaleString('vi-VN')} VNĐ</p>
        <button className="book-btn">Mua Vé</button>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    posterUrl: PropTypes.string.isRequired,
    tenPhim: PropTypes.string.isRequired,
    theLoai: PropTypes.string.isRequired,
    thoiLuongPhut: PropTypes.number.isRequired,
    danhGia: PropTypes.number.isRequired,
    giaGoc: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;