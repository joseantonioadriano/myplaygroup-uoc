import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import CommonFunction from '../../common/common-functions';

export default interface iBase {

    loadConf();

    /* GETS */
    getMode();

    /* SET STATES */
    setUpdating(updating: boolean);
    setMode(mode: string);

    /* RESETS */
    resetForm();
    resetFormFields();
    resetErrors();
    resetEmptyErrors();
    resetNotCharErrors();

    /* ERROR CONTROLS */
    errorUser(state: boolean);
    errorForm(state: boolean);


  }
 