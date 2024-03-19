const db = require('../db/db')

const getItems = async (req, res) => {
  try {
    const { location } = req.body;
    const query = `SELECT item_id, name, price, type_for_item, description, item_status, image FROM project_canteen.item WHERE ${location} = true`;

    const result = await db.query(query);
    const data = result.rows;

    if (result.rows.length === 0) {
      res.status(201).json({ message: "No Data Available" });
    }
    res.status(201).json({ data });
    console.log("data: ", data);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

const search = async (req, res) => {
  const searchText = req.body.searchText;

  try {
    const query = `
      SELECT *
      FROM project_canteen.item
      WHERE name ILIKE $1 OR description ILIKE $1
      LIMIT 10;
      `;

    const results = await db.query(query, [`%${searchText}%`]);
    res.json(results.rows);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const additem = async (req, res) => {
  try {
    const {
      item_id,
      name,
      price,
      description,
      image,
      type_for_item,
      item_status,
    } = req.body;
    let location = req.body.location;

    const query = `SELECT * FROM project_canteen.item WHERE item_id = $1`;
    const result = await db.query(query, [item_id]);
    if (location == "bia") {
      location = "bud";
    } else if (location === "pia") {
      location = "pud";
    } else if (location === "sanand") {
      location = "sgj";
    }

    if (result.rows.length === 0) {
      const insertColumns = [
        "item_id",
        "name",
        "price",
        "description",
        "image",
        "type_for_item",
        "item_status",
        location,
      ];
      const insertValues = [
        item_id,
        name,
        price,
        description,
        image,
        type_for_item,
        item_status,
        true,
      ];
      const query1 = `INSERT INTO project_canteen.item (${insertColumns.join(
        ", "
      )}) VALUES (${insertValues
        .map((_, index) => `$${index + 1}`)
        .join(", ")})`;

      await db.query(query1, insertValues);
      res.status(201).json({ message: "new item added successfully" });
    } else {
      const item = result.rows[0];
      if (item[location] === true) {
        const query3 = `UPDATE project_canteen.item SET price = $1 WHERE item_id = $2`;
        await db.query(query3, [price, item_id]);
        res.status(201).json({ message: "Item updated successfully" });
      } else {
        const query2 = `UPDATE project_canteen.item SET ${location} = $1 WHERE item_id = $2`;
        await db.query(query2, [true, item_id]);
        res.status(201).json({ message: "item added successfully" });
      }
    }
  } catch (error) {
    console.error("Error during adding item:", error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

module.exports = { getItems, search, additem };
