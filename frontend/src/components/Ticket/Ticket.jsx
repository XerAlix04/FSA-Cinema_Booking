import React from 'react';
import './Ticket.css';

// Nhận dữ liệu trực tiếp qua props thay vì qua Router location
function Ticket({ ticketData, onClose }) {
  // Kiểm tra dữ liệu an toàn
  const { 
    movie, cinemaName, formattedDate, showtime, selectedSeats, totalPrice, bookingRef, customerInfo 
  } = ticketData || {};

  // Nếu không có dữ liệu (trường hợp lỗi)
  if (!movie || !bookingRef) {
    return (
      <div className="ticket-container error-state">
        <div className="ticket-wrapper" style={{padding: '40px', textAlign: 'center'}}>
          <h2>Không tìm thấy thông tin vé!</h2>
          <button className="btn-home" style={{marginTop: '20px'}} onClick={onClose}>Đóng</button>
        </div>
      </div>
    );
  }

  // Dữ liệu được mã hoá vào QR Code
  const qrData = `REF:${bookingRef}|MOVIE:${movie.tenPhim}|SEATS:${selectedSeats.join(',')}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&color=000000&bgcolor=ffffff`;

  return (
    <div className="ticket-container">
      <div className="ticket-wrapper">
        
        <div className="ticket-info-section">
          <div className="ticket-header">
            <h3>Thanh toán thành công! 🎉</h3>
            <p>Mã đặt vé của bạn là: <span className="booking-ref">{bookingRef}</span></p>
          </div>
          
          <div className="ticket-details">
            <h2 className="movie-title">{movie.tenPhim}</h2>
            <p className="detail-item"><span>Rạp chiếu:</span> {cinemaName}</p>
            <p className="detail-item"><span>Suất chiếu:</span> <strong>{showtime}</strong> | {formattedDate}</p>
            <p className="detail-item"><span>Ghế ngồi:</span> <span className="seats-highlight">{selectedSeats.join(', ')}</span></p>
            <p className="detail-item"><span>Tổng thanh toán:</span> {totalPrice?.toLocaleString('vi-VN')} ₫</p>
            {customerInfo && (
              <p className="detail-item" style={{ marginTop: '20px', fontSize: '0.95rem', borderTop: '1px dashed #eee', paddingTop: '15px' }}><span>Khách hàng:</span> {customerInfo.email} - {customerInfo.phone}</p>
            )}
          </div>
        </div>

        <div className="ticket-qr-section">
          <img src={qrUrl} alt="QR Code Ticket" className="qr-image" />
          <p className="qr-instruction">Vui lòng xuất trình mã QR này<br/>cho nhân viên soát vé tại rạp.</p>
        </div>

      </div>
      <button className="btn-home" onClick={onClose}>Về trang chủ</button>
    </div>
  );
}

export default Ticket;