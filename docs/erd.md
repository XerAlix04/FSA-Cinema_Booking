```mermaid
erDiagram
    %% Định nghĩa các mối quan hệ
    NGUOI_DUNG ||--o{ DON_HANG : "tạo"
    KHUYEN_MAI ||--o{ DON_HANG : "trong"
    PHIM ||--o{ SUAT_CHIEU : "có"
    PHONG_CHIEU ||--o{ SUAT_CHIEU : "chứa"
    SUAT_CHIEU ||--o{ GHE_SUAT_CHIEU : "bao gồm"
    DON_HANG ||--o{ GHE_SUAT_CHIEU : "chứa"

    %% Định nghĩa chi tiết các bảng
    NGUOI_DUNG {
        int id PK
        string ho_ten
        string email
        string mat_khau
        string so_dien_thoai
        date ngay_sinh
        string vai_tro "ADMIN, STAFF, MEMBER"
        int diem_tich_luy
        int phien_ban "@Version Optimistic Lock"
    }

    PHIM {
        int id PK
        string ten_phim
        float gia_goc
        int thoi_luong_phut
        string trailer_url
        string poster_url
        float danh_gia
        string the_loai
        string mo_ta
        bool is_active
    }
    
    PHONG_CHIEU {
        int id PK
        string ten_phong
        int tong_so_ghe
        string loai_phong "2D, IMAX, VIP"
        float phu_thu
    }
    
    SUAT_CHIEU {
        int id PK
        int phim_id FK
        int phong_chieu_id FK
        datetime thoi_gian_chieu
        float he_so_gia 
    }
    
    GHE_SUAT_CHIEU {
        int id PK
        int suat_chieu_id FK
        int don_hang_id FK
        string loai_ghe "Ví dụ: Thường, VIP, Đôi"
        string trang_thai "Trống, Đang chờ, Đã bán"
        datetime thoi_gian_het_han_giu_cho
        string phien_giao_dich "Session ID"
        int phien_ban "Dùng cho Khóa lạc quan chống trùng ghế"
    }
    
    DON_HANG {
        int id PK
        int nguoi_mua_id FK
        int khuyen_mai_id FK
        string email_khach_hang
        string sdt_khach_hang
        float tong_tien
        float tong_tien_goc
        string trang_thai_thanh_toan "PENDING, SUCCESS, FAILED"
        datetime thoi_gian_tao
        string danh_sach_ghe "A1, A2, B1..."
        string danh_sach_dich_vu "Combo Solo x1, Sprite x1..."
        int tong_diem_su_dung
    }

    KHUYEN_MAI{
        int id PK
        string ma_khuyen_mai
        string loai "PERCENT hoặc FLAT"
        float gia_tri
        float max_giam_gia
        datetime ngay_het_han
        int gioi_han_su_dung
        int da_su_dung
        bool danh_cho_thanh_vien_moi
        int phien_ban "@Version"
    }

    DICH_VU_BAN_KEM{
        int id PK
        string ten_dich_vu
        int diem_doi
        string hinh_anh_url
    }