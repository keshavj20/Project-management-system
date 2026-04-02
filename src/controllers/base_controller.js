const apiService = require("../services/api_service");

exports.crud = async (req, res) => {
  const { modelname } = req.params;
   


  try {
    const api = new apiService(modelname);
    const methods = req.method.toLowerCase();

    switch (methods) {
      case "post": {
        const data = await api.create(req.body);
        return res.status(201).json({ message: "Created", data });
      }
      case "get": {
        const { id, search, ...rest } = req.query;

        let filter = { ...rest };

        if (search?.trim()) {
          filter.name = { $regex: "^" + search, $options: "i" };
        }

        const result = id ? await api.getById(id) : await api.get(filter);

        return res.status(200).json(result);
      }
      case "put": {
        const { _id } = req.body;

        if (!_id) return res.status(400).json({ error: "Missing id " });
        const update = await api.update(_id, req.body);
        return res.status(200).json({ message: "Updated", data: update });
      }
      case "delete": {
        const { id } = req.body;
        const result = id
          ? await api.delete(id)
          : await api.deleteMany(req.body);
        return res.status(200).json({ message: "Deleted", data: result });
      }
      default:
        res.status(405).json({ error: "Method not allowed " });
    }
  } catch (error) {
    console.error("Dynamic Crud error:", error);

    return res.status(500).json({
      error: {
        message: error.message || "Internal Server Error",
      },
    });
  }
};
