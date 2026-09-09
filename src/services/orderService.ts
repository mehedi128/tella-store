/**
 * Service to sync customer orders to Google Sheets via Google Apps Script Webhook
 */

export interface OrderData {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryZone: string;
  items: Array<{
    name: string;
    size: string;
    color?: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  notes?: string;
}

// Configurable Webhook URL (Google Apps Script Web App URL)
export const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzBNA7NCowfgGr1QMAMjSdCj7BQ59iCIAxhC6ixlif5dgl8G8dcAhWOLfPyB1T7Gj2_Ig/exec';

export async function submitOrderToGoogleSheet(order: OrderData): Promise<boolean> {
  const itemsFormatted = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} | সাইজ: ${item.size} | পরিমাণ: ${item.quantity} | মূল্য: ৳${item.price * item.quantity}`
    )
    .join('\n');

  const payload = {
    orderId: order.orderId,
    timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
    customerName: order.customerName,
    phone: order.phone,
    address: order.address,
    deliveryZone: order.deliveryZone === 'inside_dhaka' ? 'ঢাকার ভিতরে' : 'ঢাকার বাহিরে',
    itemsSummary: itemsFormatted,
    subtotal: order.subtotal,
    shippingFee: order.shippingFee,
    totalAmount: order.totalAmount,
    notes: order.notes || 'Cash on Delivery (COD)'
  };

  // If webhook URL is configured, send HTTP POST request
  if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.trim() !== '') {
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', // standard for Google Apps Script webhooks
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log('Order successfully sent to Google Sheet Webhook');
      return true;
    } catch (err) {
      console.error('Failed to submit order to Google Sheets:', err);
      return false;
    }
  }

  // If no webhook URL is configured yet, save to localStorage for offline safety
  try {
    const existingOrders = JSON.parse(localStorage.getItem('tella_orders_backup') || '[]');
    existingOrders.unshift(payload);
    localStorage.setItem('tella_orders_backup', JSON.stringify(existingOrders.slice(0, 100)));
  } catch (e) {
    console.warn('LocalStorage save warning:', e);
  }

  return true;
}
