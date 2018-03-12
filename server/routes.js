(function () {
    'use strict';
    var UserController = require('./Controller/UserController'),
        EmploymentController = require('./Controller/EmploymentController'),
        CONFIG = require('../app.config.js');
    module.exports = function (app) {
        var userRouter = require('express').Router();
        var employmentRouter = require('express').Router();
        app.use('/user/', userRouter);
        app.use('/employment/', employmentRouter);
        /* User apis */
        userRouter.route('/').get(UserController.getUsersDetail);
        userRouter.route('/').post(UserController.saveUserDetail);
        userRouter.route('/:id').get(UserController.getUserDetailById);
        userRouter.route('/:id').put(UserController.editUserDetail);
        userRouter.route('/:id').delete(UserController.deleteUserDetail);
        /* User apis */
        employmentRouter.route('/').get(EmploymentController.getEmploymentDetail);
        employmentRouter.route('/:id').get(EmploymentController.getEmploymentDetailById);
        employmentRouter.route('/').post(EmploymentController.saveEmploymentDetail);
        employmentRouter.route('/:id').delete(EmploymentController.deleteEmploymentDetail);
        employmentRouter.route('/rearrange').put(EmploymentController.rearrangeEmploymentDetail);
        employmentRouter.route('/:id').put(EmploymentController.editEmploymentDetail);
    };
})();