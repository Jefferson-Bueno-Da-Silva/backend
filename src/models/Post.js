const mongoose = require('mongoose');
const fs       = require('fs');
const path     = require('path');
const { promisify } = require('util');

const PostSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
})

//intercepta acões do DB e verifica se a url esta vazia, se sim troca pela url do express.static
// NÃO PODE USAR ARROW FUNCTIONS
PostSchema.pre('save', function() {
    if(!this.url){
        this.url = `${process.env.APP_URL || 'http://localhost:3000'}/files/${this.key}`
    }

});


PostSchema.pre('remove', function() {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key));
})

module.exports = mongoose.model("Post", PostSchema);