package com.hotel.booking.services;

import com.hotel.booking.exceptions.UserNotFoundException;
import com.hotel.booking.models.dtos.request.RegisterLogin;
import com.hotel.booking.models.entities.User;
import com.hotel.booking.respositories.UserRepository;
import com.hotel.booking.services.impl.CrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements CrudService<User> {

    private final UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).
                orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public User update(User user) {
        return null;
    }

}
