const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.params;
        const ong = await connection('ongs')
            .where('id', id)
            .select('*');

        if (!ong) {
            return response.status(400).json({ error: 'user dont found' });
        }
        return response.json(ong);
    }
};