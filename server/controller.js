const repo = require('./repo');

var getMany = function(req, res, next) {
    repo.getMany()
        .then(users => res.send(users))
        .catch(next)     
}

var addOne = (req, res, next) => {
    repo.addOne(req.body)
        .then(user => res.status(201).send(user))
        .catch(next);
}

var getOne = (req, res, next) => {
    repo.getOne(req.params.id)
        .then(user => res.send(user))
        .catch(next);
}

var updateOne = (req, res, next) => {
    repo.updateOne(req.params.id, req.body)
        .then(user => res.status(201).send(user))
        .catch(next)
}

var removeOne = (req, res, next) => {
    repo.removeOne(req.params.id)
        .then(() => res.status(204).send())
        .catch(next);
}

module.exports = {
    getMany,
    getOne,
    addOne,
    updateOne,
    removeOne
}

