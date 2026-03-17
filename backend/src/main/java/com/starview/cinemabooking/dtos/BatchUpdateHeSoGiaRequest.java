package com.starview.cinemabooking.dtos;

import java.util.List;

import lombok.Data;

@Data
public class BatchUpdateHeSoGiaRequest {
	private List<Integer> suatChieuIds;
	private Float heSoGia;
}
