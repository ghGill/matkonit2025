const { db } = require('../services/db');

class categoryController {
    constructor() {
    }

    async getAllCategories(req, res) {
        try {
            const [rows] = await db.connection.execute(`SELECT * FROM categories`);

            res.status(200).json({ success: true, data: rows })
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message })
        }
    }

    async addCategory(req, res) {
        try {
            const data = req.body;

            const sql = `
                    INSERT INTO categories 
                    (name)
                    VALUES ('${data.name}');
                `;

            const [result] = await db.connection.execute(sql);

            res.status(200).json({ success: true, id:result.insertId })
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message })
        }
    }

    async deleteCategory(req, res) {
        try {
            const { id } = req.body;

            await db.connection.execute(`DELETE FROM categories WHERE id = '${id}'`);
            // await this.connection.execute(`DELETE FROM recipes WHERE category_id = '${id}'`);

            res.status(200).json({ success: true })
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message })
        }
    }

    async updateCategory(req, res) {
        try {
            const { id, name } = req.body;

            const [result] = await db.connection.execute(`UPDATE categories SET name = '${name}' WHERE id = '${id}'`);

            res.status(200).json({ success: true })
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message })
        }
    }
}

module.exports = new categoryController();
