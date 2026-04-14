```mermaid
classDiagram
    %% ==========================================
    %% 1. CÁC LỚP THỰC THỂ (ENTITIES / MODELS)
    %% ==========================================
    class NguoiDung {
        -int id
        -String email
        -String matKhau
        -String sdt
        -String vaiTro
        -int diemTichLuy
    }

    class Phim {
        -int id
        -String tenPhim
        -float giaGoc
        -int thoiLuongPhut
        -string trailerUrl
        -string posterUrl
        -float danhGia
        -string theLoai
        -string moTa
        -bool isActive
    }

    class PhongChieu {
        -int id
        -String tenPhong
        -int tongSoGhe
        -String loaiPhong
        -float phuThu
    }

    class SuatChieu {
        -int id
        -int phimId
        -int phongChieuId
        -DateTime thoiGianChieu
        -float heSoGia
    }

    class GheSuatChieu {
        -int id
        -int suatChieuId
        -int donHangId
        -String loaiGhe
        -String trangThai
        -DateTime thoiGianHetHanGiuCho
        -String phienGiaoDich
        -int phienBan
        +calculatePrice() float
    }

    class DonHang {
        -int id
        -int nguoiMuaId
        -int khuyenMaiId
        -String email_nguoi_mua
        -String sdt_nguoi_mua
        -float tongTien
        -float tongTienGoc
        -String trangThaiThanhToan
        -DateTime thoiGianTao
        -String danhSachGhe
        -String danhSachDichVu
        -int tongDiemDichVu
    }

    class KhuyenMai {
        -int id
        -String maKhuyenMai
        -String loai
        -float giaTri
        -float maxGiamGia
        -DateTime ngayHetHan
        -int gioiHanSuDung
        -int daSuDung
        -boolean danhChoThanhVienMoi
    }

    class DichVuBanKem {
        -int id
        -String tenDichVu
        -int diemDoi
        -String hinhAnhUrl
    }

    %% ==========================================
    %% 2. LỚP XỬ LÝ NGHIỆP VỤ (SERVICE LAYER)
    %% ==========================================
    class AdminService {
        +createStaff(NguoiDungDTO) void
    }
    class EmailService {
        +sendTicketEmail(EmailTicketRequest) 
    }

    class TicketService {
        +lockGheSuatChieu(seatId, sessionId) void
        +unlockGheSuatChieu(seatId, sessionId) void
        +createPendingOrder(CheckoutRequest) DonHang
        +finalizeOrderSuccess(orderId) void
        +finalizeOrderFailed(orderId) void
        +cancelAbandonedButKeepSeats(orderId, sessionId) void
        +moGheHetHan() void
    }
    class PhimService {
        +getActiveMovies() List<PhimDTO>
        +searchActiveMovies(String keyword) List<PhimDTO>
        +searchMoviesStaff(name, category) List<PhimDTO>
        +createMovie(PhimDTO) PhimDTO
        +updateMovie(id, phimDTO) PhimDTO
        +disableMovie(id) void
        +deleteMovie(id) void
        +restoreMovie(id) void
    }
    class SuatChieuService {
        +createSuatChieuWithSeats(CreateSuatChieuRequest) SuatChieuCreateResponse
        +getMovieShowtimesByDate(phimId, date) MovieShowtimesByDateResponse
        +batchUpdateHeSoGia(List<Integer> suatchieuIds, float newHeSoGia) void
    }
    class KhuyenMaiService {
        +applyVoucher(voucherCode, originalPrice) VoucherApplyResult
        +previewVoucher(voucherCode, originalPrice) VoucherApplyResult
        +calculateDiscountAmount(KhuyenMai, originalPrice)
    }
    class VNPayService {
        +createPaymentUrl(long amount, String orderInfo, String orderId, DateTime expireDate, HttpServletRequest) String
        +verifySignature(vnp_SecureHash, vnpSecureHashType) bool
    }

    %% ==========================================
    %% 3. CONTROLLERS
    %% ==========================================
    class AdminController
    class AuthController
    class PhimController
    class SuatChieuController
    class TicketController
    class KhuyenMaiController
    class VNPayController

    %% ==========================================
    %% 4. CÁC MỐI QUAN HỆ (RELATIONSHIPS)
    %% ==========================================
    
    %% --- Quan Hệ Dữ Liệu (Entities) ---
    PhongChieu "1" *-- "*" SuatChieu : chứa
    Phim "1" *-- "*" SuatChieu : chiếu
    SuatChieu "1" *-- "*" GheSuatChieu : bao gồm
    NguoiDung "1" o-- "*" DonHang : đặt
    DonHang "1" o-- "*" GheSuatChieu : giữ chỗ
    KhuyenMai "1" o-- "*" DonHang : áp dụng cho

    %% --- Luồng Controller gọi Service ---
    AdminController --> AdminService : gọi
    PhimController --> PhimService : gọi
    SuatChieuController --> SuatChieuService : gọi
    KhuyenMaiController --> KhuyenMaiService : gọi
    TicketController --> TicketService : xử lý đặt vé
    TicketController --> VNPayService : tạo url thanh toán
    TicketController --> EmailService : gửi email

    %% --- Giao tiếp giữa các Service ---
    TicketService --> KhuyenMaiService : xác minh voucher
    TicketService --> EmailService : kích hoạt gửi email async

    %% --- Service tương tác với Entity (Dependencies) ---
    TicketService ..> DonHang : CRUD
    TicketService ..> GheSuatChieu : mở/khóa ghế
    SuatChieuService ..> SuatChieu : đặt lịch suất chiếu
    SuatChieuService ..> GheSuatChieu : tạo layout ghế
    PhimService ..> Phim : CRUD
    KhuyenMaiService ..> KhuyenMai : xác minh/update
    AdminService ..> NguoiDung : tạo tài khoản staff