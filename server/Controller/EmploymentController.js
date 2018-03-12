(function () {
    'use strict';
    var CONFIG = require('../../app.config');
    var Employment = require('../Model/Employment'), // Require Employment Molel file
        Q = require('q'),
        _ = require('lodash');
    function _getEmploymentDetail(req, res) {
        var filterObject = {};
        if (Object.keys(req.query).length !== 0)
            filterObject = Object.assign({}, req.query);
        Employment.find(filterObject).sort([['level_index', -1]]).exec(function (err, doc) {
            if (err) {
                res.status(400).send({
                    errorMessage: 'Error by database',
                    data: err
                });
            } else {
                res.status(200).send({
                    successMessage: 'Employment List',
                    data: doc
                });
            }
        });
    }

    function _getEmploymentDetailById(req, res) {
        Employment.findById(req.params.id).sort('level_index').exec(function (err, doc) {
            if (err) {
                res.status(400).send({
                    errorMessage: 'Error by database',
                    data: err
                });
            } else {
                res.status(200).send({
                    successMessage: 'Employment detail',
                    data: doc
                });
            }
        });
    }

    function _saveEmploymentDetail(req, res) {
        var EmploymentInfo = req.body;
        if (EmploymentInfo && Object.keys(EmploymentInfo).length !== 0) {
            var saveEmployment = new Employment(EmploymentInfo);
            var filterObject = {};
            if (req.query && req.query.user_id)
                filterObject.user_id = req.query.user_id;
            Employment.count(filterObject, function (err, count) {
                saveEmployment.level_index = count;
                saveEmployment.save(function (err, doc) {
                    if (err) {
                        res.status(400).send({
                            errorMessage: 'Error by database',
                            data: err
                        });
                    } else {
                        res.status(200).send({
                            successMessage: 'Employment detail Saved Successfully',
                            data: doc
                        });
                    }
                });
            });
        } else {
            res.status(400).send({
                errorMessage: 'Provide data for save employee detail',
                data: null
            });
        }
    }

    function _editEmploymentDetail(req, res) {
        delete req.body.level_index;
        var EmploymentInfo = req.body;
        if (EmploymentInfo && Object.keys(EmploymentInfo).length !== 0) {
            Employment.findOneAndUpdate({
                _id: req.params.id
            }, req.body, { new: true }, function (err, doc) {
                if (err) {
                    res.status(400).json({
                        errorMessage: 'Error by database',
                        data: err
                    });
                }
                if (doc) {
                    res.status(200).json({
                        successMessage: 'Employment detail update Successfully',
                        data: doc
                    })
                }
            });
        } else {
            res.status(400).send({
                errorMessage: 'Provide data for update employee detail',
                data: null
            });
        }

    }

    function _rearrangeEmploymentDetail(req, res) {
        var promiseArray = [];
        _.each(req.body, function (employee, level_index) {
            promiseArray.push(_updateLevelIndex(employee, level_index));
        });
        Q.all(promiseArray)
            .then(function (docs) {
                res.status(200).json({
                    successMessage: 'Rearrange employee detail',
                    data: docs
                })
            }, function (errors) {
                res.status(400).send({
                    errorMessage: 'Error by database',
                    data: errors
                });
            })
    }

    function _updateLevelIndex(employee, level_index) {
        var defer = Q.defer();
        Employment.findOneAndUpdate({
            _id: employee._id
        }, {
                level_index: level_index
            }, { new: true }, function (err, doc) {
                if (err) {
                    defer.reject(err)
                }
                if (doc) {
                    defer.resolve(doc);
                }
            });
        return defer.promise;
    }

    function _deleteEmploymentDetail(req, res) {
        Employment.remove({
            _id: req.params.id
        }, function (err, doc) {
            if (err)
                res.status(400).json({
                    errorMessage: 'Error by database',
                    data: err
                });
            else {
                var filterObject = {};
                if (req.query && req.query.user_id)
                    filterObject.user_id = req.query.user_id;
                Employment.find(filterObject).sort('level_index').exec(function (err, docs) {
                    if (err) {
                        res.status(400).send({
                            errorMessage: 'Error by database',
                            data: err
                        });
                    } else {
                        var promiseArray = [];
                        _.each(docs, function (employee, level_index) {
                            promiseArray.push(_updateLevelIndex(employee, level_index));
                        });
                        Q.all(promiseArray)
                            .then(function (docs) {
                                res.status(200).json({
                                    successMessage: 'Employment detail delete successfully',
                                    data: doc
                                });
                            }, function (errors) {
                                res.status(400).send({
                                    errorMessage: 'Error by database',
                                    data: errors
                                });
                            })
                    }
                });

            }
        });
    }

    // Export Methodz
    module.exports = {
        getEmploymentDetail: _getEmploymentDetail,
        getEmploymentDetailById: _getEmploymentDetailById,
        saveEmploymentDetail: _saveEmploymentDetail,
        editEmploymentDetail: _editEmploymentDetail,
        rearrangeEmploymentDetail: _rearrangeEmploymentDetail,
        deleteEmploymentDetail: _deleteEmploymentDetail
    };
})();