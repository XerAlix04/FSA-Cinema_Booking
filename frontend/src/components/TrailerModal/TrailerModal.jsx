import React from 'react';
import './TrailerModal.css';

function TrailerModal({ trailerUrl, onClose }) {
  // Hàm để lấy ID video YouTube từ các định dạng URL khác nhau
  const getYouTubeId = (url) => {
    let ID = '';
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'youtu.be') {
        ID = urlObj.pathname.slice(1);
      } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
        ID = urlObj.searchParams.get('v');
      }
    } catch (error) {
      console.error("Invalid URL for trailer:", url);
      return null;
    }
    return ID;
  };

  const videoId = getYouTubeId(trailerUrl);
  // Thêm ?autoplay=1 để video tự chạy khi modal mở ra
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  // Ngăn việc click vào nội dung modal làm đóng modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Lớp phủ nền tối, click vào sẽ đóng modal
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        {videoId ? (
          <iframe
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Không thể tải trailer.</p>
        )}
      </div>
    </div>
  );
}

export default TrailerModal;
