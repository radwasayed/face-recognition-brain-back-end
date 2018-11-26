const handelSignin = ( bcrypt, db) => (req, res) => {
    const {password, email} = req.body;
    if (!password || !email){
        return res.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid){
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to found user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
};

module.exports = {
    handelSignin: handelSignin
};