package com.project.passwordRegister.infra.CrudBase;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface CrudBaseService<T, ID> {

    List<T> findAll();

    Optional<T> findByID(ID id);

    T save(T entity);

    void deleteById(ID id);
}