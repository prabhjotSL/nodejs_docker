const express = require('express');
const app = express();
var fs = require('fs');
const util = require('util');
const vm = require('vm');

app.get('/', function(req, res) {
    fs.readFile("test.js", "utf8", function(err, file) {
        if (err) throw err;
        
        var sandbox = {value_inputs: {
                a: parseFloat(req.query.a),
                b: parseFloat(req.query.b),
            }, value_outputs:{}
        };
        const script = new vm.Script(file);
        var context = vm.createContext(sandbox);
        try {
            var output = (function(script, context) { var output =  script.runInContext(context, {console: console}); return output; }(script, context));
            var result = util.inspect(sandbox);
            console.log(result, output, typeof(output));
            res.json(output);
        } catch(e) {
            console.log(e);
        }
    });

});

app.listen(3000, () => {

});