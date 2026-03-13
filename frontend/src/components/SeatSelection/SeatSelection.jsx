import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import './SeatSelection.css';
import Seat from './Seat'; // Import component Seat mới

// Mock data to simulate backend response
const initialRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const initialColumns = Array.from({ length: 18 }, (_, i) => i + 1);
// TODO: This should be fetched from an API based on the showtime
const initialSoldSeats = ['D5', 'D6', 'D7', 'D8', 'F12', 'F13'];

// Define seat price
const SEAT_PRICE = 7; 

function SeatSelection() {
  const { id } = useParams(); // Get movie ID from URL
  const [searchParams] = useSearchParams(); // Get query params
  const navigate = useNavigate(); // Hook dùng để điều hướng

  // Extract data from URL
  const cinemaName = searchParams.get('cinema');
  const showtime = searchParams.get('time');
  const showdate = searchParams.get('date'); // e.g., "2024-05-26"

  const [movie, setMovie] = useState(null); // State for movie details
  const [soldSeats] = useState(initialSoldSeats); // TODO: Fetch this from API
  const [selectedSeats, setSelectedSeats] = useState([]); // Start with no seats selected

  // Fetch movie details when component mounts
  useEffect(() => {
    // This is the same fetch as in MovieShowtime
    fetch(`http://localhost:8080/api/v1/phim/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Không tìm thấy phim");
        return res.json();
      })
      .then(data => setMovie(data))
      .catch(err => console.error("Lỗi tải phim:", err));
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (soldSeats.includes(seatId)) return; // Cannot select sold seats

    setSelectedSeats(currentSelected =>
      currentSelected.includes(seatId)
        ? currentSelected.filter(id => id !== seatId)
        : [...currentSelected, seatId]
    );
  };
  
  const totalPrice = useMemo(() => {
    return (selectedSeats.length * SEAT_PRICE).toFixed(2);
  }, [selectedSeats]);

  // Format date for display
  const formattedDate = useMemo(() => {
    if (!showdate) return '';
    const date = new Date(showdate);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }, [showdate]);

  // Loading state
  if (!movie || !cinemaName || !showtime) {
    return <div className="seat-selection-container" style={{textAlign: 'center', padding: '100px'}}>Đang tải dữ liệu suất chiếu...</div>;
  }

  return (
    <div className="seat-selection-container">
      {/* Nút Back Navigation */}
      <div className="back-nav" onClick={() => navigate(-1)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Quay lại</span>
      </div>

      <div className="seat-header">
        <h2>{movie.tenPhim}</h2>
        <p>📍 {cinemaName}</p>
      </div>

      <div className="seat-main-layout">
        
        {/* LEFT PANEL: Show information */}
        <div className="left-panel">
          <div className="filter-group">
            <label>Date</label>
            <div className="date-picker">{formattedDate} 📅</div>
          </div>
          <div className="filter-group">
            <label>Time</label>
            <div className="time-grid">
              {/* Display the selected time as active */}
              <button className={`time-btn active`}>{showtime}</button>
            </div>
          </div>
        </div>

        {/* CENTER PANEL: Seat Map */}
        <div className="center-panel">
          <div className="screen-area">
            <div className="screen-curve"></div>
            <div className="screen-text">SCREEN</div>
          </div>

          <div className="seat-grid-wrapper">
            {initialRows.map(row => (
              <div key={row} className="seat-row">
                <span className="row-label">{row}</span>
                <div className="seats">
                  {initialColumns.map(col => {
                    const seatId = `${row}${col}`;
                    const isSold = soldSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    const isAisle = col === 4 || col === 14;

                    return (
                      <React.Fragment key={seatId}>
                        <Seat 
                          seatId={seatId}
                          isSold={isSold}
                          isSelected={isSelected}
                          onClick={handleSeatClick}
                        />
                        {isAisle && <div className="aisle-gap"></div>}
                      </React.Fragment>
                    );
                  })}
                </div>
                <span className="row-label">{row}</span>
              </div>
            ))}
          </div>

          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-seat-wrapper"><Seat isSold={false} isSelected={false} /></div> Available
            </div>
            <div className="legend-item">
              <div className="legend-seat-wrapper"><Seat isSold={false} isSelected={true} /></div> Selected
            </div>
            <div className="legend-item">
              <div className="legend-seat-wrapper"><Seat isSold={true} isSelected={false} /></div> Sold
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Order Summary */}
        <div className="right-panel">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-details">
              <p><span>Movie</span>{movie.tenPhim}</p>
              <p><span>Date & Time</span>{formattedDate}, {showtime}</p>
              
              <div>
                <span>Seats Selected ({selectedSeats.length})</span>
                <div className="selected-seats-list">
                  {selectedSeats.length > 0 
                    ? selectedSeats.map(seat => <span key={seat} className="seat-pill">{seat}</span>) 
                    : <span style={{color: '#888', fontSize: '0.9rem'}}>No seats selected</span>}
                </div>
              </div>
            </div>
            
            <div className="total-price">
              <span>Total Price</span>
              <span>${totalPrice}</span>
            </div>
            
            <button 
              className="btn-proceed" 
              disabled={selectedSeats.length === 0}
              onClick={() => navigate('/payment', {
                state: {
                  movie,
                  cinemaName,
                  formattedDate,
                  showtime,
                  selectedSeats,
                  totalPrice
                }
              })}
            >
              Proceed to Payment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SeatSelection;