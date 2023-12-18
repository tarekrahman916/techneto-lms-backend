import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

router.get('/', orderController.getAllData);
router.post('/', orderController.insertIntoDb);

router.get('/:email', orderController.getSingleData);

export const OrderRoutes = router;
