import "./PaymentMethodForm.css"
import React, { useState } from 'react';
import './PaymentMethodForm.css';
import { Dayjs } from "dayjs";

interface PaymentMethodFormProps {
    endValue: Dayjs | null;
    startValue: Dayjs | null;
    roomStatus: string | undefined;
    onSubmit: (e: React.FormEvent) => Promise<(() => void) | undefined>;
}

export const PaymentMethodForm = ({ endValue, startValue, onSubmit, roomStatus }: PaymentMethodFormProps) => {
    const [method, setMethod] = useState<'card' | 'paypal'>('card');
    const selectDate: boolean = roomStatus === "MAINTENANCE" || !startValue || !endValue;

    return (
        <div className="payment-method-form">
            <h3 className="payment-title">Método de pago</h3>

            <div className="payment-toggle">
                <button
                    className={`toggle-option ${method === 'card' ? 'active' : ''}`}

                    onClick={() => setMethod('card')}
                >
                    Tarjeta
                </button>
                <button
                    className={`toggle-option ${method === 'paypal' ? 'active' : ''}`}
                    onClick={() => setMethod('paypal')}
                >
                    Paypal
                </button>
            </div>
            <form onSubmit={onSubmit} key={method}>
                {method === 'card' ?
                    <div className="card-details">
                        <label>
                            Número de tarjeta
                            <input type="text" name="cardNumber" placeholder="0000 0000 0000 0000" required />
                        </label>

                        <div className="card-row">
                            <label>
                                Fecha de expedicion
                                <input type="text" name="cardDate" placeholder="MM/AA" required />
                            </label>
                            <label>
                                CVC
                                <input type="text" name="cardCVC" placeholder="123" required />
                            </label>
                        </div>
                    </div>
                    :
                    <div className="card-details">
                        <label>
                            Ingrese su correo PayPal
                            <input type="text" name="paypalEmail" placeholder="example@gmail.com" required />
                        </label>
                        <div className="card-row">
                            <label>
                                Contraseña de 8 digitos
                                <input type="text" name="cardPassword" placeholder="********" required />
                            </label>
                        </div>
                    </div>
                }
                <button
                    className="confirm-btn"
                    type="submit"
                    disabled={selectDate}
                >
                    Confirmar y pagar
                </button>
            </form>


        </div>
    );
};

