const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/fin-test', { 
    useNewUrlParser: true, 
    useCreateIndex:true,
    useFindAndModify: false 
});

var UserSchema = new mongoose.Schema({
    name : {
      type : String,
      required : true,
      minLength : 1,
      trim : true,
      unique : true
    },
    age : {
      type : Number,
      required : true,
    }
  });

var User = mongoose.model('users', UserSchema);

exports.getMany = () => {
    return User.find();
}

exports.addOne = (user) => {
    let newUser = new User(user);
    return newUser.save();
}

exports.getOne = (id) => {
    return User.findOne({_id: id});
}

exports.updateOne = (id, body) => {
    return User.findOneAndUpdate({_id:id}, body, {new: true})
}

exports.removeOne = (id) => {
    return User.findOneAndDelete({_id : id});
}

