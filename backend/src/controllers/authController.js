const bcrypt = require('../utils/bcrypt');
const jwt = require('../utils/jwt');
const db = require('../db/db');
const bcrypt1 = require('bcrypt');
const jwt1 = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { user_id, username, password, user_type } = req.body;
    const hashedPassword = await bcrypt.hashPassword(password);

    const result = await db.query('INSERT INTO project_canteen.user_login (user_id,username, password,user_type) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, username, hashedPassword, user_type]);

    const user = result.rows[0];
    const token = jwt.generateToken({ id: user.id, username: user.username });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await db.query('SELECT * FROM project_canteen.user_login WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const match = await bcrypt.comparePasswords(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.generateToken({ id: user.id, username: user.username });
    res.json({ token , user_id: user.user_id});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getLocations = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM project_canteen.location');
    const locations = result.rows;
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getHotSnacks = async (req,res)=>{
  const location = req.query.location;
  const loca = location.toLowerCase();

  try{
    const result = await db.query(
      `SELECT * FROM project_canteen.item WHERE ${loca} = true AND item_status = 'active' AND type_for_item = 'hot snacks'`
    );
    res.json(result.rows);
  }
  catch(error){
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getBeverages = async (req,res)=>{
  const location = req.query.location;
  const loca = location.toLowerCase();

  try{
    const result = await db.query(
      `SELECT * FROM project_canteen.item WHERE ${loca} = true AND item_status = 'active' AND type_for_item = 'beverages'`
    );
    res.json(result.rows);
  }
  catch(error){
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getMunchies = async (req,res)=>{
  const location = req.query.location;
  const loca = location.toLowerCase();

  try{
    const result = await db.query(
      `SELECT * FROM project_canteen.item WHERE ${loca} = true AND item_status = 'active' AND type_for_item = 'snacks'OR ${loca} = true AND item_status = 'active' AND type_for_item = 'chocolate'`
    );
    res.json(result.rows);
  }
  catch(error){
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const placeOrder = async (req, res) => {
  const { orderId, userId, data, dateTime, prepInstructions, expectedTime, mobileNumber, paymentType, roomId, locationId, stage } = req.body;
  console.log
  try {
    const queryText = 'INSERT INTO project_canteen.order_details (order_id, user_id, data, date_time, prep_instructions, expected_time, mobile_number, payment_type, room_id, location_id, stage) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    const values = [orderId, userId, data, dateTime, prepInstructions, expectedTime, mobileNumber, paymentType, roomId, locationId, stage];
    
    await db.query(queryText, values);;
    
    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order. Please try again later.' });
  }
};

const profile = async (req, res) => {
  try{
      const token = req.headers.authorization;

      if(!token){
         return  res.status(401).json({ message: 'Authorization token is missing '});
      }
      const SECRET_KEY = "key";
      const decodedToken = await jwt1.verify(token.replace('Bearer ', ''), SECRET_KEY);
      const userID = decodedToken.userId;
  
      const query = `SELECT username, role, location, phone FROM project_canteen.admin_login WHERE admin_id = $1`;
  
      const result = await db.query(query, [userID])
      
      if(result.rows.length === 0){
          return res.status(404).json({ message: 'User not found!'})
      }
  
      const userProfile = result.rows[0];
  
      res.status(200).json(userProfile)
  }
  catch(error){
      console.log("error in fetching user profile: ",error);
      res.status(500).json({message: 'Internal Server Error'});
  }

}

const admin_login = async (req, res ) => {
  try{
      const { username, password } = req.body;
      const query = `SELECT * FROM project_canteen.admin_login where username = $1`;
      const result = await db.query(query, [username]);
     
      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'User not found' });
      }
      const SECRET_KEY = "key";
      const user = result.rows[0];
      
      const IsPasswordValid = await bcrypt1.compare(password, user.password);
  
      if(!IsPasswordValid){
          return res.status(404).json({message: 'Invalid credentials'});
      }
      const token = await jwt1.sign({ userId: user.admin_id }, SECRET_KEY, {
          expiresIn: '3h',
      });
  
      const location = user.location;
  
      res.status(200).json({ message: 'Login successful', token, location: user.location });
  
     } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

const my_orders = async (req, res) =>{
  const userId = req.query.user_id;
  try {
    const orders = await db.query('SELECT * FROM project_canteen.order_details WHERE user_id = $1', [userId]);
    res.json(orders.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const cancel_orders = async (req, res) =>{
  const orderId = req.query.orderId;
  try {
    const orders = await db.query('SELECT * FROM project_canteen.order_details WHERE user_id = $1', [orderId]);
    res.json(orders.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { register, login, getLocations, getHotSnacks, getBeverages, getMunchies, placeOrder, profile, admin_login, my_orders, cancel_orders};