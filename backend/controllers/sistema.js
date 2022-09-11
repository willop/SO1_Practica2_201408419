const conn = require('../Database/conexion.js');

const cpu = async (req, res) => {
    console.log("Peticion cpu")
    conn.query('select informacion from CPU order by id_cpu desc limit 1;',
        function (err, result, fields) {
            res.status(200).json(result)
        }
    );
};


    const ram = async (req, res) => {
        console.log("Peticion ram")
        conn.query('select informacion from RAM order by id_ram desc limit 1;',
            function (err, result, fields) {
                console.log(result[0].informacion)
                res.status(200).json(result[0].informacion)
            }
        );
    };
    

    module.exports = {
        cpu,
        ram
    };