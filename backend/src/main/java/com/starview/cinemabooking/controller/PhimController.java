package com.starview.cinemabooking.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.starview.cinemabooking.dtos.PhimDTO;
import com.starview.cinemabooking.service.PhimService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/phim")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PhimController {
	private final PhimService phimService;
	
	@GetMapping
	public List<PhimDTO> getPhimDangChieu(){
		return phimService.getActiveMovies();
	}
}
