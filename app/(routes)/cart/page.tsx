"use client";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import CartItem from "@/app/(routes)/category/components/cart-item";
import WebCheckout from "@/components/WebCheckout"; // Import WebCheckout component


export default function Page() {
  const { items } = useCart();
  const prices = items.map((product) => product.attributes.price);
  const totalPrice = prices.reduce((total, price) => total + price, 0);
  

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:min-h-[80vh]">
      <h1 className="mb-5 text-3xl font-bold">Carrito de compras</h1>
      <div className="grid sm:grid-cols-2 sm:gap-5">
        <div>
          {items.length === 0 && <p>No hay productos en el carrito</p>}
          <ul>
            {items.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </ul>
        </div>
        <div className="max-w-xl">
          <div className="p-6 rounded-lg bg-slate-100">
            <p className="mb-3 text-lg font-semibold">Resumen de tu orden</p>
            <Separator />
            <div className="flex justify-between gap-5 my-4">
              <p>Total</p>
              <p>{formatPrice(totalPrice)}</p>
            </div>
            <div className="flex items-center justify-center w-full mt-3">
              <WebCheckout
                amount={totalPrice} // Pass the total price to the WebCheckout component
                description="Compra en mi tienda" // Customize this as needed
                buyerEmail="comprador@tienda.com" // Use buyer's email from user data
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
