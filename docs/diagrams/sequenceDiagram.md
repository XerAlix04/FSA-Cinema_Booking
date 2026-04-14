```mermaid
sequenceDiagram
    autonumber
    actor User
    participant React as Frontend (React)
    participant Ctrl as TicketController
    participant T_Svc as TicketService
    participant V_Svc as KhuyenMaiService
    participant DB as MySQL Database
    participant VNPay as VNPay Sandbox

    User->>React: Selects Seats & Applies "WELCOME" Voucher
    React->>V_Svc: POST /vouchers/preview
    V_Svc-->>React: 200 OK (Calculates discount, no DB mutation)
    
    User->>React: Clicks "Thanh toán VNPay"
    React->>Ctrl: POST /bookings/checkout
    
    rect rgb(50, 50, 50)
    Note right of Ctrl: Backend Safeguard (Cancel Lingering Orders)
    Ctrl->>T_Svc: createPendingOrder()
    T_Svc->>DB: Check for existing PENDING orders for these seats
    alt Has abandoned PENDING order
        T_Svc->>DB: Mark old order FAILED & flush()
    end
    end

    T_Svc->>V_Svc: applyVoucher() (Validates against DB)
    T_Svc->>DB: Save new DonHang (Status: PENDING)
    T_Svc-->>React: Return VNPay Payment URL
    React->>VNPay: Redirect User to VNPay
    
    alt Scenario A: User Abandons (Clicks Browser Back Button)
        User->>React: Browser Back (URL has no VNPay params)
        React->>React: useEffect detects Retreat
        React->>Ctrl: POST /bookings/cancel-abandoned
        Ctrl->>T_Svc: cancelAbandonedButKeepSeats()
        T_Svc->>DB: Mark Order FAILED (Unlocks Voucher)
        T_Svc->>DB: Reset 5-min lock on Seats (DANG_CHO)
        T_Svc-->>React: 200 OK
        React-->>User: Displays "Thanh toán lại" UI (Seats & Voucher intact)
    else Scenario B: User Pays Successfully
        User->>VNPay: Completes Payment
        VNPay->>Ctrl: IPN Webhook (vnp_ResponseCode=00)
        Ctrl->>T_Svc: finalizeOrderSuccess()
        T_Svc->>DB: Mark Order SUCCESS
        T_Svc->>DB: Update KhuyenMai (da_su_dung + 1)
        T_Svc->>DB: Update NguoiDung (add loyalty points)
        T_Svc->>DB: Update GheSuatChieu (DA_BAN)
        T_Svc-->>VNPay: 200 OK (Acknowledge Webhook)
    end