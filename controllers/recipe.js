const { db } = require('../services/db');

class recipeController {
    constructor() {
    }

    async getAllRecipes(req, res) {
        try {
            const [rows] = await db.connection.execute(`SELECT * FROM recipes`);

            res.status(200).json({ success: true, data: rows })
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message })
        }
    }

    async addRecipe(req, res) {
        try {
            const { data } = req.body;

            const sql = `
                    INSERT INTO recipes 
                    (category_id, name, ingredients, preparation, comments, image)
                    VALUES (
                        ${data.category_id}, 
                        '${data.name}', 
                        '${data.ingredients}', 
                        '${data.preparation}',
                        '${data.comments}',
                        '${data.image}'
                    );
                `;

            const [result] = await db.connection.execute(sql);

            res.status(200).json({ success: true, id:result.insertId })
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message })
        }
    }

    async deleteRecipe(req, res) {
        try {
            const { id } = req.body;

            await db.connection.execute(`DELETE FROM recipes WHERE id = '${id}'`);

            res.status(200).json({ success: true })
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message })
        }
    }

    async updateRecipe(req, res) {
        try {
            const { data } = req.body;

            const sql = `
                UPDATE recipes 
                    SET category_id = ${data.category_id},
                    name = '${data.name}', 
                    ingredients = '${data.ingredients}', 
                    preparation = '${data.preparation}',
                    comments = '${data.comments}',
                    image = '${data.image}'
                    WHERE id = '${data.id}'
            `;

            const [result] = await db.connection.execute(sql);

            res.status(200).json({ success: true, id:data.id })
        }
        catch (e) {
            res.status(500).json({ success: false, message: e.message })
        }
    }
}

module.exports = new recipeController();
