const config = require(`${__config_dir}/app.config.json`)
const { debug } = config;
const helper = require(`${__class_dir}/helper.class`);
const mysql = new(require(`${__class_dir}/mariadb.class.js`))(config.db);
const Joi = require('joi')

class _task{
    async add(task){
        // Validate data
        const schema = Joi.object({
            items: Joi.string()
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(task)
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
            query: `INSERT INTO task (items) VALUES (?)`,
            params: [task.item]
        }

        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data
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

    async getAll(){
        // Validate datas
        const sql = {
            query: `SELECT * FROM task`
        }

        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('get task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }

    async getOne(id){
        // Validate data
        const schema = Joi.string().options({
            abortEarly: false
        })
        const validation = schema.validate(id)
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
            query: `SELECT * FROM task WHERE id = ?`,
            params: [id]
        }

        return mysql.query(sql.query, sql.params)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('get task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }

    async update(data){
        // Validate datas
        
        const schema = Joi.object({
            id: Joi.string(),
            data: Joi.object({
                items: Joi.string()
            })
        }).options({
            abortEarly: false
        })
        const validation = schema.validate(data)
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


        const sql = {
            query: `UPDATE task SET items=? WHERE id = ?`,
            params: [data.data.items, 1]
        }

        return mysql.query(sql.query, sql.params,false)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('get task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
    async delete(id){
        // Validate datas
        
        const schema = Joi.string().options({
            abortEarly: false
        })
        const validation = schema.validate(id)
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


        const sql = {
            query: `DELETE from task WHERE id = ?`,
            params: [id]
        }

        return mysql.query(sql.query, sql.params,false)
            .then(data=>{
                return {
                    status: true,
                    data
                }
            })
            .catch(error =>{
                if (debug){
                    console.error('get task Error: ', error)
                }

                return{
                    status: false,
                    error
                }
            })
    }
}

module.exports = new _task()