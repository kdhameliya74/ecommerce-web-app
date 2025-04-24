import CartSidebar from '@/components/Cart/CartSidebar';
import { useEffect, useState } from 'react';
import { TruckElectric } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/stores/hook';
import { clearCart } from '@/stores/features/cartSlice';
import { useNavigate } from 'react-router';

interface ShippingMethod {
    id: string;
    name: string;
    price: number;
    delivery: string;
}
type ShippingMethodId = 'standard' | 'express' | 'cod';

const SHIPPING_METHODS: Record<ShippingMethodId, ShippingMethod> = {
    standard: {
        id: 'standard',
        name: 'Standard Shipping',
        price: 5.99,
        delivery: '5-7 business days',
    },
    express: {
        id: 'express',
        name: 'Express Shipping',
        price: 12.99,
        delivery: '2-3 business days',
    },
    cod: {
        id: 'cod',
        name: 'Cash on Delivery',
        price: 0.0,
        delivery: 'Pay when you receive your order',
    },
};

const Checkout = () => {
    const navigate = useNavigate();

    const [sameAsBilling, setSameAsBilling] = useState(true);
    const [isOrderPlacing, setOrderPlacing] = useState(false);
    const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>('standard');
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        billingStreet: '',
        billingApartment: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
        billingCountry: '',
        shippingStreet: '',
        shippingApartment: '',
        shippingCity: '',
        shippingState: '',
        shippingZip: '',
        shippingCountry: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const dispatch = useAppDispatch();
    const { items } = useAppSelector(state => state.cart);

    useEffect(() => {
        if (!items.length) {
            navigate('/');
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNextStep = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const updateShippingMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as ShippingMethodId;
        setShippingMethod(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setOrderPlacing(true);
        await new Promise(() => {
            setTimeout(() => {
                dispatch(clearCart());
                setOrderPlacing(false);
                navigate('/');
            }, 4000);
        });
    };

    return (
        <div className="relative container mx-auto px-4 py-8">
            {isOrderPlacing && (
                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-50 bg-white z-50 flex justify-center items-center">
                    <TruckElectric className="w-16 h-16 animate-pulse" />
                </div>
            )}
            <h2 className="text-3xl text-modern-primary font-bold py-8 text-center">Checkout</h2>

            <div className="flex flex-col-reverse lg:flex-row w-full gap-8">
                <div className="flex-1">
                    <div className="my-4 w-full p-6 border border-gray-200 shadow-md rounded-lg">
                        <ul className="relative flex justify-between w-full">
                            {[
                                'Personal Information',
                                'Billing Address',
                                'Shipping Address',
                                'Payment Method',
                            ].map((stepName, index, arr) => (
                                <li
                                    key={index}
                                    className="relative flex-1 flex flex-col items-center"
                                >
                                    <div className="flex items-center w-full">
                                        <div className="flex-1 hidden sm:block">
                                            {index !== 0 && (
                                                <div
                                                    className={`h-0.5 w-full ${
                                                        currentStep > index
                                                            ? 'bg-modern-primary'
                                                            : 'bg-gray-300'
                                                    }`}
                                                />
                                            )}
                                        </div>
                                        <div
                                            className={`size-10 flex items-center justify-center rounded-full font-bold text-base z-10 ${
                                                currentStep >= index + 1
                                                    ? 'bg-modern-primary text-white'
                                                    : 'bg-modern-accent text-modern-primary'
                                            }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 sm:block">
                                            {index !== arr.length - 1 && (
                                                <div
                                                    className={`h-0.5 w-full ${
                                                        currentStep > index + 1
                                                            ? 'bg-modern-primary'
                                                            : 'bg-gray-300'
                                                    }`}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-2 text-center">
                                        <span className="block text-sm font-medium text-modern-primary">
                                            {stepName}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                        {/* Personal Information Section */}
                        <div
                            className={`flex flex-col gap-4 p-6 border border-gray-200 rounded-lg ${
                                currentStep === 1 ? 'block' : 'hidden'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-modern-primary text-white flex items-center justify-center font-bold">
                                    1
                                </div>
                                <h3 className="text-xl font-bold">Personal Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-modern-primary rounded"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-modern-primary rounded"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-modern-primary rounded"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-modern-primary rounded"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="bg-modern-primary text-white py-2 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        {/* Billing Address Section */}
                        <div
                            className={`flex flex-col gap-4 p-6 border border-gray-200 rounded-lg ${
                                currentStep === 2 ? 'block' : 'hidden'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-modern-primary text-white flex items-center justify-center font-bold">
                                    2
                                </div>
                                <h3 className="text-xl font-bold">Billing Address</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="billingStreet">Street Address</label>
                                    <input
                                        type="text"
                                        id="billingStreet"
                                        name="billingStreet"
                                        value={formData.billingStreet}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-modern-primary rounded"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="billingApartment">
                                        Apartment, suite, etc. (optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="billingApartment"
                                        name="billingApartment"
                                        value={formData.billingApartment}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-modern-primary rounded"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="billingCity">City</label>
                                    <input
                                        type="text"
                                        id="billingCity"
                                        name="billingCity"
                                        value={formData.billingCity}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-modern-primary rounded"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="billingState">State/Province</label>
                                    <input
                                        type="text"
                                        id="billingState"
                                        name="billingState"
                                        value={formData.billingState}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-modern-primary rounded"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="billingZip">ZIP/Postal Code</label>
                                    <input
                                        type="text"
                                        id="billingZip"
                                        name="billingZip"
                                        value={formData.billingZip}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-modern-primary rounded"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="billingCountry">Country</label>
                                    <select
                                        id="billingCountry"
                                        name="billingCountry"
                                        value={formData.billingCountry}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-modern-primary rounded"
                                        required
                                    >
                                        <option value="">Select a country</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="AU">Australia</option>
                                        <option value="IN">India</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-bold hover:bg-gray-300 transition-all"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="bg-modern-primary text-white py-2 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        {/* Shipping Address Section */}
                        <div
                            className={`flex flex-col gap-4 p-6 border border-gray-200 rounded-lg ${
                                currentStep === 3 ? 'block' : 'hidden'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-modern-primary text-white flex items-center justify-center font-bold">
                                    3
                                </div>
                                <h3 className="text-xl font-bold">Shipping Address</h3>
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <input
                                    type="checkbox"
                                    id="sameAsBilling"
                                    checked={sameAsBilling}
                                    onChange={e => setSameAsBilling(e.target.checked)}
                                    className="h-4 w-4"
                                />
                                <label htmlFor="sameAsBilling">Same as billing address</label>
                            </div>

                            {!sameAsBilling && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="shippingStreet">Street Address</label>
                                        <input
                                            type="text"
                                            id="shippingStreet"
                                            name="shippingStreet"
                                            value={formData.shippingStreet}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-modern-primary rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="shippingApartment">
                                            Apartment, suite, etc. (optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="shippingApartment"
                                            name="shippingApartment"
                                            value={formData.shippingApartment}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-modern-primary rounded"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="shippingCity">City</label>
                                        <input
                                            type="text"
                                            id="shippingCity"
                                            name="shippingCity"
                                            value={formData.shippingCity}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-modern-primary rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="shippingState">State/Province</label>
                                        <input
                                            type="text"
                                            id="shippingState"
                                            name="shippingState"
                                            value={formData.shippingState}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-modern-primary rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="shippingZip">ZIP/Postal Code</label>
                                        <input
                                            type="text"
                                            id="shippingZip"
                                            name="shippingZip"
                                            value={formData.shippingZip}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-modern-primary rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="shippingCountry">Country</label>
                                        <select
                                            id="shippingCountry"
                                            name="shippingCountry"
                                            value={formData.shippingCountry}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-modern-primary rounded"
                                            required
                                        >
                                            <option value="">Select a country</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="AU">Australia</option>
                                            <option value="IN">India</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4">
                                <h4 className="font-bold mb-2">Shipping Method</h4>
                                <div className="flex flex-col gap-4">
                                    {Object.values(SHIPPING_METHODS).map(method => (
                                        <div
                                            key={method.id}
                                            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                                        >
                                            <input
                                                type="radio"
                                                id={method.id}
                                                name="shippingMethod"
                                                value={method.id}
                                                checked={shippingMethod === method.id}
                                                onChange={updateShippingMethod}
                                                className="h-4 w-4"
                                            />
                                            <div className="flex-1">
                                                <label
                                                    htmlFor="standard"
                                                    className="font-medium cursor-pointer"
                                                >
                                                    {method.name}
                                                </label>
                                                <p className="text-sm text-gray-500">
                                                    {method.delivery}
                                                </p>
                                            </div>
                                            <span className="font-medium">${method.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-bold hover:bg-gray-300 transition-all"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="bg-modern-primary text-white py-2 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        {/* Payment Method Section */}
                        <div
                            className={`flex flex-col gap-4 p-6 border border-gray-200 rounded-lg ${
                                currentStep === 4 ? 'block' : 'hidden'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-modern-primary text-white flex items-center justify-center font-bold">
                                    4
                                </div>
                                <h3 className="text-xl font-bold">Payment Method</h3>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        id="credit-card"
                                        name="paymentMethod"
                                        value="credit-card"
                                        checked={paymentMethod === 'credit-card'}
                                        onChange={e => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4"
                                    />
                                    <label
                                        htmlFor="credit-card"
                                        className="font-medium cursor-pointer"
                                    >
                                        Credit Card
                                    </label>
                                </div>

                                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        id="paypal"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={e => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4"
                                    />
                                    <label htmlFor="paypal" className="font-medium cursor-pointer">
                                        PayPal
                                    </label>
                                </div>

                                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        id="google-pay"
                                        name="paymentMethod"
                                        value="google-pay"
                                        checked={paymentMethod === 'google-pay'}
                                        onChange={e => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4"
                                    />
                                    <label
                                        htmlFor="google-pay"
                                        className="font-medium cursor-pointer"
                                    >
                                        Google Pay
                                    </label>
                                </div>

                                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        id="apple-pay"
                                        name="paymentMethod"
                                        value="apple-pay"
                                        checked={paymentMethod === 'apple-pay'}
                                        onChange={e => setPaymentMethod(e.target.value)}
                                        className="h-4 w-4"
                                    />
                                    <label
                                        htmlFor="apple-pay"
                                        className="font-medium cursor-pointer"
                                    >
                                        Apple Pay
                                    </label>
                                </div>
                            </div>

                            {paymentMethod === 'credit-card' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-modern-primary rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="cardName">Name on Card</label>
                                        <input
                                            type="text"
                                            id="cardName"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-modern-primary rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="expiryDate">Expiry Date</label>
                                        <input
                                            type="text"
                                            id="expiryDate"
                                            name="expiryDate"
                                            placeholder="MM/YY"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-modern-primary rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="cvv">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-modern-primary rounded"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-bold hover:bg-gray-300 transition-all"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-modern-primary text-white py-2 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-all"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="w-full lg:w-1/3 mt-8 lg:mt-0 ">
                    <h2 className="bg-modern-primary text-white py-2 rounded text-center font-bold mb-4">
                        Order Summary
                    </h2>
                    <CartSidebar
                        isOpen={true}
                        isSidebar={false}
                        shippingInfo={{ charge: Number(SHIPPING_METHODS?.[shippingMethod]?.price) }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
