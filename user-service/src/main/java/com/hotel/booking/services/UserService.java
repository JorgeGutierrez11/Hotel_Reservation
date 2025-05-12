package com.hotel.booking.services;

import com.hotel.booking.exceptions.UserNotFoundException;
import com.hotel.booking.models.dtos.request.UserRequest;
import com.hotel.booking.models.entities.User;
import com.hotel.booking.models.enums.Role;
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

    public User save(UserRequest user) {
        User u = User.builder()
                .name(user.getName())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .typeDocument(user.getTypeDocument())
                .numberDocument(user.getNumberDocument())
                .phoneNumber(user.getPhoneNumber())
                .password(user.getPassword())
                .role(user.getRole())
                .build();

        return this.save(u);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUser(UserRequest user) {
        User u = this.findUserByEmail(user.getEmail());
        u.setName(user.getName());
        u.setLastname(user.getLastname());
        u.setEmail(user.getEmail());
        u.setTypeDocument(user.getTypeDocument());
        u.setNumberDocument(user.getNumberDocument());
        u.setPhoneNumber(user.getPhoneNumber());
        u.setPassword(user.getPassword());
        return this.save(u);
    }

}
