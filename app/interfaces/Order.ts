interface Customer {
  id: string;
  name: string;
  phone: string;
  // Add more properties as needed
}

interface Order {
  id: string;
  date: string;
  reference: string;
  customer_id: string;
  user_id: string | null;
  shipping_id: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  status: string;
  shipping_status: string;
  payment_status: number;
  payment_method: string;
  payment_date: string | null;
  document: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
  // customer: Customer;
  user: null | any; // Update this based on the actual structure of the 'user' property
}

export default Order;
