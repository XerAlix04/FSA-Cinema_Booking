package com.starview.cinemabooking.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GheSuatChieuDTO {
	private Integer id;
	
	private Integer suatChieuId;
	
	// NEW: The physical coordinates for the React CSS Grid
    private String hangNgang; 
    private Integer cotDoc;
	
	private String loaiGhe;
	
	private String trangThai;
	
	private Float giaTien;
	
	private String phienGiaoDich;
}
