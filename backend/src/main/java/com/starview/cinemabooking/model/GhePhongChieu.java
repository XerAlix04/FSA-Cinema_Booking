package com.starview.cinemabooking.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "GHE_PHONG_CHIEU")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class GhePhongChieu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	// Relationship: PHONG_CHIEU ||--o{ GHE_SUAT_CHIEU
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "phong_chieu_id", nullable = false)
	private PhongChieu phongChieu;
	
	@Column(name = "hang_ngang", length = 5, nullable = false)
	private String hangNgang; // A, B, C
	
	@Column(name = "cot_doc", nullable = false)
	private Integer cotDoc; // 1, 2, 3
	
	@Column(name = "loai_ghe", length = 50, nullable = false)
	private String loaiGhe;
	
	// Relationship: GHE_PHONG_CHIEU ||--o{ GHE_SUAT_CHIEU
	@OneToMany(mappedBy = "ghePhongChieu", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<GheSuatChieu> gheSuatChieus;
}
