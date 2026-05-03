package com.ozgur_kilic.ozgur_kilic_staj_projesi.api.controller;

import com.ozgur_kilic.ozgur_kilic_staj_projesi.api.common.GeneralExpection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GeneralExceptionController {
    @ExceptionHandler(value = GeneralExpection.class)
    public ResponseEntity<ErrorMessage> exceeption(GeneralExpection exception){
        return new ResponseEntity<>(new ErrorMessage(exception.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
@Getter
@Setter
@AllArgsConstructor
class ErrorMessage  {
    private String ErrorMessage;

}
