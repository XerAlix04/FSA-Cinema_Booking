import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Ticket from '../Ticket/Ticket';
import './Payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Lấy dữ liệu từ SeatSelection truyền sang
  const { 
    movie, 
    cinemaName, 
    formattedDate, 
    showtime, 
    selectedSeats, 
    totalPrice 
  } = location.state || {};

  // State cho Form thông tin khách hàng và thẻ tín dụng
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  // Nếu người dùng vào thẳng link /payment mà không qua chọn ghế -> back về trang chủ
  if (!movie || !selectedSeats) {
    return (
      <div className="payment-container" style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Không tìm thấy thông tin đơn hàng</h2>
        <button className="btn-pay" style={{width: '200px'}} onClick={() => navigate('/')}>Về trang chủ</button>
      </div>
    );
  }

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Giả lập thời gian gọi API thanh toán (2 giây)
    setTimeout(() => {
      setIsProcessing(false);
      // Tạo một mã đặt chỗ ngẫu nhiên (VD: X7B9K2)
      const bookingRef = Math.random().toString(36).substring(2, 8).toUpperCase();

      // --- CHUẨN BỊ DỮ LIỆU GỬI EMAIL ---
      // 1. Tạo link QR code
      const qrData = `REF:${bookingRef}|MOVIE:${movie.tenPhim}|SEATS:${selectedSeats.join(',')}`;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&color=000000&bgcolor=ffffff`;
      
      // 2. Gom dữ liệu vé
      const emailPayload = {
        to_email: email,
        customer_phone: phone,
        movie_name: movie.tenPhim,
        showtime: `${showtime} - ${formattedDate}`,
        seats: selectedSeats.join(', '),
        total_price: `$${totalPrice}`,
        booking_ref: bookingRef,
        qr_image_link: qrUrl // Có thể nhúng trực tiếp link này vào thẻ <img> trong template email
      };
      console.log("Sẵn sàng gửi email vé tới:", email, emailPayload);
      
      //ta lưu dữ liệu và bật Popup
      setTicketData({
        movie, cinemaName, formattedDate, showtime, selectedSeats, totalPrice, bookingRef, customerInfo: { email, phone }
      });
      setShowTicket(true);
    }, 2000);
  };

  return (
    <div className="payment-container">
      {/* Nút Back */}
      <div className="back-nav" onClick={() => navigate(-1)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Quay lại</span>
      </div>

      <div className="payment-content">
        {/* CỘT TRÁI: FORM THANH TOÁN */}
        <div className="payment-form-section">
          <h2>Thanh Toán</h2>
          <p className="payment-subtitle">Nhập thông tin thẻ tín dụng để hoàn tất đặt vé</p>
          
          <form className="payment-form" onSubmit={handlePayment}>
            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '15px', marginTop: '0' }}>1. Thông tin liên hệ</h4>
            <div className="form-group">
              <label>Email nhận vé</label>
              <input 
                type="email" placeholder="example@gmail.com" required 
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input 
                type="tel" placeholder="" required maxLength="10"
                value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              />
            </div>

            <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '15px', marginTop: '30px' }}>2. Thông tin thẻ</h4>
            <div className="form-group">
              <label>Số thẻ tín dụng</label>
              <input 
                type="text" placeholder="0000 0000 0000 0000" maxLength="16" required 
                value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Ngày hết hạn (MM/YY)</label>
                <input 
                  type="text" placeholder="MM/YY" maxLength="5" required 
                  value={expiry}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '');
                    if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2);
                    setExpiry(val);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Mã bảo mật (CVV)</label>
                <input 
                  type="password" placeholder="123" maxLength="3" required 
                  value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                />
              </div>
            </div>

            {/* Nút thanh toán sẽ disable nếu chưa nhập đủ chuẩn form hoặc đang quay loading */}
            <button type="submit" className="btn-pay" disabled={isProcessing || !email || phone.length < 10 || cardNumber.length < 16 || expiry.length < 5 || cvv.length < 3}>
              {isProcessing ? 'Đang xử lý giao dịch...' : `Thanh toán ${totalPrice?.toLocaleString('vi-VN')} ₫`}
            </button>
          </form>
        </div>

        {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG  */}
        <div className="payment-summary-section">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-details">
              <p><span>Movie</span>{movie.tenPhim}</p>
              <p><span>Cinema</span>{cinemaName}</p>
              <p><span>Date & Time</span>{formattedDate}, {showtime}</p>
              <div>
                <span>Seats Selected ({selectedSeats.length})</span>
                <div className="selected-seats-list">
                  {selectedSeats.map(seat => <span key={seat} className="seat-pill">{seat}</span>)}
                </div>
              </div>
            </div>
            <div className="total-price">
              <span>Total Price</span>
              <span>{totalPrice?.toLocaleString('vi-VN')} ₫</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hiển thị Ticket dưới dạng Popup khi showTicket là true */}
      {showTicket && (
        <Ticket 
          ticketData={ticketData} 
          onClose={() => navigate('/')} 
        />
      )}
    </div>
  );
}

export default Payment;