```mermaid
graph TD
    subgraph Client_Layer ["Tầng Giao Diện (Client)"]
        Web[Trang Web Khách hàng]
        App[App Quét QR Nhân viên]
        Admin[Trang Quản trị Rạp]
    end

    subgraph External_Services ["Dịch vụ bên ngoài"]
        VNPay[Cổng giao dịch VNPay]
        Brevo[Dịch vụ gửi email]
        QRAPI["API tạo mã QR (api.qrserver.com)"]

    subgraph Network_Layer ["Tầng Mạng"]
        Gateway[API Gateway / Load Balancer]
    end

    subgraph Backend_Layer ["Tầng Xử Lý (Backend)"]
        AuthSvc[Authentication Service - Xác thực người dùng]
        TicketSvc[Ticket Service - Đặt vé]
        AdminSvc[Admin Service - Quản lý rạp]
        PaymentSvc[Payment Service - Thanh toán]
    end

    subgraph Data_Layer ["Tầng Dữ Liệu (Database)"]
        DB[(Cơ sở dữ liệu MySQL 8)]
    end

    %% Các luồng kết nối
    Web <-->|Request/Response JSON| Gateway
    App -->|Gửi Request| Gateway
    Admin -->|Gửi Request| Gateway
    Web -->|Redirect| VNPay
    VNPay -->|IPN Webhook| Gateway

    Gateway -->|Điều hướng| AuthSvc
    Gateway -->|Điều hướng| TicketSvc
    Gateway -->|Điều hướng| AdminSvc
    Gateway -->|Điều hướng| PaymentSvc

    AuthSvc -->|Đọc/Ghi dữ liệu| DB
    TicketSvc -->|Đọc/Ghi dữ liệu| DB
    AdminSvc -->|Đọc/Ghi dữ liệu| DB
    PaymentSvc -->|Đọc/Ghi dữ liệu| DB