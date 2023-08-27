const config = require(`${__config_dir}/app.config.json`)
const { debug } = config;
const helper = require(`${__class_dir}/helper.class`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const hash = require(`${__class_dir}/hash.class.js`);
const logger = require('morgan')

class _task{
    async login(formData) {
         // Validate data
        const schema = Joi.object({
            username: Joi.string(),
            email: Joi.string(),
            password: Joi.string()
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(formData)
        if(validation.error){
            const errorDetails = validation.error.details.map((detail)=>{
                detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }
        
        // Insert data to database
        const sql = {
            query: `SELECT username, email, password from user where username = ?`,
            params: [formData.username]
        }
        
        return mysql.query(sql.query, sql.params)
        .then(data=>{
                const {username, email, password} = data[0]
                const hashPassword = hash.sha256(formData.password)
                if(hashPassword === password) return {
                    status: true,
                    data: jwt.sign({username}, 'secret', { expiresIn: 60 * 60 })
                }
                return {
                    status: false
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('add task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }

    async register(formData) {
         // Validate data
        const schema = Joi.object({
            username: Joi.string(),
            email: Joi.string(),
            password: Joi.string()
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(formData)
        if(validation.error){
            const errorDetails = validation.error.details.map((detail)=>{
                detail.message
            })

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }
        const hashPassword = await hash.sha256(formData.password)
        // Insert data to database
        const sql = {
            query: `INSERT into user(username, email, password) VALUES (?, ?, ?)`,
            params: [formData.username, formData.email, hashPassword]
        }

        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data: data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('add task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
}
module.exports = new _task()