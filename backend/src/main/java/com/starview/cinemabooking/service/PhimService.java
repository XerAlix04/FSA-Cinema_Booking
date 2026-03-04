package com.starview.cinemabooking.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.starview.cinemabooking.dtos.PhimDTO;
import com.starview.cinemabooking.mapper.PhimMapper;
import com.starview.cinemabooking.repository.PhimRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhimService {
	private final PhimRepository repository;
	
	public List<PhimDTO> getActiveMovies() {
        return repository.findByIsActiveTrue()
                .stream()
                .map(PhimMapper::toDTO)
                .collect(Collectors.toList());
    }
}
