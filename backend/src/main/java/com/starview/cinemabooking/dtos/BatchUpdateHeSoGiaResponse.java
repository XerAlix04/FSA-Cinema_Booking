package com.starview.cinemabooking.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BatchUpdateHeSoGiaResponse {
	private String message;
	private int soLuongCapNhat;
	private Float heSoGiaMoi;
	private List<Integer> suatChieuIds;
}
