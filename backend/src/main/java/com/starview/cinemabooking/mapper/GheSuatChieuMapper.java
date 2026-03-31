package com.starview.cinemabooking.mapper;

import com.starview.cinemabooking.dtos.GheSuatChieuDTO;
import com.starview.cinemabooking.model.GheSuatChieu;

public class GheSuatChieuMapper {
	public static GheSuatChieuDTO toDto(GheSuatChieu gheSuatChieu) {
		if(gheSuatChieu == null) {
			return null;
		}
		
		GheSuatChieuDTO dto = new GheSuatChieuDTO();
        dto.setId(gheSuatChieu.getId());
        
        // THE FIX: Reach into GhePhongChieu to get the permanent data
        if (gheSuatChieu.getGhePhongChieu() != null) {
            dto.setLoaiGhe(gheSuatChieu.getGhePhongChieu().getLoaiGhe());
            dto.setHangNgang(gheSuatChieu.getGhePhongChieu().getHangNgang());
            dto.setCotDoc(gheSuatChieu.getGhePhongChieu().getCotDoc());
        }
        
        dto.setTrangThai(gheSuatChieu.getTrangThai());
        dto.setGiaTien(gheSuatChieu.calculatePrice());
        dto.setPhienGiaoDich(gheSuatChieu.getPhienGiaoDich());
        
        // Safely extract the ID from the related SuatChieu object
        if (gheSuatChieu.getSuatChieu() != null) {
            dto.setSuatChieuId(gheSuatChieu.getSuatChieu().getId());
        }
        
        return dto;
	}
	
	
}
