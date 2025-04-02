package com.hotel.booking.services.impl;

import java.util.List;

public interface CrudService<T> {

    T save(T t);

    List<T> findAll();

    T findById(Long id);

    void delete(Long id);

}
