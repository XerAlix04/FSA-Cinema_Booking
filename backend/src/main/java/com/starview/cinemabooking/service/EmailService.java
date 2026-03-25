package com.starview.cinemabooking.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.starview.cinemabooking.dtos.EmailTicketRequest;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async // Gửi email chạy ngầm, không block UI của user
    public void sendTicketEmail(EmailTicketRequest request) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(request.getTo_email());
            helper.setSubject("🎟️ Vé Xem Phim Của Bạn: " + request.getMovie_name());

            // Tạo HTML Template nhúng thẳng link QR Code từ Frontend
            String htmlMsg = "<div style='font-family: Arial, sans-serif; padding: 20px; text-align: center;'>"
                    + "<h2>Thanh toán thành công!</h2>"
                    + "<p>Mã đặt chỗ: <strong>" + request.getBooking_ref() + "</strong></p>"
                    + "<hr/>"
                    + "<h3>" + request.getMovie_name() + "</h3>"
                    + "<p><strong>Suất chiếu:</strong> " + request.getShowtime() + "</p>"
                    + "<p><strong>Ghế:</strong> " + request.getSeats() + "</p>"
                    + "<p><strong>Tổng tiền:</strong> " + request.getTotal_price() + "</p>"
                    + "<br/>"
                    + "<img src='" + request.getQr_image_link() + "' alt='QR Code' width='200' height='200'/>"
                    + "<p>Vui lòng xuất trình mã QR này tại rạp StarView Cinemas.</p>"
                    + "</div>";

            helper.setText(htmlMsg, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            System.err.println("Lỗi gửi email: " + e.getMessage());
        }
    }
}
