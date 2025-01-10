import express from 'express';
import { sendNotificationToAll, createNotificationData } from '../utils/pushNotification';

const router = express.Router();

// Store subscriptions (in production, use a database)
let subscriptions: PushSubscription[] = [];

// Endpoint to store push subscription
router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subscription added successfully' });
});

// Endpoint to send notification to all subscribers
router.post('/notify', async (req, res) => {
  const { title, body, url } = req.body;
  
  const notificationData = createNotificationData(title, body, url);
  
  try {
    const success = await sendNotificationToAll(subscriptions, notificationData);
    if (success) {
      res.status(200).json({ message: 'Notifications sent successfully' });
    } else {
      res.status(500).json({ message: 'Some notifications failed to send' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error sending notifications' });
  }
});

export default router;