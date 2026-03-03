package com.starview.cinemabooking.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PHIM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Phim {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ten_phim", nullable = false)
    private String tenPhim;

    @Column(name = "gia_goc", nullable = false)
    private Float giaGoc;

    @Column(name = "thoi_luong_phut", nullable = false)
    private Integer thoiLuongPhut;

    // Relationship: PHIM ||--o{ SUAT_CHIEU : "có"
    @OneToMany(mappedBy = "phim", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SuatChieu> suatChieus;
}
