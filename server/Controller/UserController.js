(function () {
    'use strict';
    var CONFIG = require('../../app.config'),
        User = require("../Model/User"), // Require User Molel file
        Q = require("q");


    function _getUsersDetail(req, res) {
        var filterObject = {};
        if (Object.keys(req.query).length !== 0)
            filterObject = Object.assign({}, req.query);
        User.find(filterObject, function (err, doc) {
            if (err) {
                res.status(400).send({
                    errorMessage: 'Error by database',
                    data: err
                });
            } else {
                res.status(200).send({
                    successMessage: 'User List',
                    data: doc
                });
            }
        });
    }

    function _getUserDetailById(req, res) {
        User.findById(req.params.id, function (err, doc) {
            if (err) {
                res.status(400).send({
                    errorMessage: 'Error by database',
                    data: err
                });
            } else {
                res.status(200).send({
                    successMessage: 'User List',
                    data: doc
                });
            }
        });
    }

    function _saveUserDetail(req, res) {
        var UserInfo = req.body;
        if (UserInfo && Object.keys(UserInfo).length !== 0) {
            if (UserInfo.email)
                UserInfo.email = UserInfo.email.toLowerCase();
            var saveUser = new User(UserInfo);
            saveUser.save(function (err, doc) {
                if (err) {
                    res.status(400).send({
                        errorMessage: 'Error by database',
                        data: err
                    });
                } else {
                    res.status(202).send({
                        successMessage: 'User detail saved successfully',
                        data: doc
                    });
                }
            });
        } else {
            res.status(400).send({
                errorMessage: 'Provide data for save user detail',
                data: null
            });
        }
    }

    function _editUserDetail(req, res) {
        if (req.body.email)
            req.body.email = req.body.email.toLowerCase();
        User.findOneAndUpdate({
            _id: req.params.id
        }, req.body, { new: true }, function (err, doc) {
            if (err) {
                res.status(400).json({
                    errorMessage: 'Error by database',
                    data: err
                });
            }
            if (doc) {
                res.status(202).json({
                    successMessage: 'User detail update successfully',
                    data: doc
                })
            }
        });
    }

    function _deleteUserDetail(req, res) {
        User.remove({ _id: req.params.id }, function (err, doc) {
            if (err)
                res.status(400).reject({
                    errorMessage: 'Error by database',
                    data: err
                })
            else if (!err)
                res.status(204).resolve({
                    successMessage: 'User delete successfully',
                    data: doc
                })
        });
    }

    // Export Methodz
    module.exports = {
        getUsersDetail: _getUsersDetail,
        getUserDetailById: _getUserDetailById,
        saveUserDetail: _saveUserDetail,
        editUserDetail: _editUserDetail,
        deleteUserDetail: _deleteUserDetail,
    };
})();