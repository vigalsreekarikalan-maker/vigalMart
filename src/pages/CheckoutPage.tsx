import React, { useState } from 'react';
import { CartItem, Address, Order } from '../types';
import { ApiService } from '../services/api';
import {
Check,
MapPin,
CreditCard,
QrCode,
Banknote,
ArrowRight,
ShieldCheck,
Loader2,
AlertCircle,
CheckCircle2,
} from 'lucide-react';

interface CheckoutPageProps {
cart: CartItem[];
addresses: Address[];
onOrderPlaced: (order: Order) => void;
onNavigate: (view: string, params?: any) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
cart,
addresses,
onOrderPlaced,
onNavigate,
}) => {
const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
const [selectedAddress, setSelectedAddress] = useState<Address>(
addresses[0] || {
id: 'addr-default',
fullName: 'Customer',
street: '',
city: '',
state: 'Tamil Nadu',
zipCode: '',
country: 'India',
phone: '',
}
);
const [paymentMethod, setPaymentMethod] =
useState<'COD' | 'UPI_DEMO' | 'CARD_DEMO'>('UPI_DEMO');
const [upiId, setUpiId] = useState('');
const [cardNumber, setCardNumber] = useState('');
const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
const [isPlacingOrder, setIsPlacingOrder] = useState(false);
const [orderError, setOrderError] = useState('');
const [isAddingAddress, setIsAddingAddress] = useState(false);
const [newStreet, setNewStreet] = useState('');
const [newCity, setNewCity] = useState('');
const [newState, setNewState] = useState('Tamil Nadu');
const [newZip, setNewZip] = useState('');

const itemsTotal = cart.reduce(
(sum, item) => sum + item.product.price * item.quantity,
0
);
const deliveryFee = itemsTotal > 499 ? 0 : 49;
const tax = Math.round(itemsTotal * 0.05);
const grandTotal = itemsTotal + deliveryFee + tax;

const handleAddAddress = (event: React.FormEvent) => {
event.preventDefault();
setOrderError('');

if (!newStreet.trim() || !newCity.trim() || !newState.trim() || !newZip.trim()) {
  setOrderError('Please complete all address fields.');
  return;
}

try {
  const saved = ApiService.saveAddress({
    fullName: selectedAddress.fullName || 'Customer',
    street: newStreet.trim(),
    city: newCity.trim(),
    state: newState.trim(),
    zipCode: newZip.trim(),
    country: 'India',
    phone: selectedAddress.phone || '',
  });

  const address = saved[saved.length - 1];
  if (address) setSelectedAddress(address);
  setIsAddingAddress(false);
  setNewStreet('');
  setNewCity('');
  setNewState('Tamil Nadu');
  setNewZip('');
} catch (error) {
  setOrderError(error instanceof Error ? error.message : 'Could not save address.');
}

};

const handlePlaceOrder = async () => {
if (isPlacingOrder) return;
setOrderError('');

if (cart.length === 0) {
  setOrderError('Your cart is empty. Please add products first.');
  return;
}

if (
  !selectedAddress.fullName?.trim() ||
  !selectedAddress.street?.trim() ||
  !selectedAddress.city?.trim() ||
  !selectedAddress.zipCode?.trim()
) {
  setOrderError('Please enter or select a complete delivery address.');
  setActiveStep(1);
  return;
}

setIsPlacingOrder(true);
try {
  const order = await ApiService.createOrder(
    cart,
    selectedAddress,
    paymentMethod
  );
  setPlacedOrder(order);
  setActiveStep(4);
  onOrderPlaced(order);
} catch (error) {
  console.error('Failed to place order:', error);
  setOrderError(
    error instanceof Error ? error.message : 'Unable to save order. Please try again.'
  );
} finally {
  setIsPlacingOrder(false);
}

};

return (
<div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
<div className="flex items-center justify-between max-w-2xl mx-auto mb-10">
{[
{ num: 1, label: 'Address' },
{ num: 2, label: 'Summary' },
{ num: 3, label: 'Payment' },
{ num: 4, label: 'Confirmation' },
].map((step) => (
<div key={step.num} className="flex flex-col items-center gap-2">
<div className={"w-9 h-9 rounded-full flex items-center justify-center font-bold ${ activeStep === step.num ? 'bg-amber-500 text-slate-900' : activeStep > step.num ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500' }"}>
{activeStep > step.num ? <Check className="w-4 h-4" /> : step.num}
</div>
<span className="text-xs text-slate-600">{step.label}</span>
</div>
))}
</div>

  {orderError && (
    <div role="alert" className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <p>{orderError}</p>
    </div>
  )}

  {activeStep === 1 && (
    <section className="bg-white rounded-3xl border p-6 sm:p-8 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Delivery Address
        </h2>
        <button type="button" className="text-sm font-bold text-amber-700"
          onClick={() => setIsAddingAddress(!isAddingAddress)}>
          {isAddingAddress ? 'Cancel' : '+ Add Address'}
        </button>
      </div>

      {isAddingAddress ? (
        <form onSubmit={handleAddAddress} className="space-y-3">
          <input required value={newStreet} onChange={(e) => setNewStreet(e.target.value)}
            placeholder="Street / Door No" className="w-full border rounded-xl p-3" />
          <input required value={newCity} onChange={(e) => setNewCity(e.target.value)}
            placeholder="City" className="w-full border rounded-xl p-3" />
          <input required value={newState} onChange={(e) => setNewState(e.target.value)}
            placeholder="State" className="w-full border rounded-xl p-3" />
          <input required value={newZip} onChange={(e) => setNewZip(e.target.value)}
            placeholder="Pincode" className="w-full border rounded-xl p-3" />
          <button type="submit" className="bg-slate-900 text-white rounded-xl px-5 py-3">
            Save Address
          </button>
        </form>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <button key={address.id} type="button"
              onClick={() => setSelectedAddress(address)}
              className={`text-left border-2 rounded-2xl p-4 ${
                selectedAddress.id === address.id
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-slate-200'
              }`}>
              <p className="font-bold">{address.fullName}</p>
              <p className="text-sm text-slate-600">
                {address.street}, {address.city}, {address.state} - {address.zipCode}
              </p>
              <p className="text-sm">Phone: {address.phone}</p>
            </button>
          ))}
          {addresses.length === 0 && (
            <p className="text-sm text-slate-500">
              No saved address. Click Add Address to create one.
            </p>
          )}
        </div>
      )}

      <div className="flex justify-end border-t pt-4">
        <button type="button"
          disabled={!selectedAddress.street?.trim() || !selectedAddress.city?.trim() || !selectedAddress.zipCode?.trim()}
          onClick={() => { setOrderError(''); setActiveStep(2); }}
          className="bg-amber-500 text-slate-950 font-bold rounded-xl px-6 py-3 disabled:opacity-50">
          Continue <ArrowRight className="inline w-4 h-4 ml-2" />
        </button>
      </div>
    </section>
  )}

  {activeStep === 2 && (
    <section className="bg-white rounded-3xl border p-6 sm:p-8 space-y-6">
      <h2 className="text-lg font-bold border-b pb-4">Order Summary</h2>
      {cart.map(({ product, quantity }) => (
        <div key={product.id} className="flex items-center justify-between gap-4 border-b py-3">
          <div className="flex items-center gap-3">
            <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover" />
            <div>
              <p className="font-bold">{product.name}</p>
              <p className="text-sm text-slate-500">Quantity: {quantity}</p>
            </div>
          </div>
          <p className="font-bold">₹{(product.price * quantity).toLocaleString('en-IN')}</p>
        </div>
      ))}

      <div className="rounded-xl bg-amber-50 p-4 text-sm">
        <p className="font-bold">Deliver to</p>
        <p>{selectedAddress.fullName}, {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.zipCode}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between"><span>Items total</span><span>₹{itemsTotal.toLocaleString('en-IN')}</span></div>
        <div className="flex justify-between"><span>Delivery fee</span><span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
        <div className="flex justify-between"><span>Tax</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
        <div className="flex justify-between border-t pt-3 font-bold text-lg"><span>Total</span><span>₹{grandTotal.toLocaleString('en-IN')}</span></div>
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <button type="button" onClick={() => setActiveStep(1)} className="text-sm font-bold">← Back</button>
        <button type="button" disabled={cart.length === 0}
          onClick={() => { setOrderError(''); setActiveStep(3); }}
          className="bg-amber-500 text-slate-950 font-bold rounded-xl px-6 py-3 disabled:opacity-50">
          Continue to Payment <ArrowRight className="inline w-4 h-4 ml-2" />
        </button>
      </div>
    </section>
  )}

  {activeStep === 3 && (
    <section className="bg-white rounded-3xl border p-6 sm:p-8 space-y-6">
      <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-4">
        <ShieldCheck className="w-5 h-5 text-emerald-600" /> Demo Payment
      </h2>
      <p className="rounded-xl bg-amber-50 p-3 text-sm">
        College project demo only. No real payment will be charged.
      </p>

      <div className="space-y-3">
        <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
          <input type="radio" name="payment" checked={paymentMethod === 'UPI_DEMO'}
            onChange={() => setPaymentMethod('UPI_DEMO')} />
          <QrCode className="w-5 h-5" /> UPI Demo
        </label>
        {paymentMethod === 'UPI_DEMO' && (
          <input value={upiId} onChange={(e) => setUpiId(e.target.value)}
            placeholder="Demo UPI ID (optional)" className="w-full border rounded-xl p-3" />
        )}

        <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
          <input type="radio" name="payment" checked={paymentMethod === 'CARD_DEMO'}
            onChange={() => setPaymentMethod('CARD_DEMO')} />
          <CreditCard className="w-5 h-5" /> Card Demo
        </label>
        {paymentMethod === 'CARD_DEMO' && (
          <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Demo card number (optional)" className="w-full border rounded-xl p-3" />
        )}

        <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
          <input type="radio" name="payment" checked={paymentMethod === 'COD'}
            onChange={() => setPaymentMethod('COD')} />
          <Banknote className="w-5 h-5" /> Cash on Delivery
        </label>
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-t pt-4">
        <div>
          <p className="text-sm text-slate-500">Grand Total</p>
          <p className="text-2xl font-bold">₹{grandTotal.toLocaleString('en-IN')}</p>
        </div>
        <button type="button" onClick={handlePlaceOrder}
          disabled={isPlacingOrder || cart.length === 0}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl px-6 py-3 disabled:opacity-50">
          {isPlacingOrder ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Saving Order...
            </span>
          ) : 'Complete Order'}
        </button>
      </div>

      <button type="button" onClick={() => setActiveStep(2)}
        className="text-sm font-bold text-slate-500">← Back to Summary</button>
    </section>
  )}

  {activeStep === 4 && placedOrder && (
    <section className="bg-white rounded-3xl border p-8 sm:p-12 text-center space-y-5">
      <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
      <h2 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h2>
      <p className="text-slate-600">Your order has been saved.</p>
      <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-2">
        <p><strong>Order ID:</strong> {placedOrder.id}</p>
        <p><strong>Delivery city:</strong> {placedOrder.shippingAddress.city}</p>
        <p><strong>Estimated delivery:</strong> {placedOrder.estimatedDelivery}</p>
        <p><strong>Total:</strong> ₹{grandTotal.toLocaleString('en-IN')}</p>
      </div>
      <button type="button" onClick={() => onNavigate('orders')}
        className="bg-slate-900 text-white font-bold rounded-xl px-6 py-3">
        View My Orders
      </button>
    </section>
  )}
</div>

);
};