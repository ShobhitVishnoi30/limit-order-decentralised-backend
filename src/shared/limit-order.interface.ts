export interface LimitOrder {
  user_address: string;
  input_token_address: string;
  input_token_amount: string;
  output_token_address: string;
  minimum_output_token_amount: string;
  limit_order_type: number;
  status: number;
}
